// FUENTE DE VERDAD de la arquitectura SEO de grupra.es (ver documento "Arquitectura del motor SEO").
// Servicio = destino comercial. Temática = hub (pilar + landing) de un problema real.
// Un artículo pertenece a UNA temática y empuja a UN servicio principal.

export type ServiceSlug = 'overseas' | 'despacho-juridico' | 'vende-con-garantias' | 'gestion-patrimonial' | 'inversion' | 'valoracion' | 'gestion-vacacional'
export type PostType = 'guia' | 'noticia'

export const services: Record<ServiceSlug, { title: string; href: string }> = {
  overseas: { title: 'Grup RA Overseas (Personal Shopper)', href: '/overseas' },
  'despacho-juridico': { title: 'Despacho jurídico', href: '/despacho-juridico' },
  'vende-con-garantias': { title: 'Vende con garantías', href: '/vende-con-garantias' },
  'gestion-patrimonial': { title: 'Gestión patrimonial', href: '/despacho-juridico' }, // página propia pendiente
  inversion: { title: 'Inversión inmobiliaria', href: '/inversion' },
  valoracion: { title: 'Valoración de inmuebles', href: '/#valoracion' },
  'gestion-vacacional': { title: 'Gestión vacacional', href: '/gestion-vacacional' },
}

export type Topic = {
  slug: string
  title: string
  description: string
  primaryService: ServiceSlug
  secondaryServices: ServiceSlug[]
  phase: 1 | 2
  // El hub NO se publica hasta que tenga contenido propio y revisado (evita thin content).
  published: boolean
  // Etiqueta de lead que ya reconoce /api/leads
  leadType?: string
}

export const topics: Topic[] = [
  { slug: 'herencias', title: 'Herencias', description: 'Qué hacer con un inmueble heredado: trámites, fiscalidad y decisiones.', primaryService: 'despacho-juridico', secondaryServices: ['vende-con-garantias', 'valoracion', 'gestion-patrimonial'], phase: 1, published: false, leadType: 'herencias' },
  { slug: 'compraventa', title: 'Comprar y vender', description: 'Compraventa de inmuebles con seguridad jurídica, incluida la vivienda protegida (VPO/HPO).', primaryService: 'vende-con-garantias', secondaryServices: ['despacho-juridico', 'valoracion'], phase: 1, published: false, leadType: 'hpo_vpo' },
  { slug: 'extranjeros', title: 'Comprar siendo extranjero', description: 'Comprar o invertir en Tarragona y la Costa Daurada desde fuera de España.', primaryService: 'overseas', secondaryServices: ['despacho-juridico', 'gestion-vacacional', 'inversion'], phase: 1, published: false, leadType: 'extranjeros' },
  { slug: 'inversion', title: 'Inversión inmobiliaria', description: 'Oportunidades, rentabilidad, due diligence para inversores y activos NPL.', primaryService: 'inversion', secondaryServices: ['despacho-juridico'], phase: 1, published: false, leadType: 'inversion_npl' },
  { slug: 'alquiler-vacacional', title: 'Alquiler vacacional', description: 'Gestión y normativa del alquiler turístico y de temporada.', primaryService: 'gestion-vacacional', secondaryServices: ['despacho-juridico'], phase: 1, published: false },
  { slug: 'alquileres', title: 'Alquileres', description: 'Alquiler de larga duración: contratos, impagos y derechos.', primaryService: 'despacho-juridico', secondaryServices: [], phase: 2, published: false },
  { slug: 'comunidades-y-propiedad', title: 'Comunidades y propiedad', description: 'Propiedad horizontal, comunidades de propietarios y conflictos de propiedad.', primaryService: 'despacho-juridico', secondaryServices: [], phase: 2, published: false },
  { slug: 'urbanismo-y-suelo', title: 'Urbanismo y suelo', description: 'Planeamiento, suelo y oportunidades urbanísticas en Tarragona.', primaryService: 'inversion', secondaryServices: ['despacho-juridico'], phase: 2, published: false },
]

// Tipo de lead que recoge el formulario integrado al final de cada artículo.
export function leadTypeForService(service?: ServiceSlug) {
  const map: Partial<Record<ServiceSlug, string>> = { 'despacho-juridico': 'legal', 'vende-con-garantias': 'propiedad', valoracion: 'valoracion', inversion: 'inversion_npl', overseas: 'extranjeros' }
  return (service && map[service]) || 'contacto'
}

export const topicBySlug = (slug: string) => topics.find(topic => topic.slug === slug)
export const publishedTopics = () => topics.filter(topic => topic.published)
