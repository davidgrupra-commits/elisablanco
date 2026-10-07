import Link from 'next/link'
import type { ReactNode } from 'react'
import { LeadCapture } from '@/components/content-page'
import { QuickValuation } from '@/components/quick-valuation'
import { RoiCalculator } from '@/components/roi-calculator'

// Marcadores que se insertan con [[nombre]]: incrustan los mismos bloques que el resto de la web.
const embeds: Record<string, () => ReactNode> = {
  'calculadora-roi': () => <RoiCalculator />,
  valoracion: () => <QuickValuation />,
  consulta: () => <LeadCapture type="legal" title="Consulta con el despacho" />,
  contacto: () => <LeadCapture type="contacto" title="¿Hablamos de tu caso?" />,
}

const faqHeading = /^##\s+(preguntas frecuentes|faq)\s*$/im

// Separa el cuerpo de la sección de preguntas frecuentes para poder poner el CTA entre ambos.
export function splitFaq(content: string) {
  const match = faqHeading.exec(content)
  if (!match) return { body: content, faq: '' }
  return { body: content.slice(0, match.index).trimEnd(), faq: content.slice(match.index).trim() }
}

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let index = 0
  let match: RegExpExecArray | null
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]
    const key = `${keyPrefix}-${index++}`
    if (token.startsWith('**')) nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      const href = link?.[2].trim() ?? ''
      if (link && /^\/(?!\/)/.test(href)) nodes.push(<Link key={key} href={href}>{link[1]}</Link>)
      else if (link && /^https:\/\//i.test(href)) nodes.push(<a key={key} href={href} rel="noopener noreferrer" target="_blank">{link[1]}</a>)
      else if (link) nodes.push(link[1])
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// Formato admitido: ## H2, ### H3, - lista, **negrita**, [texto](/ruta o https://...), [[cta]] y una línea por párrafo.
export function ArticleBody({ content, id }: { content: string; id: string }) {
  const lines = content.split('\n')
  const output: ReactNode[] = []
  let list: string[] = []
  const flushList = () => {
    if (!list.length) return
    const items = list
    output.push(<ul key={`${id}-ul-${output.length}`}>{items.map((item, i) => <li key={i}>{inline(item, `${id}-li-${output.length}-${i}`)}</li>)}</ul>)
    list = []
  }
  lines.forEach((raw, i) => {
    const line = raw.trim()
    if (line.startsWith('- ')) { list.push(line.slice(2)); return }
    flushList()
    if (!line) return
    const key = `${id}-${i}`
    const cta = /^\[\[([a-z0-9-]+)\]\]$/.exec(line)
    if (cta) { const embed = embeds[cta[1]]; if (embed) output.push(<div className="article-embed" key={key}>{embed()}</div>); return }
    if (line.startsWith('### ')) output.push(<h3 key={key}>{inline(line.slice(4), key)}</h3>)
    else if (line.startsWith('## ')) output.push(<h2 key={key}>{inline(line.slice(3), key)}</h2>)
    else output.push(<p key={key}>{inline(line, key)}</p>)
  })
  flushList()
  return <>{output}</>
}
