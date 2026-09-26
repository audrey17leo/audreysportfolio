import React from 'react'
import { FG } from '@/lib/theme'

// Parse **bold** / *italic* into React nodes.
export function inline(text: string, keyBase = 0): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let m: RegExpExecArray | null
  let k = keyBase
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) nodes.push(<strong key={k++} style={{ fontWeight: 600, color: FG }}>{m[1]}</strong>)
    else nodes.push(<em key={k++} style={{ fontStyle: 'italic' }}>{m[2]}</em>)
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}
