'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects as realProjects } from '@/lib/projects'
import { useIsMobile } from '@/lib/useIsMobile'
import { reveal, staggerContainer, once, stellaEase } from '@/lib/stellaMotion'
import { FG, MUTED, MUTED_LIGHT, HAIRLINE, CARD, TAG_GOLD, FONT_BODY } from '@/lib/theme'

const displayProjects = realProjects
  .filter(p => p.slug !== 'batik')
  .map(p => ({
    slug: p.slug,
    title: p.title,
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

  return (
    <motion.div variants={reveal} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
            aspectRatio: '4 / 3',
            background: project.bg,
            borderRadius: 12,
            overflow: 'hidden',
            border: `1px solid ${HAIRLINE}`,
          }}
        >
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
                transform: (isPng ? 'scale(0.82)' : 'scale(1)') + (hovered ? ' scale(1.03)' : ''),
                transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
              }} />
          ) : null}

          {/* see project — top-left, fades in on hover */}
          <div
            style={{
              position: 'absolute', top: 16, left: 16,
              background: CARD, color: FG,
              fontFamily: FONT_BODY, fontSize: '0.8rem', fontWeight: 500,
              padding: '8px 14px', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 0.3s, transform 0.3s',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
            }}
          >
            see project <span aria-hidden>↗</span>
          </div>

          {/* tag pills — bottom-left */}
          <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 'calc(100% - 32px)' }}>
            {project.tags.slice(0, 3).map((t, i) => (
              <span
                key={t}
                style={{
                  fontFamily: FONT_BODY, fontSize: '0.72rem', fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: i === 0 ? TAG_GOLD : FG,
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                  border: `1px solid ${HAIRLINE}`,
                  padding: '5px 11px', borderRadius: 999,
                  textTransform: 'lowercase',
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
        <span style={{ fontFamily: FONT_BODY, fontSize: '0.98rem', fontWeight: 600, color: FG, letterSpacing: '-0.01em' }}>{project.title}</span>
        {project.year && <span style={{ fontFamily: FONT_BODY, fontSize: '0.82rem', color: MUTED_LIGHT }}>{project.year}</span>}
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
          style={{ fontFamily: FONT_BODY, fontSize: '0.9rem', color: MUTED, margin: '0 0 clamp(20px, 3vh, 32px)' }}
        >
          selected work
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={once}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 'clamp(20px, 2vw, 28px)' }}
        >
          {displayProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
