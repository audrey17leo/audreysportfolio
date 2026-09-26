'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import { MUTED, MUTED_LIGHT, FONT_BODY } from '@/lib/theme'
import { inline } from './inline'

// Calm Inter body whose paragraphs stay greyed until they reach the reading
// zone, then settle to ink, eemonroy's progressive-reveal effect.
export default function ScrollRevealText({
  text,
  size = 16.5,
  color = MUTED,
  maxWidth,
}: {
  text: string
  size?: number
  color?: string
  maxWidth?: number | string
}) {
  const reduce = useReducedMotion()
  const paras = text.split('\n\n')
  const base: React.CSSProperties = {
    fontFamily: FONT_BODY, fontSize: size, lineHeight: 1.62, margin: 0, maxWidth,
  }
  return (
    <div style={{ display: 'grid', gap: '1em' }}>
      {paras.map((para, i) => {
        const content = para.split('\n').map((line, j) => (
          <span key={j}>{j > 0 ? <br /> : null}{inline(line, j * 100)}</span>
        ))
        if (reduce) return <p key={i} style={{ ...base, color }}>{content}</p>
        return (
          <motion.p
            key={i}
            style={base}
            initial={{ opacity: 0.4, y: 10, color: MUTED_LIGHT }}
            whileInView={{ opacity: 1, y: 0, color }}
            viewport={{ once: true, margin: '-12% 0px -18% 0px' }}
            transition={{ duration: 0.55, ease: stellaEase }}
          >
            {content}
          </motion.p>
        )
      })}
    </div>
  )
}
