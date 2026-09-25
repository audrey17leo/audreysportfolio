'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sfPro } from '@/lib/fonts'
import { FG, GREEN, HIGHLIGHT, MUTED, MUTED_LIGHT, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

const F = (id: string) => `https://framerusercontent.com/images/${id}`

const CARD_W = 340
const GAP = 20

const cards: {
  type: 'image' | 'video'
  src: string
  bg?: string
  caption: string
  objectPosition?: string
  objectFit?: 'cover' | 'contain'
  portrait?: boolean
}[] = [
  {
    type: 'video',
    src: '/sleeping-render.mp4',
    bg: '#1a1520',
    caption: '4D self-portrait — Blender render',
    objectFit: 'cover',
    objectPosition: 'center 30%',
    portrait: true,
  },
  {
    type: 'video',
    src: '/applayout.mov',
    bg: '#0a0a12',
    caption: 'Link — mobile UI walkthrough for a student networking app',
    objectPosition: 'center top',
  },
  {
    type: 'video',
    src: '/cardanim.mp4',
    bg: '#0d0d0d',
    caption: 'Link — 3D digital e-card animation',
  },
  {
    type: 'image',
    src: F('K4gwJNWnGHo2ZqY3m1oMm03AXI.jpg'),
    caption: 'ACS Jakarta Batik — Final uniform pattern, selected from 800+ submissions',
  },
  {
    type: 'video',
    src: '/FLOWERBLOOM.mov',
    bg: '#0d0d0d',
    caption: 'Flower bloom — body-tracked interactive generative visuals in p5.js',
  },
]

const N = cards.length
const TRANSLATE = N * (CARD_W + GAP)

function CardMedia({ card, style }: { card: typeof cards[0]; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(v)
    return () => observer.disconnect()
  }, [])

  if (card.type === 'video') {
    return (
      <video
        ref={videoRef}
        src={card.src}
        muted
        loop
        playsInline
        preload="none"
        style={{ width: '100%', height: '100%', objectFit: card.objectFit ?? 'cover', objectPosition: card.objectPosition ?? 'center', display: 'block', ...style }}
      />
    )
  }
  return (
    <img
      src={card.src}
      alt=""
      style={{ width: '100%', height: '100%', objectFit: card.objectFit ?? 'cover', objectPosition: card.objectPosition ?? 'center', display: 'block', ...style }}
    />
  )
}

const HOVER_DELAY = 800

export default function DesignExperiments() {
  const [hovered, setHovered] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleEnter(cardIndex: number) {
    timerRef.current = setTimeout(() => setHovered(cardIndex), HOVER_DELAY)
  }

  function handleLeave() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setHovered(null)
  }

  return (
    <section style={{ background: 'transparent', padding: 'clamp(40px, 8vh, 90px) 0 clamp(80px, 12vh, 140px)', position: 'relative' }}>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${TRANSLATE}px); }
        }
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 48 }}
        >
          <p style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', color: MUTED_LIGHT, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
            Design experiments
          </p>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 'clamp(1.7rem, 3.4vw, 2.8rem)', color: FG, letterSpacing: '-0.03em', lineHeight: 1.12, margin: 0 }}>
            Textiles, 3D &amp; things made{' '}
            <span style={{ background: HIGHLIGHT, borderRadius: 8, padding: '0 10px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>for the love of making.</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ overflow: 'hidden', paddingLeft: 48 }}>
        <div
          className="marquee-track"
          style={{ display: 'flex', gap: GAP, width: `${2 * N * (CARD_W + GAP)}px` }}
        >
          {[...cards, ...cards].map((card, i) => {
            const cardIndex = i % N
            const isHovered = hovered === cardIndex
            return (
              <div
                key={i}
                style={{ width: CARD_W, flexShrink: 0 }}
                onMouseEnter={() => handleEnter(cardIndex)}
                onMouseLeave={handleLeave}
              >
                <div style={{
                  width: '100%',
                  height: 380,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: card.bg ?? '#E8E4DE',
                  transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease',
                  transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  filter: hovered !== null && !isHovered ? 'blur(2px) brightness(0.8)' : 'none',
                  cursor: 'pointer',
                }}>
                  <CardMedia card={card} />
                </div>
                <p style={{
                  fontFamily: sfPro,
                  fontSize: '0.85rem',
                  color: hovered !== null && !isHovered ? MUTED_LIGHT : MUTED,
                  letterSpacing: '-0.005em',
                  margin: '14px 2px 0',
                  lineHeight: 1.45,
                  fontWeight: 400,
                  transition: 'color 0.3s ease',
                }}>
                  {card.caption}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              background: 'rgba(8,8,8,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                background: cards[hovered].bg ?? '#E8E4DE',
                ...(cards[hovered].portrait
                  ? { height: '68vh', width: 'auto', aspectRatio: '1080/1850' }
                  : { width: '52vw', maxWidth: 680, aspectRatio: '4/3' }),
              }}
            >
              <CardMedia
                card={cards[hovered]}
                style={cards[hovered].portrait
                  ? { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }
                  : undefined}
              />
            </motion.div>
            <p style={{
              fontFamily: sfPro,
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.75)',
              fontWeight: 300,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {cards[hovered].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
