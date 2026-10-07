// Editores del panel de Actualidad. Para añadir o quitar a alguien: editar esta lista y desplegar.
// Los nombres son los que se muestran públicamente como autor: confirmar ortografía antes de publicar.

export type EditorRole = 'redactor' | 'revisora'

export type Editor = { email: string; name: string; role: EditorRole; canPublish: boolean }

export const editors: Editor[] = [
  { email: 'eli@advocadarealestate.es', name: 'Elisabet Reyes Blanco', role: 'revisora', canPublish: true },
  { email: 'comercial@advocadarealestate.es', name: 'David Reyes Blanco', role: 'redactor', canPublish: true },
  { email: 'albert@advocadarealestate.es', name: 'Albert Altura', role: 'redactor', canPublish: true },
  { email: 'info@advocadarealestate.es', name: 'Administrador', role: 'redactor', canPublish: true },
]

// Todos pueden publicar. Solo los artículos de la revisora (abogada) llevan el sello de revisión jurídica.
// El colegio y el número de colegiada NO se muestran hasta que estén aquí.
export const reviewer = {
  name: 'Elisabet Reyes Blanco',
  title: 'abogada',
  bar: null as string | null, // p. ej. 'Il·lustre Col·legi de l\'Advocacia de Tarragona'
  barNumber: null as string | null, // número de colegiada
}

export function findEditor(email?: string | null) {
  if (!email) return null
  return editors.find(editor => editor.email === email.toLowerCase()) ?? null
}
