'use client'
import { motion } from 'framer-motion'
import { reveal, staggerContainer, stellaEase } from '@/lib/stellaMotion'
import { FG, MUTED, HAIRLINE, FONT_DISPLAY, FONT_BODY } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        padding: isMobile ? '128px 24px 24px' : 'clamp(150px, 20vh, 220px) clamp(32px, 6vw, 88px) clamp(40px, 6vh, 72px)',
      }}
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'flex-start',
          gap: isMobile ? 24 : 'clamp(28px, 3.5vw, 52px)',
        }}
      >
        {/* B&W portrait */}
        <motion.img
          variants={reveal}
          src="/AUDREYPHOTO.jpg"
          alt="Audrey Leo"
          style={{
            flexShrink: 0,
            width: isMobile ? 130 : 'clamp(130px, 13vw, 176px)',
            height: isMobile ? 165 : 'clamp(165px, 16vw, 220px)',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'grayscale(1) contrast(1.02)',
            borderRadius: 2,
            border: `1px solid ${HAIRLINE}`,
            display: 'block',
          }}
        />

        {/* Intro text */}
        <div style={{ maxWidth: 640, paddingTop: isMobile ? 4 : 2 }}>
          <motion.h1
            variants={reveal}
            transition={{ duration: 0.7, ease: stellaEase }}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 400,
              fontSize: 'clamp(1.7rem, 3vw, 2.7rem)',
              lineHeight: 1.16,
              letterSpacing: '-0.005em',
              color: FG,
              margin: 0,
            }}
          >
            Audrey Leo builds thoughtful things across product,
            design &amp; the craft in&nbsp;between.
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.1 }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              lineHeight: 1.6,
              color: MUTED,
              margin: '18px 0 0',
              fontWeight: 400,
            }}
          >
            Currently in Product R&amp;D @tldraw and studying Art &amp; Technology @UCL.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
