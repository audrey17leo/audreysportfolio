'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { reveal, staggerContainer, flipUp, stellaEase } from '@/lib/stellaMotion'
import { FG, ACCENT, MUTED, MUTED_LIGHT, HAIRLINE, CARD, FONT_DISPLAY } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'

const SleepingModel = dynamic(() => import('./SleepingModel'), { ssr: false })

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: 'Audrey Leo builds calm,' },
  { text: 'human-centered', accent: true },
  { text: 'products.' },
]

function FlipLine({ text, accent, delay }: { text: string; accent?: boolean; delay: number }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}>
      <motion.span
        variants={flipUp}
        transition={{ duration: 0.7, ease: stellaEase, delay }}
        style={{ display: 'block', transformOrigin: 'bottom', color: accent ? ACCENT : FG }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '120px 24px 72px' : 'clamp(120px, 16vh, 200px) clamp(32px, 6vw, 96px) clamp(72px, 10vh, 120px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          alignItems: 'center',
          gap: isMobile ? 40 : 'clamp(40px, 6vw, 96px)',
        }}
      >
        {/* LEFT — the statement */}
        <motion.div initial="hidden" animate="show" variants={staggerContainer} style={{ flex: 1, width: isMobile ? '100%' : undefined }}>
          <motion.div
            variants={reveal}
            style={{
              fontSize: '0.74rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: MUTED_LIGHT,
              marginBottom: 'clamp(22px, 3.5vh, 40px)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
            Product designer &amp; creative technologist
          </motion.div>

          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6.4vw, 5.2rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.045em',
              margin: 0,
              perspective: 900,
            }}
          >
            {HEADLINE.map((l, i) => (
              <FlipLine key={l.text} text={l.text} accent={l.accent} delay={0.2 + i * 0.08} />
            ))}
          </h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.5 }}
            style={{
              marginTop: 'clamp(24px, 3.5vh, 40px)',
              maxWidth: 460,
              fontSize: 'clamp(1rem, 1.25vw, 1.12rem)',
              lineHeight: 1.6,
              color: MUTED,
              fontWeight: 400,
            }}
          >
            I shape products end-to-end — design, research &amp; creative strategy — turning
            ambiguous ideas into things people actually want to use.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.6 }}
            style={{ marginTop: 'clamp(28px, 4vh, 48px)', display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}
          >
            {['Currently — Product R&D @ tldraw', 'Art & Technology @ UCL'].map((m) => (
              <span key={m} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: MUTED }}>
                {m}
              </span>
            ))}
          </motion.div>

          <motion.a
            variants={reveal}
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.7 }}
            href="#works"
            data-cursor="explore"
            whileHover={{ x: 4 }}
            style={{
              marginTop: 'clamp(36px, 5vh, 60px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: FG,
              textDecoration: 'none',
              borderBottom: `1.5px solid ${ACCENT}`,
              paddingBottom: 5,
            }}
          >
            Selected work
            <span aria-hidden style={{ color: ACCENT }}>↓</span>
          </motion.a>
        </motion.div>

        {/* RIGHT — small pinned figure, balances the text column */}
        <motion.figure
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: stellaEase }}
          style={{ margin: 0, flexShrink: 0, width: isMobile ? 180 : 260 }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              background: CARD,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: 18,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SleepingModel />
            </div>
          </div>
          <figcaption style={{ marginTop: 12, fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: MUTED_LIGHT, textAlign: 'center' }}>
            Always napping · fig.01
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
