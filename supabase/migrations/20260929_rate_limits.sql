-- Rate limiting compartido entre instancias serverless (usado por /api/leads).
-- Ejecutar una vez en el SQL Editor de Supabase (o con la CLI de Supabase).
-- Solo guarda un hash HMAC de la IP (nunca la IP en claro) y se autolimpia a los 2 días.

create table if not exists public.rate_limit_hits (
  id bigint generated always as identity primary key,
  key text not null,
  hit_at timestamptz not null default now()
);

create index if not exists rate_limit_hits_key_hit_at_idx on public.rate_limit_hits (key, hit_at desc);

-- RLS activado y sin políticas: solo el service role (servidor) puede acceder.
alter table public.rate_limit_hits enable row level security;

create or replace function public.check_rate_limit(p_key text, p_limit int, p_window_seconds int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  hits int;
begin
  -- Serializa las peticiones de una misma clave para evitar carreras.
  perform pg_advisory_xact_lock(hashtext(p_key));

  select count(*) into hits
  from public.rate_limit_hits
  where key = p_key
    and hit_at > now() - make_interval(secs => p_window_seconds);

  if hits >= p_limit then
    return false;
  end if;

  insert into public.rate_limit_hits (key) values (p_key);

  -- Limpieza oportunista (~2% de las llamadas).
  if random() < 0.02 then
    delete from public.rate_limit_hits where hit_at < now() - interval '2 days';
  end if;

  return true;
end;
$$;

revoke all on function public.check_rate_limit(text, int, int) from public, anon, authenticated;
grant execute on function public.check_rate_limit(text, int, int) to service_role;
