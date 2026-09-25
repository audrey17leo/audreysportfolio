'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects as realProjects } from '@/lib/projects'
import { useIsMobile } from '@/lib/useIsMobile'
import { reveal, staggerContainer, flipUp, imageReveal, cardHover, cardHoverTransition, once } from '@/lib/stellaMotion'
import { BG, FG, ACCENT, MUTED, MUTED_LIGHT, HAIRLINE, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

const displayProjects = realProjects
  .filter(p => p.slug !== 'batik')
  .map((p, i) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.subtitle,
    tags: p.tags,
    year: p.year,
    image: p.heroImage as string | null,
    video:      p.slug === 'plastic-panic' ? '/imac_composite.mp4'  : undefined as string | undefined,
    videoHover: p.slug === 'plastic-panic' ? '/imac_composite2.mp4' : undefined as string | undefined,
    index: i,
  }))

type DisplayProject = typeof displayProjects[number]

function ProjectCard({ project }: { project: DisplayProject }) {
  const [hovered, setHovered] = useState(false)
  const hasVideo = !!project.video && !!project.videoHover
  const vid1Ref = useRef<HTMLVideoElement>(null)
  const vid2Ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const setup = (v: HTMLVideoElement | null) => {
      if (!v) return
      v.muted = true
      v.setAttribute('muted', '')
      const play = () => v.play().catch(() => {})
      play()
      v.addEventListener('canplay', play, { once: true })
      return () => v.removeEventListener('canplay', play)
    }
    const c1 = setup(vid1Ref.current)
    const c2 = setup(vid2Ref.current)
    return () => { c1?.(); c2?.() }
  }, [])

  const isImpermanence = project.id === 'impermanence'

  return (
    <motion.div
      variants={reveal}
      whileHover={cardHover}
      transition={cardHoverTransition}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
    >
      {/* Media (Aditya image reveal) */}
      <motion.div
        variants={imageReveal}
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          background: isImpermanence ? '#0d0d10' : '#f0f0ee',
          border: `1px solid ${HAIRLINE}`,
        }}
      >
        {hasVideo ? (
          <>
            <video
              ref={vid1Ref}
              src={project.video}
              autoPlay loop muted playsInline preload="auto"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 0 : 1, transition: 'opacity 0.4s ease' }}
            />
            <video
              ref={vid2Ref}
              src={project.videoHover}
              autoPlay loop muted playsInline preload="auto"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: project.image.endsWith('.png') ? 'contain' : 'cover',
              transform: (project.image.endsWith('.png') ? 'scale(1.22)' : 'scale(1)') + (hovered ? ' scale(1.04)' : ''),
              transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ) : null}
      </motion.div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 18, gap: 16 }}>
        <p style={{ fontFamily: FONT_MONO, margin: 0, fontSize: '0.64rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED_LIGHT }}>
          {project.tags.join(' · ')}
        </p>
        {project.year && (
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.04em', color: MUTED_LIGHT }}>{project.year}</span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: FONT_DISPLAY, margin: '8px 0 8px', fontWeight: 600, fontSize: '1.4rem', letterSpacing: '-0.02em', color: FG, lineHeight: 1.15, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {project.title}
        <span aria-hidden style={{ color: ACCENT, opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-6px)', transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', fontSize: '1rem' }}>→</span>
      </h3>

      {/* Description */}
      {project.description && (
        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.55, color: MUTED, maxWidth: '48ch' }}>
          {project.description}
        </p>
      )}
    </motion.div>
  )
}

export default function Works() {
  const isMobile = useIsMobile()

  return (
    <section id="works" style={{ background: BG, padding: 'clamp(80px, 12vh, 150px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: isMobile ? '0 24px' : '0 clamp(48px, 6vw, 96px)' }}>

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={once}
          variants={staggerContainer}
          style={{ marginBottom: 'clamp(40px, 6vh, 72px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}
        >
          <div style={{ perspective: 800 }}>
            <motion.div variants={reveal} style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: MUTED_LIGHT, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
              Selected work
            </motion.div>
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.h2 variants={flipUp} style={{ fontFamily: FONT_DISPLAY, margin: 0, fontWeight: 600, fontSize: 'clamp(1.9rem, 3.6vw, 3.2rem)', letterSpacing: '-0.035em', color: FG, transformOrigin: 'bottom' }}>
                Things I&apos;ve made.
              </motion.h2>
            </span>
          </div>
          <motion.p variants={reveal} style={{ margin: 0, fontSize: '0.92rem', color: MUTED, maxWidth: '34ch', lineHeight: 1.6 }}>
            A mix of product, creative computing &amp; interactive work — each with a full case study.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={once}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '56px' : 'clamp(56px, 6vw, 96px) clamp(32px, 4vw, 56px)' }}
        >
          {displayProjects.map((p) => (
            <Link key={p.id} href={`/works/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }} data-cursor="explore">
              <ProjectCard project={p} />
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
