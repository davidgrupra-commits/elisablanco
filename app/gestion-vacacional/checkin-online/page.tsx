import { ContentPage, SectionBlock, DemoNotice } from '@/components/content-page'
import { checkinUrl } from '@/lib/links'

export default function CheckinPage() {
  return <ContentPage eyebrow="Gestión vacacional" title={<>Check-in <em>online.</em></>} intro={checkinUrl ? 'Completa el check-in de tu estancia de forma online, de manera independiente y sin esperas.' : 'Estamos preparando esta sección para el futuro sistema de check-in online.'}>
    {checkinUrl
      ? <SectionBlock title="Acceso para huéspedes"><p>El check-in se realiza en nuestra plataforma de registro de huéspedes.</p><p><a className="button button-gold" href={checkinUrl} target="_blank" rel="noopener noreferrer">Acceder al check-in</a></p></SectionBlock>
      : <SectionBlock title="Próximamente"><DemoNotice>El enlace de acceso se activará cuando esté disponible.</DemoNotice></SectionBlock>}
  </ContentPage>
}
