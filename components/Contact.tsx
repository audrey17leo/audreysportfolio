'use client'
import { motion } from 'framer-motion'
import { reveal, staggerContainer, flipUp, once, stellaEase } from '@/lib/stellaMotion'
import { FG, GREEN, MUTED, MUTED_LIGHT, HAIRLINE, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'
import { useIsMobile } from '@/lib/useIsMobile'
import { useMagnetic } from '@/lib/useMagnetic'

const EMAIL = 'audrey17leo@gmail.com'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/audrey17leo' },
  { label: 'GitHub', href: 'https://github.com/node17a' },
  { label: 'Email', href: `mailto:${EMAIL}` },
]

export default function Contact() {
  const isMobile = useIsMobile()
  const magnet = useMagnetic<HTMLAnchorElement>(0.25)

  return (
    <section
      id="contact"
      style={{
        background: 'transparent',
        borderTop: `1px solid ${HAIRLINE}`,
        padding: isMobile ? '80px 24px 40px' : 'clamp(100px, 15vh, 180px) clamp(48px, 6vw, 96px) 48px',
        position: 'relative',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={once}
        variants={staggerContainer}
        style={{ maxWidth: 1320, margin: '0 auto' }}
      >
        {/* Label */}
        <motion.div variants={reveal} style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED_LIGHT, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
          Available for work
        </motion.div>

        {/* Big statement */}
        <h2 style={{ fontFamily: FONT_DISPLAY, margin: 0, fontWeight: 300, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.08, color: FG, perspective: 800 }}>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <motion.span variants={flipUp} style={{ display: 'block', transformOrigin: 'bottom' }}>Let&apos;s make something</motion.span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
            <motion.span variants={flipUp} transition={{ duration: 0.75, ease: stellaEase, delay: 0.08 }} style={{ display: 'block', transformOrigin: 'bottom' }}>
              people love.
            </motion.span>
          </span>
        </h2>

        {/* Email */}
        <motion.div variants={reveal} style={{ marginTop: 'clamp(36px, 6vh, 60px)' }}>
          <a
            ref={magnet.ref}
            {...magnet.handlers}
            href={`mailto:${EMAIL}`}
            data-cursor="explore"
            style={{
              ...magnet.style,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: FONT_DISPLAY,
              fontSize: 'clamp(1.1rem, 2.4vw, 1.8rem)',
              fontWeight: 500,
              color: FG,
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              borderBottom: `1px solid ${FG}`,
              paddingBottom: 6,
            }}
          >
            {EMAIL}
            <span aria-hidden style={{ color: FG }}>↗</span>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div variants={reveal} style={{ marginTop: 'clamp(40px, 6vh, 64px)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {socials.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-cursor="explore"
              style={{ fontFamily: FONT_MONO, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED, textDecoration: 'none', borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: 4 }}
            >
              {l.label}
            </a>
          ))}
        </motion.div>

        {/* Baseline */}
        <div style={{ marginTop: 'clamp(64px, 12vh, 130px)', paddingTop: 28, borderTop: `1px solid ${HAIRLINE}`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 12 }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.62rem', color: MUTED_LIGHT, letterSpacing: '0.03em', lineHeight: 1.6 }}>
            © 2026 Audrey Leo, made with love, white chocolate matchas &amp; a concerning amount of green grapes.
          </span>
          <a href="#" data-cursor="explore" style={{ fontFamily: FONT_MONO, fontSize: '0.62rem', color: MUTED, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
            Back to top ↑
          </a>
        </div>
      </motion.div>
    </section>
  )
}
