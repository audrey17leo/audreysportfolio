'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sfPro, mono } from '@/lib/fonts'

function PhotoVideoCard() {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleMouseEnter() {
    setHovered(true)
    videoRef.current?.play()
  }
  function handleMouseLeave() {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#E8E4DE',
      }}
    >
      <img
        src="/me.jpg"
        alt="Audrey Leo"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.35s ease',
        }}
      />
      <video
        ref={videoRef}
        src="/me.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        fontFamily: mono,
        fontSize: '0.62rem',
        color: 'rgba(0,0,0,0.45)',
        letterSpacing: '0.06em',
      }}>
        [hover me]
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ background: '#F5F5F3', padding: '0 0 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #E0E0DC', marginBottom: 64 }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '0 64px', alignItems: 'start' }}
        >

          {/* Left, photo */}
          <PhotoVideoCard />

          {/* Right, bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 }}>
            <p style={{
              fontFamily: mono,
              fontSize: '0.65rem',
              color: '#aaa',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              [meet the maker]
            </p>

            <h2 style={{
              fontFamily: sfPro,
              fontWeight: 400,
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              color: '#111',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: 0,
            }}>
              Audrey Leo
            </h2>

            <p style={{
              fontFamily: sfPro,
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              color: '#555',
              lineHeight: 1.75,
              fontWeight: 300,
              margin: 0,
              maxWidth: 480,
            }}>
              First-year Art &amp; Technology student at UCL Slade. I make things that beep, blink,
              and make you feel something, using emerging tech as a medium for creative and emotional
              work.
            </p>

            <p style={{
              fontFamily: sfPro,
              fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
              color: '#555',
              lineHeight: 1.75,
              fontWeight: 300,
              margin: 0,
              maxWidth: 480,
            }}>
              Currently designing at{' '}
              <span style={{ color: '#111', fontWeight: 400 }}>Maje</span> and studying at{' '}
              <span style={{ color: '#111', fontWeight: 400 }}>UCL</span>. Previously worked in
              fashion and media at{' '}
              <span style={{ color: '#111', fontWeight: 400 }}>London Fashion Week</span>,{' '}
              <span style={{ color: '#111', fontWeight: 400 }}>Lawson</span>, and{' '}
              <span style={{ color: '#111', fontWeight: 400 }}>IDN Media</span>.
            </p>

            <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
              <a
                href="mailto:audrey@example.com"
                style={{
                  fontFamily: mono,
                  fontSize: '0.65rem',
                  color: '#888',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: 2,
                }}
              >
                [email]
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: mono,
                  fontSize: '0.65rem',
                  color: '#888',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: 2,
                }}
              >
                [linkedin]
              </a>
              <a
                href="/garden"
                style={{
                  fontFamily: mono,
                  fontSize: '0.65rem',
                  color: '#888',
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: 2,
                }}
              >
                [the garden →]
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
