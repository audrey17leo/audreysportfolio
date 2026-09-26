'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import { GRAPHITE, MUTED_LIGHT, FONT_SERIF } from '@/lib/theme'
import { inline } from './inline'

// Serif body copy whose paragraphs stay greyed until they reach the reading
// zone, then settle to ink, eemonroy's progressive-reveal effect.
export default function ScrollRevealText({
  text,
  size = 19,
  color = GRAPHITE,
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
    fontFamily: FONT_SERIF, fontSize: size, lineHeight: 1.58, margin: 0,
    letterSpacing: '0.003em', maxWidth,
  }
  return (
    <div style={{ display: 'grid', gap: '1.05em' }}>
      {paras.map((para, i) => {
        const content = para.split('\n').map((line, j) => (
          <span key={j}>{j > 0 ? <br /> : null}{inline(line, j * 100)}</span>
        ))
        if (reduce) return <p key={i} style={{ ...base, color }}>{content}</p>
        return (
          <motion.p
            key={i}
            style={base}
            initial={{ opacity: 0.32, y: 12, color: MUTED_LIGHT }}
            whileInView={{ opacity: 1, y: 0, color }}
            viewport={{ once: true, margin: '-15% 0px -22% 0px' }}
            transition={{ duration: 0.6, ease: stellaEase }}
          >
            {content}
          </motion.p>
        )
      })}
    </div>
  )
}
