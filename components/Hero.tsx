'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { reveal, staggerContainer } from '@/lib/stellaMotion'
import { FG, MUTED, MUTED_LIGHT, HAIRLINE, CARD, HIGHLIGHT, GREEN, FONT_DISPLAY, FONT_MONO, FONT_BODY, R_CARD } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'

const SleepingModel = dynamic(() => import('./SleepingModel'), { ssr: false })

// Yellow marker-pen highlight behind a word (Flim signature)
function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: HIGHLIGHT, borderRadius: 6, padding: '0 8px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
      {children}
    </span>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: 'transparent',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(130px, 18vh, 210px) clamp(24px, 6vw, 96px) clamp(60px, 9vh, 110px)',
      }}
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
          gap: isMobile ? 48 : 'clamp(40px, 6vw, 96px)',
          alignItems: 'start',
        }}
      >
        {/* LEFT — identity */}
        <div>
          <motion.h1
            variants={reveal}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 500,
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: FG,
              margin: 0,
            }}
          >
            Audrey Leo
          </motion.h1>

          <motion.p
            variants={reveal}
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: MUTED,
              margin: '18px 0 0',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
            Product designer — creative technologist
          </motion.p>

          {/* Small 3D figure, framed like a pinned polaroid, to the side */}
          <motion.div
            variants={reveal}
            style={{
              marginTop: 'clamp(32px, 5vh, 56px)',
              width: isMobile ? 200 : 240,
              height: isMobile ? 200 : 240,
              background: CARD,
              border: `1px solid ${HAIRLINE}`,
              borderRadius: R_CARD,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <SleepingModel />
            </div>
          </motion.div>

          <motion.p
            variants={reveal}
            style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED_LIGHT, margin: '18px 0 0' }}
          >
            Based in London
          </motion.p>
        </div>

        {/* RIGHT — statement */}
        <div style={{ paddingTop: isMobile ? 0 : 6 }}>
          <motion.p
            variants={reveal}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
              fontWeight: 400,
              lineHeight: 1.32,
              letterSpacing: '-0.01em',
              color: FG,
              margin: 0,
              maxWidth: 560,
            }}
          >
            I design what people <Mark>feel</Mark>, not just what they notice —
            accessible, clear &amp; intentional.
          </motion.p>

          <motion.div variants={reveal} style={{ marginTop: 'clamp(32px, 5vh, 52px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED }}>
              Currently —{' '}
              <a href="https://www.tldraw.com" target="_blank" rel="noopener noreferrer" data-cursor="explore" style={{ color: FG, textDecoration: 'none', borderBottom: `1px solid ${FG}`, paddingBottom: 2 }}>
                Product R&amp;D @ tldraw ↗
              </a>
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTED_LIGHT }}>
              Previously — London Fashion Week · Lawson · IDN
            </span>
          </motion.div>

          <motion.a
            variants={reveal}
            href="#works"
            data-cursor="explore"
            style={{
              marginTop: 'clamp(36px, 6vh, 64px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: FONT_MONO,
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: FG,
              textDecoration: 'none',
              borderBottom: `1px solid ${FG}`,
              paddingBottom: 4,
              width: 'fit-content',
            }}
          >
            Selected work ↓
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
