'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import { FG, MUTED, ORANGE, FONT_DISPLAY, FONT_SERIF } from '@/lib/theme'

// Full-width, centered pull-quote that breaks the grid, eemonroy's statements.
export default function Statement({ text, sub }: { text: string; sub?: string }) {
  const reduce = useReducedMotion()
  const wrap = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: stellaEase } },
  }
  return (
    <motion.section
      variants={reduce ? undefined : wrap}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-25% 0px -25% 0px' }}
      style={{
        maxWidth: 1000, margin: '0 auto', padding: 'clamp(72px, 13vh, 150px) 24px',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
      }}
    >
      <h2
        style={{
          fontFamily: FONT_DISPLAY, fontWeight: 600,
          fontSize: 'clamp(1.5rem, 3vw, 2.35rem)', lineHeight: 1.18,
          letterSpacing: '-0.02em', textTransform: 'uppercase', color: FG, margin: 0,
        }}
      >
        {text}
      </h2>
      {sub && (
        <p style={{ fontFamily: FONT_SERIF, fontSize: 18, lineHeight: 1.55, color: MUTED, maxWidth: '58ch', margin: 0 }}>
          {sub}
        </p>
      )}
      {/* the little scroll accent from the reference */}
      <motion.span
        aria-hidden
        initial={reduce ? undefined : { scaleY: 0 }}
        whileInView={reduce ? undefined : { scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ width: 2, height: 46, background: `linear-gradient(${ORANGE}, transparent)`, transformOrigin: 'top', marginTop: 6 }}
      />
    </motion.section>
  )
}
