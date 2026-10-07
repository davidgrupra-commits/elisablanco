# Grup RA · Arquitectura del motor SEO

**Estado:** v1.1 · estructura de las secciones 1-3 **aprobada** · 29-sep-2026 · dominio: grupra.es

**Novedad v1.1:** Overseas queda definido a partir de tu documento (ver sección 4, Extranjeros). **Decisión:** la inversión conjunta queda como *off-market*: solo se menciona y dirige a un formulario de contacto para inversores, sin sección propia.

**Marcas:** [PROPUESTA] lo que sugiero · [CONFIRMADO] lo que ya has decidido · [PENDIENTE] dato que falta · [SIN VALIDAR] depende de datos de búsqueda que no tengo.

> **Límite importante.** No tengo volúmenes de búsqueda, resultados reales de Google, Search Console ni una auditoría del sitio de advocadarealestate.es. Las prioridades de este documento salen de la lógica del negocio, no de datos de tráfico. Antes de construir cada temática hay que validar sus búsquedas.

---

## 0. Principios

1. **Criterio principal** [CONFIRMADO]: búsqueda real → necesidad real → contenido útil → confianza → servicio adecuado → lead → oportunidad comercial. El tráfico es una consecuencia.
2. **Una URL, una intención, una palabra clave principal.** Dos páginas no compiten por la misma búsqueda.
3. **Cada artículo pertenece a una sola temática y empuja a un solo servicio principal.**
4. **Ninguna página existe solo "porque SEO lo pide".** Toda landing necesita contenido propio y una función comercial clara.
5. **Contenido jurídico firmado, revisado y con fecha.**
6. **La web no es una granja de contenido.** Menos piezas, mejor mantenidas.

---

## 1. Jerarquía principal

**Respuesta:** la columna vertebral del sistema es la **intención del usuario**, no el nombre interno de los servicios.

```
Situación / búsqueda → Contenido → Temática (hub) → Servicio → CTA → Lead → Seguimiento
```

Ejemplo: alguien busca "qué hacer con una vivienda heredada en Tarragona". No busca "gestión patrimonial". El sistema lo capta así:

> Guía "qué hacer con una vivienda heredada" → hub **Herencias** → servicio **Despacho jurídico** (consulta) → después, si procede, venta o gestión del inmueble.

**Decisiones de estructura**

- **[PROPUESTA] Temática y landing se fusionan en una sola página, el "hub".** Es a la vez pilar informativo y landing comercial. Tener las dos por separado crea dos URLs peleando por la misma búsqueda.
- **Servicio → Temáticas** se usa para la navegación y para las páginas de servicio (cada servicio muestra qué problemas resuelve), pero no es el eje de rastreo.
- **Excepción:** las páginas de servicio que captan búsquedas transaccionales genéricas (por ejemplo "abogado inmobiliario Tarragona", por donde llegan hoy tus clientes jurídicos) son páginas de conversión propias. Los hubs nunca apuntan a esa búsqueda.

---

## 2. Mapa de niveles

```
GRUP RA (grupra.es)
│
├── SERVICIOS  (destino comercial, no cambian con el SEO)
│     Despacho jurídico · Vende con garantías / compraventa · Gestión patrimonial
│     Inversión · Valoración · Gestión vacacional
│     Grup RA Overseas (con Personal Shopper como puerta de entrada)
│
├── TEMÁTICAS  (hubs: pilar + landing, una página por problema)
│     Herencias · Comprar y vender · Extranjeros · Inversión · Alquiler vacacional
│     Fase 2: Alquileres · Comunidades y propiedad · Urbanismo y suelo
│
├── GUÍAS  (evergreen, viven dentro de su hub, se actualizan)
│
├── ACTUALIDAD  (noticias fechadas: BOE, Ajuntament, cambios legales)
│     Cada noticia enlaza a su guía; no compite con ella
│
├── HERRAMIENTAS  (calculadora ROI, valoración rápida, guías descargables)
│
├── TERRITORIO  (fase posterior: solo donde haya contenido local único)
│
├── SOCIOS / COLABORADORES  (canal B2B y puntos de entrada)
│
└── EQUIPO Y AUTORES  (fichas con datos profesionales: base de la confianza)

advocadarealestate.es → inmuebles / EGO CRM (separado, sin migrar)
```

**URLs** [PROPUESTA]

- Servicios: se mantienen (`/despacho-juridico`, `/vende-con-garantias`, `/gestion-vacacional`, `/inversion`…).
- Hubs: `/herencias`, `/compraventa`, etc. Ajustables tras validar palabras clave.
- Guías: `/herencias/que-hacer-con-una-vivienda-heredada` (dentro del hub).
- Noticias: `/actualidad/{slug}`. Hoy la sección se llama Actualidad pero la ruta es `/blog`: propongo renombrar con redirección 301.
- Ahora es el momento más barato de decidir las URLs, porque según lo que sé la web aún no está indexada [A CONFIRMAR].

---

## 3. Qué es cada cosa

| Pieza | Qué es | Intención | Ejemplo |
|---|---|---|---|
| **Temática (hub)** | Página pilar + landing de un problema | Informacional → transaccional | Herencias |
| **Guía** | Contenido evergreen y actualizable | Informacional / long-tail | Qué hacer con una vivienda heredada |
| **Noticia** | Contenido fechado, con fuente | Actualidad | Cambio de normativa, novedad del Ajuntament |
| **Categoría** | Etiqueta editorial. Cada una equivale a una temática, no más | Organización | — |
| **Servicio** | Lo que Grup RA vende | Transaccional | Despacho jurídico |
| **Herramienta** | Calculadora o lead magnet | Utilidad → captación | Calculadora ROI |
| **Fuente de leads** | Canal que trae demanda, no es página SEO | — | Vaciados, administradores de fincas |
| **Territorio** | Página local con datos propios | Búsqueda local | Tarragona ciudad |

**Regla noticia frente a guía:** la noticia es perecedera y la guía es la que se mantiene. Cuando una noticia aporta algo duradero, se integra en la guía y la noticia enlaza a ella. Así evitas varias versiones del mismo tema compitiendo entre sí (como ya te ha pasado con eficiencia energética).

---

## 4. Temáticas

**Resumen**

| Temática | Prioridad | Cuándo | Servicio principal |
|---|---|---|---|
| Herencias | Alta | Ahora | Despacho jurídico |
| Comprar y vender | Alta | Ahora | Vende con garantías |
| Extranjeros / Overseas | Media-alta | Ahora, en español; idiomas cuando haya traducción real | Grup RA Overseas |
| Inversión (con due diligence y NPL dentro) | Media | Ahora, versión ligera | Inversión |
| Alquiler vacacional | Media | Ahora | Gestión vacacional |
| Alquileres (larga duración) | Media | Fase 2 [SIN VALIDAR] | Despacho jurídico |
| Comunidades y propiedad | Media | Fase 2 [SIN VALIDAR] | Despacho jurídico |
| Urbanismo y suelo | Alta a medio plazo | Fase 2 | Inversión |
| Fiscalidad inmobiliaria | Transversal | No es hub: etiqueta y contenido dentro de otros hubs | — |

**Fichas**

**Herencias**
- Intención: entender qué hacer con un inmueble heredado y decidir qué hacer con él.
- Búsquedas tipo: qué hacer con una casa heredada, vender piso heredado, herencia con hermanos que no se ponen de acuerdo, impuesto de sucesiones en Cataluña.
- Servicio: **Despacho jurídico** (primero la consulta), después venta, valoración o gestión patrimonial.
- CTA: solicitar consulta. Tono sobrio: el lector suele estar en un momento delicado.
- Artículos: guías paso a paso, fiscalidad, casos con derecho civil catalán.
- Herramientas: guía descargable, valoración rápida.
- Fuentes de leads: vaciados, notarías, gestorías, administradores de fincas.

**Comprar y vender**
- Intención: hacer la operación con seguridad jurídica. Incluye **VPO/HPO** como sección (ver punto 5).
- Búsquedas tipo: qué revisar antes de comprar, vender con garantías, gastos de compraventa, verificación jurídica previa.
- Servicio: Vende con garantías; el despacho como refuerzo.
- CTA: valoración o consulta.
- Herramientas: valoración rápida.
- Fuentes de leads: reformas, mudanzas, constructoras, agentes.

**Extranjeros** (Overseas)
- Intención: comprar, vivir o invertir en Tarragona y la Costa Daurada estando fuera de España.
- Servicio: **Grup RA Overseas**, con **Personal Shopper** como puerta de entrada [CONFIRMADO en tu documento]. Overseas deja de ser un apartado de Gestión vacacional y pasa a ser un servicio propio en `/overseas` (con redirección desde la ruta anterior).
- Necesidades que se despliegan desde ahí: *Find your home* (vivir) y *Buy & Exploit* (comprar y rentabilizar, enlaza con Gestión vacacional). *Overseas Investment* [CONFIRMADO]: por ahora off-market, sin sección propia; solo una mención con formulario de contacto para inversores. *Legal & Local Support* es la capa transversal (NIE, poderes, due diligence, notaría, trámites).
- Búsquedas tipo: comprar vivienda en Tarragona desde el extranjero, personal shopper inmobiliario, comprar con poder notarial, fiscalidad de no residentes.
- Hub informativo (ES) que alimenta el servicio; las versiones EN/FR con `hreflang` solo cuando exista traducción real.
- **Antes de publicar el texto de Overseas, Eli debe revisar** el posible conflicto de intereses entre intermediación y asesoría jurídica y la parte de poderes notariales.

**Inversión**
- Intención: encontrar y evaluar oportunidades.
- Contenido interno: due diligence para inversores y NPL como secciones, no como hubs separados.
- CTA: calculadora ROI + hablar con un especialista.
- Fuentes de leads: servicers, socios.

**Alquiler vacacional**
- Dos públicos: propietarios que quieren gestión (transaccional) y quienes buscan la normativa (informacional).
- Servicio: Gestión vacacional. La normativa cambia, así que cada guía lleva fecha de revisión.

**Fase 2** (hasta validar búsquedas y capacidad de mantenimiento): Alquileres de larga duración, Comunidades y propiedad, y **Urbanismo y suelo**. Esta última es tu ventaja diferencial: con la base de documentos de urbanismo y legalidad de Tarragona puedes ofrecer contenido que nadie más tiene. Es la temática con más potencial a medio plazo.

---

## 5. Los seis pares que propuse

| Par | Veredicto | Motivo |
|---|---|---|
| Herencias → gestión patrimonial + legal | **Modificar** | El servicio principal es el **Despacho jurídico**, porque la persona necesita primero orientación legal. Gestión patrimonial y venta vienen después de la consulta. |
| VPO/HPO → compraventa + legal | **Fusionar** | Es una sección de "Comprar y vender", no un hub propio, salvo que los datos de búsqueda lo justifiquen [SIN VALIDAR]. |
| Extranjeros → compraventa + legal + Overseas | **Mantener** | Público, contenido y normativa propios. Cuidado con la parte multilingüe. |
| Due diligence → inversión + legal | **Dividir** | Hay dos públicos: el inversor (dentro de Inversión) y el particular que verifica antes de comprar (dentro de Comprar y vender). |
| Inversión NPL → inversión | **Mantener como sección** | Nicho B2B de mucho valor y poco volumen. Sin hub propio. |
| Alquiler vacacional → gestión vacacional | **Modificar** | Separar el público propietario (transaccional) del que busca normativa (informacional). |

Los cinco tipos de lead que ya distingue el sistema (herencias, VPO/HPO, extranjeros, due diligence, NPL) siguen siendo válidos como etiquetas de lead, aunque no cada uno sea un hub.

---

## 6. Captación indirecta (vaciados, reformas, mudanzas…)

**Recomendación:** reflejarla en el sistema, pero **no como temáticas SEO propias**.

Dos vías:

1. **Contenido para el propietario dentro de sus temáticas.** Ejemplo: "qué hacer con los muebles de una casa heredada" es una búsqueda real que vive en Herencias y lleva a la consulta. Vaciados, reformas y mudanzas son *tipos de artículo* dentro de Herencias y Comprar y vender.
2. **Canal de colaboradores** (`/socios`). Cada colaborador tiene un enlace con parámetro de origen. El lead guarda de dónde viene (`partner_ref`), y así el dashboard mide qué canal convierte.

`fuente/colaborador → necesidad detectada → contenido o landing → lead → servicio`

**Condición legal:** los datos de una persona solo entran por el formulario con **su propio consentimiento**. Nada de datos personales pasados por terceros sin que la persona lo sepa.

---

## 7. Enlazado interno

| Origen | Enlaza a | Regla |
|---|---|---|
| Artículo | Su hub | Siempre, cerca del inicio |
| Artículo | Un servicio | Uno principal, con anchor descriptivo |
| Artículo | 2-3 guías de la misma temática | Contextual, no lista genérica |
| Artículo | Herramienta | Solo si aporta (calculadora, valoración) |
| Artículo | Otra temática | Máximo 1, solo si es una relación real |
| Noticia | Su guía y su hub | Obligatorio |
| Hub | Todas sus guías, servicios, herramientas y últimas noticias | Es el centro |
| Servicio | Los hubs que lo alimentan | Explica qué problemas resuelve |

---

## 8. Estructura de un artículo y control de calidad

**Estructura:** título (H1 único) → contenido con H2/H3 → CTA → FAQs → noticias relacionadas. Los bloques (calculadora, valoración) se insertan con el marcador `[[calculadora-roi]]` que ya decidiste.

**Las FAQs** aportan long-tail, resuelven objeciones, amplían contexto y ofrecen navegación. Se nutren de preguntas reales de las consultas y de los formularios. No se plantean para conseguir el desplegable de Google.

**Filtro antes de publicar** (especialmente si lo genera el flujo de NotebookLM):
1. Intención de búsqueda y palabra clave principal definidas.
2. Un dato local o una fuente oficial citada (BOE, Ajuntament, Portal Jurídic).
3. Temática y servicio asignados.
4. Revisión jurídica de Eli, con fecha.
5. Comprobar que no exista ya otra pieza sobre el mismo tema. Si existe, se actualiza, no se duplica.
6. Fecha de próxima revisión.

Cadencia realista: 1-2 piezas sólidas por semana.

**Reutilización:** cada artículo genera un resumen para newsletter, una publicación de LinkedIn, un carrusel de Instagram y un texto para WhatsApp de colaboradores.

---

## 9. Autoría, revisión y confianza

**Decisión [CONFIRMADO]:** todos los editores pueden publicar (Elisabet Reyes Blanco, David Reyes Blanco, Albert Altura y Administrador). **Solo los artículos de Elisabet Reyes Blanco, abogada, llevan el sello de revisión jurídica.** Los de los demás autores no muestran ninguna mención jurídica.

| Capa | Qué es | Qué se muestra |
|---|---|---|
| **Autoría** | Quién redacta | "Por {nombre}" |
| **Revisión jurídica** | Validación de la abogada | "Revisado jurídicamente por Elisabet Reyes Blanco, abogada" solo en sus artículos |
| **Confianza (E-E-A-T)** | Señales que respaldan | Fuentes oficiales, despacho, dirección, casos, reseñas |
| **Datos profesionales** | Identificación regulada | Colegio y número de colegiada [PENDIENTE: no se inventa] |
| **Responsabilidad** | Quién responde | Aviso: contenido informativo, no sustituye asesoramiento |

**Consecuencia a tener en cuenta:** los artículos jurídicos de quien no es abogado se publican sin revisión profesional visible. Conviene que el aviso de responsabilidad lo deje claro, y que los temas más sensibles (herencias, fiscalidad, contratos) los firme o revise la abogada.

---|---|---|
| **Autoría** | Quién redacta | Nombre y ficha del autor |
| **Revisión jurídica** | Quién valida el contenido | "Revisado por Eli" + fecha de revisión |
| **Confianza (E-E-A-T)** | Señales que respaldan | Fuentes oficiales, despacho, dirección, casos, reseñas |
| **Datos profesionales** | Identificación regulada | Colegio y número de colegiada [PENDIENTE: no se inventa] |
| **Responsabilidad** | Quién responde | Aviso: contenido informativo, no sustituye asesoramiento; responsable del sitio |

---

## 10. EGO y duplicado

- `advocadarealestate.es` → inmuebles y EGO. `grupra.es` → contenido, servicios, landings, herramientas y leads del sistema nuevo.
- **No se migra EGO.** La integración de leads es una fase posterior.
- El fichero de inmuebles no se replica en grupra.es.
- **Antes de decidir canonical, noindex o 301, hay que auditar qué páginas informativas existen hoy en advocadarealestate.es** [PENDIENTE]. Hasta entonces no se toca nada.

---

## 11. Huecos

- Lista de palabras clave y validación de búsquedas por temática [SIN VALIDAR].
- Auditoría de advocadarealestate.es.
- Campos de origen en el lead (temática, servicio, artículo, colaborador, utm), hoy solo se guarda la página.
- Medición: Search Console, seguimiento de leads por temática y de citas.
- Google Business Profile para la búsqueda local.
- Ficha de equipo y autores.
- Traducciones (catalán, inglés, francés) antes de publicar `hreflang`.
- Política para actualizar artículos antiguos.

---

## 12. Riesgos

| Riesgo | Cómo se evita |
|---|---|
| **Canibalización** | Una intención por URL, una temática por artículo, servicio genérico separado de los hubs. |
| **Contenido duplicado** (entre dominios y entre versiones) | Auditoría previa; una guía se actualiza, no se copia. |
| **Demasiadas landings** | Cinco hubs iniciales; el resto pasa por validación. |
| **Contenido flojo** | Filtro de calidad y revisión antes de publicar. |
| **Generación automática sin valor** | Nunca se publica sin dato local, fuente y revisión. Google penaliza el contenido masivo de baja calidad. |
| **Arquitectura demasiado compleja** | Pocas piezas y tipos claros. Cada nivel nuevo se justifica. |
| **Depender de una sola fuente de tráfico** | Combinar SEO con colaboradores, newsletter, LinkedIn y el canal directo del despacho. |
| **Actualización** | Fecha de revisión por artículo y un ciclo fijo. |
| **Mezclar servicios y temáticas** | Se mantienen como niveles separados. |
| **Escalabilidad** | El modelo de datos separa tipos de pieza; añadir una temática no rompe lo demás. |
| **Datos de terceros** | Solo con el consentimiento de la persona. |
| **Inversión conjunta en Overseas** | Resuelto por ahora: off-market, solo mención y formulario de contacto. Si se quisiera abrir como producto, Eli debe validar antes la regulación (inversión colectiva o financiación participativa). |
| **Conflicto de intereses (agencia + asesoría jurídica)** | Si Grup RA cobra por la intermediación y su despacho asesora al mismo cliente, hay que revisar la deontología y informar al cliente. Eli debe validar cómo se presenta. |

---

## 13. Orden de construcción

```
arquitectura → taxonomía → URLs → contenido → interlinking
→ datos estructurados → canonical → sitemap → indexación → medición → conversión
```

| Fase | Contenido | Estado |
|---|---|---|
| 0 | Datos legales, dominio grupra.es, páginas legales | Pendiente de datos |
| 1 | Validar esta arquitectura, taxonomía y URLs | **Aquí estamos** |
| 2 | Hubs de las 3 temáticas prioritarias + primeras guías | Después |
| 3 | Panel de redacción, enlazado, datos estructurados, canonical, sitemap | Después |
| 4 | Medición y dashboard por temática y servicio | Después |
| 5 | Territorio, colaboradores, integración con EGO | Fase posterior |

---

## 14. Modelo de datos mínimo

Para no rediseñar después. Añadir a los artículos y leads:

- **Artículo:** tipo (guía/noticia), temática, servicio principal, autor, revisor, fecha de revisión, fecha de próxima revisión, palabra clave principal, intención, fuentes, CTA por defecto.
- **Temáticas y servicios:** tablas propias, con slug, título y descripción.
- **Lead:** temática, servicio de interés, artículo de origen, colaborador de origen, utm.

---

## 15. Datos pendientes de ti

Sin inventar ninguno:

- Colegio y número de colegiada de Elisabet Reyes Blanco, título y país de expedición.
- Bio corta y foto de cada autor (Elisabet, David, Albert).
- Texto del aviso de responsabilidad aprobado por Elisabet.
- Ciclo de revisión de los artículos (por ejemplo, cada 12 meses).
- Validación de Eli sobre el texto de Overseas (inversión conjunta, conflicto de intereses, poderes notariales).
- Acceso a Search Console y confirmación de si algo de grupra.es ya está indexado.
- Lista de páginas informativas de advocadarealestate.es.
- Datos de empresa y registros (los que ya te pedí).
