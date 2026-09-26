'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects as realProjects } from '@/lib/projects'
import { useIsMobile } from '@/lib/useIsMobile'
import { reveal, staggerContainer, once, stellaEase } from '@/lib/stellaMotion'
import { FG, MUTED, HAIRLINE, CARD, FONT_BODY } from '@/lib/theme'

// Per-project accent for the hover label (ruocanpeng: the name pill is coloured).
const ACCENTS: Record<string, string> = {
  'tldraw-flash': '#3f7ff0',
  'gofresh': '#2f9e44',
  'folio': '#8b6dff',
}

const displayProjects = realProjects
  .filter(p => p.slug !== 'batik')
  .map(p => ({
    slug: p.slug,
    title: p.title,
    description: p.subtitle,
    cardLine: p.cardLine,
    discipline: p.discipline,
    tags: p.tags,
    year: p.year,
    yearShort: p.year.split('·')[0].trim(),
    bg: p.bg || CARD,
    image: p.heroImage as string | null,
    cardVideo: p.cardVideo as string | undefined,
    video:      p.slug === 'plastic-panic' ? '/imac_composite.mp4'  : undefined as string | undefined,
    videoHover: p.slug === 'plastic-panic' ? '/imac_composite2.mp4' : undefined as string | undefined,
  }))

type DisplayProject = typeof displayProjects[number]

function ProjectCard({ project }: { project: DisplayProject }) {
  const [hovered, setHovered] = useState(false)
  const hasVideo = !!project.video && !!project.videoHover
  const vid1 = useRef<HTMLVideoElement>(null)
  const vid2 = useRef<HTMLVideoElement>(null)

  // Card motion video: cover for 3s -> autoplay once -> then plays only on hover.
  const cardVid = useRef<HTMLVideoElement>(null)
  const [videoOn, setVideoOn] = useState(false)  // video layer visible + playing
  const autoDoneRef = useRef(false)              // first (delayed) autoplay finished

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

  // 3s-delayed first play of the card motion video.
  useEffect(() => {
    if (!project.cardVideo) return
    const t = setTimeout(() => {
      const v = cardVid.current
      if (!v) return
      v.currentTime = 0
      setVideoOn(true)
      v.play().catch(() => {})
    }, 3000)
    return () => clearTimeout(t)
  }, [project.cardVideo])

  const onCardVideoEnded = () => {
    autoDoneRef.current = true
    // after the first pass, revert to the cover unless the cursor is on the card
    if (!hovered) {
      setVideoOn(false)
      const v = cardVid.current
      if (v) { v.pause(); v.currentTime = 0 }
    }
  }

  const enter = () => {
    setHovered(true)
    if (project.cardVideo && autoDoneRef.current) {
      setVideoOn(true)
      cardVid.current?.play().catch(() => {})
    }
  }
  const leave = () => {
    setHovered(false)
    if (project.cardVideo && autoDoneRef.current) {
      setVideoOn(false)
      const v = cardVid.current
      if (v) { v.pause(); v.currentTime = 0 }
    }
  }

  const isPng = !!project.image && project.image.endsWith('.png')
  const baseScale = 1
  const accent = ACCENTS[project.slug] ?? FG

  return (
    <motion.div variants={reveal} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Link
        href={`/works/${project.slug}`}
        data-cursor="see-project"
        onMouseEnter={enter}
        onMouseLeave={leave}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            background: project.bg,
            borderRadius: 20,
            overflow: 'hidden',
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          {/* media */}
          {project.cardVideo ? (
            <>
              {project.image && (
                <img src={project.image} alt={project.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${hovered ? 1.02 : 1})`, transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }} />
              )}
              <video ref={cardVid} src={project.cardVideo} muted playsInline preload="auto" onEnded={onCardVideoEnded}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: videoOn ? 1 : 0, transition: 'opacity 0.5s ease' }} />
            </>
          ) : hasVideo ? (
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

          {/* labels — bottom-left on hover: name in the project's accent, then descriptors */}
          <div style={{ position: 'absolute', left: 'clamp(14px,1.6vw,20px)', bottom: 'clamp(14px,1.6vw,20px)', display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 'calc(100% - 40px)', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.3s ease, transform 0.3s ease', pointerEvents: 'none' }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, color: accent, background: '#fff', padding: '8px 17px', borderRadius: 13, whiteSpace: 'nowrap', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              {project.title}
            </span>
            {project.tags.slice(0, 2).map((t) => (
              <span key={t} style={{ fontFamily: FONT_BODY, fontSize: 15, fontWeight: 500, color: '#555', background: '#fff', padding: '8px 17px', borderRadius: 13, whiteSpace: 'nowrap', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                {t.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
      </Link>
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
