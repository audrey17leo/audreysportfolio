'use client'
import { motion } from 'framer-motion'
import { reveal, staggerContainer, stellaEase } from '@/lib/stellaMotion'
import { FG, MUTED, HAIRLINE, ACCENT, FONT_DISPLAY, FONT_BODY } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'

// Exact link hover from ruocanpeng: muted → #FF0050
function HoverLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="explore"
      style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
    >
      {children}
    </a>
  )
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        padding: isMobile ? '132px 24px 24px' : 'clamp(150px, 20vh, 210px) clamp(32px, 6vw, 88px) clamp(40px, 6vh, 72px)',
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
          gap: isMobile ? 22 : 44,
        }}
      >
        {/* Portrait, 120×120 square, B&W */}
        <motion.img
          variants={reveal}
          src="/AUDREYPHOTO.jpg"
          alt="Audrey Leo"
          style={{
            flexShrink: 0,
            width: 120,
            height: 120,
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'grayscale(1) contrast(1.02)',
            borderRadius: 0,
            display: 'block',
            border: `1px solid ${HAIRLINE}`,
          }}
        />

        {/* Intro text */}
        <div style={{ maxWidth: 620 }}>
          <motion.h1
            variants={reveal}
            transition={{ duration: 0.7, ease: stellaEase }}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 300, // whisper-weight (ElevenLabs signature)
              fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', // → 32px desktop (ruocan sizing)
              lineHeight: 1.13,
              letterSpacing: '-0.02em',
              color: FG,
              margin: 0,
            }}
          >
            Audrey Leo builds thoughtful things across product, design &amp; the craft in&nbsp;between.
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.6, ease: stellaEase, delay: 0.1 }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: 16,
              lineHeight: '24px',
              color: MUTED,
              margin: '16px 0 0',
              fontWeight: 400,
            }}
          >
            Currently in Product R&amp;D <HoverLink href="https://www.tldraw.com">@tldraw</HoverLink> and studying
            Art &amp; Technology <HoverLink href="https://www.ucl.ac.uk">@UCL</HoverLink>.
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}
