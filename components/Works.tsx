'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects as realProjects } from '@/lib/projects'
import { useIsMobile } from '@/lib/useIsMobile'
import { reveal, staggerContainer, once, stellaEase } from '@/lib/stellaMotion'
import { FG, MUTED, MUTED_LIGHT, HAIRLINE, CARD, BG, FONT_BODY } from '@/lib/theme'

const displayProjects = realProjects
  .filter(p => p.slug !== 'batik')
  .map(p => ({
    slug: p.slug,
    title: p.title,
    description: p.subtitle,
    tags: p.tags,
    year: p.year,
    bg: p.bg || CARD,
    image: p.heroImage as string | null,
    video:      p.slug === 'plastic-panic' ? '/imac_composite.mp4'  : undefined as string | undefined,
    videoHover: p.slug === 'plastic-panic' ? '/imac_composite2.mp4' : undefined as string | undefined,
  }))

type DisplayProject = typeof displayProjects[number]

function ProjectCard({ project }: { project: DisplayProject }) {
  const [hovered, setHovered] = useState(false)
  const hasVideo = !!project.video && !!project.videoHover
  const vid1 = useRef<HTMLVideoElement>(null)
  const vid2 = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const setup = (v: HTMLVideoElement | null) => {
      if (!v) return
      v.muted = true; v.setAttribute('muted', '')
      const play = () => v.play().catch(() => {})
      play(); v.addEventListener('canplay', play, { once: true })
      return () => v.removeEventListener('canplay', play)
    }
    const c1 = setup(vid1.current); const c2 = setup(vid2.current)
    return () => { c1?.(); c2?.() }
  }, [])

  const isPng = !!project.image && project.image.endsWith('.png')
  const baseScale = isPng ? 0.82 : 1

  return (
    <motion.div variants={reveal} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link
        href={`/works/${project.slug}`}
        data-cursor="explore"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            background: project.bg,
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          {/* media */}
          {hasVideo ? (
            <>
              <video ref={vid1} src={project.video} autoPlay loop muted playsInline preload="auto"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 0 : 1, transition: 'opacity 0.4s' }} />
              <video ref={vid2} src={project.videoHover} autoPlay loop muted playsInline preload="auto"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
            </>
          ) : project.image ? (
            <img src={project.image} alt={project.title}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: isPng ? 'contain' : 'cover',
                transform: `scale(${hovered ? baseScale * 1.02 : baseScale})`,
                transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
              }} />
          ) : null}

          {/* hover overlay — backdrop blur wash */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: `${BG}59`,
              backdropFilter: hovered ? 'blur(6px)' : 'blur(0px)',
              WebkitBackdropFilter: hovered ? 'blur(6px)' : 'blur(0px)',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s, backdrop-filter 0.4s',
              pointerEvents: 'none',
            }}
          />

          {/* hover content — see project (top) + description (center), fade in */}
          <div
            style={{
              position: 'absolute', inset: 0,
              padding: 'clamp(16px, 2vw, 24px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(6px)',
              transition: 'opacity 0.35s, transform 0.35s',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                alignSelf: 'flex-start',
                fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: FG,
                background: CARD, padding: '7px 13px', borderRadius: 999,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                border: `1px solid ${HAIRLINE}`,
              }}
            >
              see project <span aria-hidden>↗</span>
            </span>
            <p
              style={{
                fontFamily: FONT_BODY, fontSize: 'clamp(0.9rem, 1vw, 1rem)', lineHeight: 1.5,
                color: FG, margin: 0, maxWidth: '42ch', fontWeight: 400,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* tags — bottom-left, always visible */}
          <div style={{ position: 'absolute', left: 'clamp(12px,1.5vw,16px)', bottom: 'clamp(12px,1.5vw,16px)', display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 'calc(100% - 32px)', opacity: hovered ? 0 : 1, transition: 'opacity 0.3s' }}>
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: FONT_BODY, fontSize: 14, fontWeight: 500, color: FG,
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                  border: `1px solid ${HAIRLINE}`,
                  padding: '4px 12px', borderRadius: 999,
                  textTransform: 'lowercase', lineHeight: '20px',
                }}
              >
                {t.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* caption row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, padding: '0 2px' }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: 16, fontWeight: 500, color: FG, letterSpacing: '-0.01em' }}>{project.title}</span>
        {project.year && <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: MUTED_LIGHT }}>{project.year}</span>}
      </div>
    </motion.div>
  )
}

export default function Works() {
  const isMobile = useIsMobile()

  return (
    <section id="works" style={{ padding: isMobile ? '24px 24px 96px' : '8px clamp(32px, 6vw, 88px) clamp(96px, 14vh, 160px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={once}
          transition={{ duration: 0.5, ease: stellaEase }}
          style={{ fontFamily: FONT_BODY, fontSize: 14, color: MUTED, margin: '0 0 clamp(16px, 2.5vh, 28px)' }}
        >
          selected work
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={once}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 28 : 12 }}
        >
          {displayProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
