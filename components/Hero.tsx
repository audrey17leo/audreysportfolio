'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { reveal, staggerContainer, flipUp, stellaEase } from '@/lib/stellaMotion'
import { BG, FG, ACCENT, MUTED, MUTED_LIGHT, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'
import { useMagnetic } from '@/lib/useMagnetic'

const SleepingModel = dynamic(() => import('./SleepingModel'), { ssr: false })

// Headline rendered as flip-up lines (Stella composition + Aditya display type).
const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: 'Audrey Leo builds' },
  { text: 'bold, human-centered' },
  { text: 'products.', accent: true },
]

function FlipLine({ text, accent, delay }: { text: string; accent?: boolean; delay: number }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
      <motion.span
        variants={flipUp}
        transition={{ duration: 0.75, ease: stellaEase, delay }}
        style={{ display: 'block', transformOrigin: 'bottom', color: accent ? ACCENT : FG }}
      >
        {text}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()
  const magnet = useMagnetic<HTMLAnchorElement>(0.4)

  return (
    <section
      style={{
        background: BG,
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(120px, 16vh, 200px) clamp(24px, 6vw, 96px) clamp(60px, 9vh, 110px)',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          alignItems: 'center',
          gap: isMobile ? 24 : 'clamp(32px, 5vw, 80px)',
        }}
      >
        {/* LEFT: 3D figure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: stellaEase }}
          style={{
            flex: isMobile ? 'none' : '0 0 40%',
            width: isMobile ? '100%' : undefined,
            height: isMobile ? 260 : 460,
            pointerEvents: 'none',
          }}
        >
          <SleepingModel />
        </motion.div>

        {/* RIGHT: typography */}
        <motion.div initial="hidden" animate="show" style={{ flex: 1, width: isMobile ? '100%' : undefined }}>
          {/* kicker */}
          <motion.div
            variants={reveal}
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: MUTED_LIGHT,
              marginBottom: 'clamp(20px, 3vh, 36px)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
            Product designer &amp; creative technologist
          </motion.div>

          {/* flip-up headline */}
          <h1
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(2.1rem, 4.6vw, 4.1rem)',
              lineHeight: 1.03,
              letterSpacing: '-0.045em',
              margin: 0,
              perspective: 800,
            }}
          >
            {HEADLINE.map((l, i) => (
              <FlipLine key={l.text} text={l.text} accent={l.accent} delay={0.25 + i * 0.09} />
            ))}
          </h1>

          {/* supporting line */}
          <motion.p
            variants={reveal}
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.6 }}
            style={{
              marginTop: 'clamp(20px, 3vh, 34px)',
              maxWidth: 520,
              fontSize: 'clamp(0.98rem, 1.2vw, 1.1rem)',
              lineHeight: 1.6,
              color: MUTED,
              fontWeight: 400,
            }}
          >
            I shape products end-to-end — design, research &amp; creative strategy — turning
            ambiguous ideas into things people actually want to use.
          </motion.p>

          {/* meta */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{
              marginTop: 'clamp(28px, 4vh, 48px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px 24px',
            }}
          >
            {['Product R&D @ tldraw', 'Art & Technology @ UCL', 'Student Ambassador @ Canva'].map((m) => (
              <motion.span
                key={m}
                variants={reveal}
                style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: MUTED }}
              >
                {m}
              </motion.span>
            ))}
          </motion.div>

          {/* magnetic cta */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.85 }}
            style={{ marginTop: 'clamp(32px, 5vh, 56px)', display: 'inline-block' }}
          >
            <a
              ref={magnet.ref}
              {...magnet.handlers}
              href="#works"
              data-cursor="explore"
              style={{
                ...magnet.style,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 26px',
                borderRadius: 999,
                background: FG,
                color: BG,
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Selected work
              <span aria-hidden style={{ color: ACCENT }}>↓</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
