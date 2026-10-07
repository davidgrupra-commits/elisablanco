import { ContentPage, DemoNotice, LeadCapture, SectionBlock } from '@/components/content-page'

export default function OverseasPage() {
  return <ContentPage eyebrow="Grup RA Overseas" title={<>Invertir en España, <em>desde fuera.</em></>} intro="La vía de Grup RA para clientes extranjeros que buscan invertir y delegar la gestión de su activo.">
    <SectionBlock title="Una vía para invertir con acompañamiento local"><p>Overseas es la vía de Grup RA para que clientes extranjeros inviertan en España y nosotros gestionemos la rentabilidad de su activo.</p><DemoNotice>Sección en desarrollo.</DemoNotice></SectionBlock>
    <SectionBlock title="Inversión off-market"><p>Trabajamos determinadas oportunidades de inversión off-market. Si eres inversor, cuéntanos tu perfil y nos pondremos en contacto contigo.</p><LeadCapture type="contacto" title="Contacto para inversores" /></SectionBlock>
  </ContentPage>
}
