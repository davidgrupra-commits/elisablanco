// Propiedades destacadas de la Home. Se rellenan con inmuebles REALES publicados en advocadarealestate.es (EGO).
// Mientras la lista esté vacía, la Home muestra un bloque que enlaza al listado completo, sin demos.
// Para cada inmueble: enlace a su ficha en EGO, una imagen de la ficha y los datos tal como aparecen allí.
export type FeaturedProperty = {
  label: string // p. ej. 'EXCLUSIVA', 'A ESTRENAR'
  location: string // p. ej. 'TARRAGONA · EIXAMPLE'
  title: string
  copy: string
  price: string // p. ej. '325.000 €'
  image: string // URL de la imagen de la ficha
  href: string // URL de la ficha en advocadarealestate.es
  meta: string[] // p. ej. ['99 m²', '3 hab.', '2 baños']
}

// Datos tomados de las fichas públicas de advocadarealestate.es (título, descripción, imagen) y de los precios indicados por Grup RA.
// Superficie, habitaciones y baños no se muestran porque no constan en el texto público de las fichas: añadirlos en `meta` cuando se confirmen.
export const featuredProperties: FeaturedProperty[] = [
  {
    label: 'EXCLUSIVA',
    location: 'TARRAGONA · LLEVANT',
    title: 'Casa exclusiva en Tarragona',
    copy: 'Casa individual con vistas al mar y piscina privada, en la zona de Vía Augusta y a pocos pasos de la playa de la Arrabassada.',
    price: 'Consultar precio', // [PENDIENTE] precio de la ficha
    image: 'https://images.egorealestate.com/Z1280x960/OAYES/S5/C13371/P28818929/Tphoto/IDf1bdb701-0000-0500-0000-000017ccd942.jpg?a=07671e11-de79-d2881-3431c-0528929538746254353823',
    href: 'https://www.advocadarealestate.es/inmueble/casa-exclusiva-en-tarragona/24659466',
    meta: ['Casa', 'Vistas al mar', 'Piscina privada'],
  },
  {
    label: 'A ESTRENAR',
    location: 'TARRAGONA · EIXAMPLE',
    title: 'Vivienda a estrenar',
    copy: 'Vivienda en el edificio rehabilitado de la calle Méndez Núñez 8, convertido en una promoción exclusiva en pleno corazón de Tarragona.',
    price: '325.000 €',
    image: 'https://images.egorealestate.com/Z1280x960/OAYES/S5/C13371/P28366525/Tphoto/IDbdd6b001-0000-0500-0000-00001984fafb.jpg?a=6361dc3d-fee1-b8366-5343d-2525117906622566310831',
    href: 'https://www.advocadarealestate.es/inmueble/vivienda-a-estrenar/24479280',
    meta: ['Piso', 'A estrenar'],
  },
  {
    label: 'EN EXCLUSIVA',
    location: 'TARRAGONA · NOU EIXAMPLE NORD',
    title: 'Casa con jardín privado en el corazón de Tarragona',
    copy: 'Una de las escasas casas unifamiliares independientes, a cuatro vientos, disponibles dentro del núcleo urbano de Tarragona.',
    price: '695.000 €',
    image: 'https://images.egorealestate.com/Z1280x960/OAYES/S5/C13371/P28763402/Tphoto/ID0ae5b601-0000-0500-0000-000018b98769.jpg?a=f0a8bc00-1195-d4287-3148a-3976340290162566353403',
    href: 'https://www.advocadarealestate.es/inmueble/casa-con-jardin-privado-en-el-corazon-de-tarragona/24602926',
    meta: ['Chalet', 'Jardín privado', 'A cuatro vientos'],
  },
]
