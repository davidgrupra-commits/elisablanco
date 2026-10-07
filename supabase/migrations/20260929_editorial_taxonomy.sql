-- Taxonomía SEO: tipo de pieza, temática, servicio y datos de revisión.
-- Solo AÑADE columnas (nullable o con valor por defecto). Es seguro ejecutarlo varias veces.
-- Aplicar antes de desplegar el código que use estas columnas (el código actual NO las usa todavía).

alter table public.editorial_posts
  add column if not exists type text not null default 'noticia' check (type in ('guia', 'noticia')),
  add column if not exists topic text,
  add column if not exists service text,
  add column if not exists reviewed_by text,
  add column if not exists reviewed_at timestamptz,
  add column if not exists next_review_at date,
  add column if not exists primary_keyword text,
  add column if not exists intent text,
  add column if not exists sources jsonb not null default '[]'::jsonb;

create index if not exists editorial_posts_topic_idx on public.editorial_posts (topic) where status = 'publicado';

-- Atribución de leads (temática, servicio, artículo de origen, colaborador, utm).
alter table public.leads
  add column if not exists topic text,
  add column if not exists service_interest text,
  add column if not exists source_article text,
  add column if not exists partner_ref text,
  add column if not exists utm jsonb;
