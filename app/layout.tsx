import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/site'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: './' }, // cada página declara su propia URL como canonical
  title: 'Grup RA | Inmobiliaria y Derecho Inmobiliario en Tarragona',
  description: 'Grup RA une derecho inmobiliario, actividad inmobiliaria y gestión patrimonial en Tarragona y Costa Daurada.',
  keywords: ['inmobiliaria Tarragona', 'derecho inmobiliario Tarragona', 'gestión patrimonial', 'Costa Daurada'],
  openGraph: { title: 'Grup RA | Advocada · Real Estate', description: 'Gestionamos, protegemos y rentabilizamos tu patrimonio inmobiliario.', type: 'website', locale: 'es_ES', siteName: 'Grup RA', images: [{ url: '/og-grup-ra.jpg', width: 1200, height: 630, alt: 'Grup RA · Inmobiliaria y derecho inmobiliario en Tarragona' }] },
  twitter: { card: 'summary_large_image' },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LegalService', 'RealEstateAgent'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Grup RA',
      alternateName: 'Advocada Real Estate',
      url: SITE_URL,
      logo: `${SITE_URL}/final.png`,
      image: `${SITE_URL}/og-grup-ra.jpg`,
      telephone: '+34669750096',
      email: 'info@grupra.es',
      address: { '@type': 'PostalAddress', streetAddress: 'Carrer Méndez Núñez, 4, bajo izq.', postalCode: '43004', addressLocality: 'Tarragona', addressRegion: 'Tarragona', addressCountry: 'ES' },
      areaServed: ['Tarragona', 'Costa Daurada'],
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '14:00' },
      ],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Grup RA', inLanguage: 'es', publisher: { '@id': `${SITE_URL}/#organization` } },
  ],
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#E1AD01' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={dmSans.variable}><body className="antialiased"><JsonLd data={organizationSchema} />{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
