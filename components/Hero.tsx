'use client'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { reveal, staggerContainer } from '@/lib/stellaMotion'
import { FG, MUTED, MUTED_LIGHT, HAIRLINE, CARD, HIGHLIGHT, GREEN, FONT_DISPLAY, FONT_MONO, FONT_BODY, R_CARD } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'

const SleepingModel = dynamic(() => import('./SleepingModel'), { ssr: false })

const metaLabel: React.CSSProperties = {
  fontFamily: FONT_MONO,
  fontSize: '0.7rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: isMobile ? '104px 24px 28px' : 'clamp(110px, 13vh, 150px) clamp(32px, 5vw, 72px) clamp(28px, 4vh, 44px)',
      }}
    >
      {/* ── TOP META ROW — frames the top edge ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
      >
        <motion.span variants={reveal} style={{ ...metaLabel, color: MUTED, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
          Product designer — creative technologist
        </motion.span>
        {!isMobile && (
          <motion.span variants={reveal} style={{ ...metaLabel, color: MUTED_LIGHT }}>
            Based in London — 51.5°N
          </motion.span>
        )}
      </motion.div>

      {/* ── CENTER — wordmark ↔ statement ── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.02fr 0.98fr',
          gap: isMobile ? 40 : 'clamp(40px, 6vw, 88px)',
          alignItems: 'center',
          padding: isMobile ? '48px 0' : 0,
        }}
      >
        {/* LEFT — dominant stacked wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 500,
            fontSize: 'clamp(3.4rem, 11vw, 9rem)',
            lineHeight: 0.86,
            letterSpacing: '-0.045em',
            color: FG,
            margin: 0,
          }}
        >
          Audrey<br />Leo
        </motion.h1>

        {/* RIGHT — statement + credentials + pinned 3D */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 4vh, 44px)' }}
        >
          <motion.p
            variants={reveal}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1.35rem, 2vw, 1.9rem)',
              fontWeight: 400,
              lineHeight: 1.36,
              letterSpacing: '-0.01em',
              color: FG,
              margin: 0,
              maxWidth: 480,
            }}
          >
            I design what people{' '}
            <span style={{ background: HIGHLIGHT, borderRadius: 6, padding: '0 8px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>feel</span>,
            not just what they notice — accessible, clear &amp; intentional.
          </motion.p>

          {/* credentials + pinned polaroid share a baseline row → balances the wordmark */}
          <motion.div variants={reveal} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ ...metaLabel, fontSize: '0.72rem', color: MUTED }}>
                Currently{' '}
                <a href="https://www.tldraw.com" target="_blank" rel="noopener noreferrer" data-cursor="explore" style={{ color: FG, textDecoration: 'none', borderBottom: `1px solid ${FG}`, paddingBottom: 2 }}>
                  Product R&amp;D @ tldraw ↗
                </a>
              </span>
              <span style={{ ...metaLabel, fontSize: '0.7rem', color: MUTED_LIGHT }}>
                Art &amp; Technology @ UCL
              </span>
              <span style={{ ...metaLabel, fontSize: '0.7rem', color: MUTED_LIGHT }}>
                Prev. LFW · Lawson · IDN
              </span>
            </div>

            {/* pinned polaroid — small, to the side */}
            <figure style={{ margin: 0, flexShrink: 0, width: isMobile ? 128 : 168 }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
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
              </div>
              <figcaption style={{ ...metaLabel, fontSize: '0.56rem', color: MUTED_LIGHT, marginTop: 8, letterSpacing: '0.1em' }}>
                fig.01 — always napping
              </figcaption>
            </figure>
          </motion.div>
        </motion.div>
      </div>

      {/* ── BOTTOM BASELINE ROW — frames the bottom edge ── */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          paddingTop: 'clamp(20px, 3vh, 32px)',
          borderTop: `1px solid ${HAIRLINE}`,
          flexWrap: 'wrap',
        }}
      >
        <motion.a
          variants={reveal}
          href="#works"
          data-cursor="explore"
          style={{ ...metaLabel, color: FG, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}
        >
          Selected work ↓
        </motion.a>
        <motion.span variants={reveal} style={{ ...metaLabel, fontSize: '0.66rem', color: MUTED_LIGHT }}>
          Portfolio © 2026
        </motion.span>
      </motion.div>
    </section>
  )
}
