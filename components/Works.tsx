'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projects as realProjects } from '@/lib/projects'
import { sfPro, mono } from '@/lib/fonts'
import { useIsMobile } from '@/lib/useIsMobile'

const baseProjects = realProjects
  .filter(p => p.slug !== 'batik')
  .map(p => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    description: p.subtitle,
    tags: p.tags,
    image: p.heroImage as string | null,
    aspectRatio: '4/3' as const,
    video:      p.slug === 'plastic-panic' ? '/imac_composite.mp4'  : undefined as string | undefined,
    videoHover: p.slug === 'plastic-panic' ? '/imac_composite2.mp4' : undefined as string | undefined,
    comingSoon: false,
  }))

const displayProjects = baseProjects

type DisplayProject = typeof displayProjects[number]

function ProjectCard({ project, index }: { project: DisplayProject; index: number }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: project.comingSoon ? 'default' : project.slug ? 'pointer' : 'default',
        background: '#F5F5F3',
        border: '1px solid #E0E0DC',
        borderRadius: 16,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Coming soon overlay */}
      {project.comingSoon && hovered && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'rgba(245,245,243,0.88)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: mono, fontSize: '0.65rem', color: '#999', letterSpacing: '0.1em' }}>
            coming soon!
          </span>
        </div>
      )}

      {/* Tag */}
      <p style={{
        fontFamily: mono,
        fontSize: '0.58rem',
        color: '#aaa',
        letterSpacing: '0.06em',
        margin: '0 0 10px',
        textTransform: 'uppercase',
      }}>
        [{project.tags.join(', ')}]
      </p>

      {/* Media container */}
      {project.id === 'impermanence' && project.image ? (
        /* ── Soft glow frame for Impermanence ── */
        <div style={{
          width: '100%',
          aspectRatio: project.aspectRatio,
          marginBottom: 14,
          position: 'relative',
        }}>
          {/* Blurred glow */}
          <img
            src={project.image}
            aria-hidden
            style={{
              position: 'absolute',
              inset: 26,
              width: 'calc(100% - 52px)',
              height: 'calc(100% - 52px)',
              objectFit: 'cover',
              filter: 'blur(18px) saturate(1.2)',
              opacity: 0.38,
              borderRadius: 10,
              zIndex: 0,
            }}
          />
          {/* Gradient border + image */}
          <div style={{
            position: 'absolute', inset: 30,
            zIndex: 1,
            borderRadius: 11,
            padding: '1.5px',
            background: 'linear-gradient(135deg, rgba(205,182,255,0.75), rgba(182,208,255,0.75), rgba(182,238,224,0.6), rgba(255,218,192,0.65), rgba(205,182,255,0.75))',
            boxSizing: 'border-box' as const,
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          width: '100%',
          aspectRatio: project.aspectRatio,
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 14,
          position: 'relative',
          background: '#F5F5F3',
        }}>
        {hasVideo ? (
          <>
            <video
              ref={vid1Ref}
              src={project.video}
              autoPlay loop muted playsInline preload="auto"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: hovered ? 0 : 1,
                transition: 'opacity 0.4s ease',
                mixBlendMode: 'multiply',
              }}
            />
            <video
              ref={vid2Ref}
              src={project.videoHover}
              autoPlay loop muted playsInline preload="auto"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
                mixBlendMode: 'multiply',
              }}
            />
          </>
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%', height: '100%', display: 'block',
              objectFit: project.image.endsWith('.png') ? 'contain' : 'cover',
              transform: project.image.endsWith('.png') ? 'scale(1.35)' : 'none',
            }}
          />
        ) : null}
        </div>
      )}

      {/* Title */}
      <h2 style={{
        fontFamily: sfPro,
        fontWeight: 500,
        fontSize: '0.95rem',
        color: '#111',
        letterSpacing: '-0.01em',
        margin: '0 0 4px',
        lineHeight: 1.3,
      }}>
        {project.title}
      </h2>

      {/* Description */}
      {project.description && (
        <p style={{
          fontFamily: sfPro,
          fontSize: '0.75rem',
          color: '#999',
          lineHeight: 1.5,
          fontWeight: 400,
          margin: 0,
        }}>
          {project.description}
        </p>
      )}
    </motion.div>
  )
}

export default function Works() {
  const isMobile = useIsMobile()

  return (
    <section id="works" style={{ background: '#F5F5F3', padding: '16px 0 120px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px' }}>

          {/* 2-column grid — single column on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '64px 32px' }}>
            {displayProjects.map((p, i) =>
              p.slug ? (
                <Link
                  key={p.id}
                  href={`/works/${p.slug}`}
                  style={{ textDecoration: 'none', display: 'block', gridColumn: p.comingSoon ? '1 / -1' : undefined }}
                  data-cursor="explore"
                >
                  <ProjectCard project={p} index={i} />
                </Link>
              ) : (
                <div key={p.id} style={{ gridColumn: p.comingSoon && !isMobile ? '1 / -1' : undefined }}>
                  <div style={{ maxWidth: p.comingSoon && !isMobile ? 'calc((100% - 32px) / 2)' : '100%', margin: p.comingSoon && !isMobile ? '0 auto' : undefined }}>
                    <ProjectCard project={p} index={i} />
                  </div>
                </div>
              )
            )}
          </div>

      </div>
    </section>
  )
}
