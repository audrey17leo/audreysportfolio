'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { sfPro, mono } from '@/lib/fonts'
import { useIsMobile } from '@/lib/useIsMobile'

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
        height: '100%',
        overflow: 'hidden',
        borderRadius: 20,
        cursor: 'pointer',
        background: '#E8E4DE',
        flexShrink: 0,
      }}
    >
      <img
        src="/AUDREYPHOTO.jpg"
        alt="Audrey Leo"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: hovered ? 0 : 1, transition: 'opacity 0.35s ease',
        }}
      />
      <video
        ref={videoRef}
        src="/AUDREYBTS.MOV"
        muted
        loop
        playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: hovered ? 1 : 0, transition: 'opacity 0.35s ease',
        }}
      />

      {/* Chat bubble */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10, scale: hovered ? 1 : 0.9 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 16,
          background: '#fff',
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          padding: '9px 14px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.14)',
          fontFamily: sfPro,
          fontSize: '0.78rem',
          fontWeight: 400,
          color: '#111',
          pointerEvents: 'none',
          zIndex: 10,
          whiteSpace: 'nowrap',
          letterSpacing: '-0.01em',
        }}
      >
        BTS.. certified sweet tooth 🍬
      </motion.div>
    </div>
  )
}

const education = {
  school: 'University College London',
  degree: 'BA Art & Technology — First Year',
  grade: 'First Class Honours',
  date: 'Sept 2025 – Present',
  modules: ['Creative Computing', 'Machine Learning', 'Physical Computing', 'C++', 'Python', 'Blender', 'Figma'],
  subrole: 'Marketing Chief – Exhibitions',
  subroleDesc: 'Manage all marketing materials for UCL East exhibitions — concept through to printed posters displayed on-site.',
}

const awards: { title: string; issuer: string; date: string; bullets: string[] }[] = [
  {
    title: 'Winner, Canva AI Hackathon 2.0',
    issuer: 'Canva UK',
    date: 'May 2026',
    bullets: [
      'Built and shipped Link! — a mobile-first digital namecard for student networking using Canva Code in under 2 hours. Designed full front-end, animations and mockups; pitched live at Canva HQ, London.',
      'Won first place among industry professionals as the only university student in attendance.',
    ],
  },
  {
    title: 'Silver Medalist, Indonesia\'s National Science Enterprise Challenge (INASEC)',
    issuer: 'INASEC',
    date: 'Mar 2024',
    bullets: [
      'Co-created a full business plan for BOOMBLOOM, an algae-based bioplastic packaging company, awarded silver among 104 competing teams.',
      'Produced market research, financial statements, and scientific data presentations for a national-level competition.',
    ],
  },
]

const experiences: {
  company: string
  role: string
  date: string
  location: string
  subrole?: string
  subroleDesc?: string
  bullets: string[]
}[] = [
  {
    company: 'Canva',
    role: 'GenC Ambassador',
    date: 'May 2026 – Present',
    location: 'London, UK',
    bullets: [
      'Selected by Canva UK to represent the brand as a GenC Ambassador — part of a cohort of 34 in the UK — hosting live workshops at Canva\'s London HQ for student designers and creators.',
      'Collaborate with a global network of GenC Ambassadors to champion design education and AI-powered creative workflows across university communities.',
    ],
  },
  {
    company: 'Maje Paris',
    role: 'Sales Assistant',
    date: 'Mar 2026 – Present',
    location: 'London, UK',
    bullets: [
      'Brand ambassador at two flagship luxury locations; delivered product knowledge, brand storytelling, and maintained visual merchandising and mannequin styling standards.',
    ],
  },
  {
    company: 'Claude Builder Club & UCL AI Society',
    role: 'Marketing Lead',
    date: 'Oct 2025 – Present',
    location: 'London, UK',
    bullets: [
      'Coordinate comms and produce social content, event branding, and promotional graphics for 400+ members across two student organisations.',
      'Manage end-to-end campaign execution; leverage AI tools (Claude, ChatGPT, Adobe Firefly, Canva AI) for UGC ideation and social-first content workflows.',
    ],
  },
  {
    company: 'London Fashion Week S/S',
    role: 'Lead Design Projection & AV Operator',
    date: 'Aug – Sept 2025',
    location: 'London, UK',
    bullets: [
      'Designed and operated live stage visuals via TouchDesigner and projection mapping for 300+ attendees; coordinated with a cross-functional team of 12+.',
    ],
  },
  {
    company: 'Lawson Indonesia',
    role: 'Marketing & Communications Intern',
    date: 'May – Jul 2025',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Supported ONE PIECE x Lawson brand collab: POS development, competitor analysis, market research, and media monitoring reports; merchandise line exceeded sales projections.',
    ],
  },
  {
    company: 'YUMMY! IDN Media',
    role: 'UI/UX Intern',
    date: 'Jun – Aug 2024',
    location: 'Jakarta, Indonesia',
    bullets: [
      'Redesigned app layout in Figma using typography, colour, and composition principles — boosted user engagement by 15%.',
    ],
  },
  {
    company: 'Dieng Bersih',
    role: 'Merchandise Project Leader & Designer',
    date: 'Jul – Dec 2023',
    location: 'Indonesia',
    bullets: [
      'Led apparel design, sample management, and production for a team of 40+; contributed to $40,000 in donations. Personal hoodie design generated 100+ orders.',
    ],
  },
  {
    company: 'Klinair',
    role: 'Head of Environmental Product Research & Finance',
    date: 'Aug 2022 – 2025',
    location: 'Remote',
    bullets: [
      'Developed compact product design via 3D modelling; raised $10,000+ through fundraising and sponsorship outreach.',
    ],
  },
]

const outside = [
  'Probably mid-Arduino project at 2am',
  'Scouring the internet for concert tickets before they sell out',
  'In a very long awaited nap session',
  'Chasing down a tennis ball like my life depends on it',
]

export default function AboutPage() {
  const isMobile = useIsMobile()

  return (
    <>
      <Navbar />
      <main style={{ background: '#fafafa', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

        {/* Pastel purple nodes — decorative background */}
        <svg
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', userSelect: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* scattered nodes — right side + corners */}
          <circle cx="78%"  cy="8%"  r="5"   fill="#D4C5E8" opacity="0.55" filter="url(#node-glow)"/>
          <circle cx="85%"  cy="18%" r="3.5" fill="#C0B0D8" opacity="0.45"/>
          <circle cx="72%"  cy="22%" r="2.5" fill="#E0D2F0" opacity="0.5"/>
          <circle cx="91%"  cy="32%" r="6"   fill="#D4C5E8" opacity="0.4"  filter="url(#node-glow)"/>
          <circle cx="80%"  cy="38%" r="2.5" fill="#C8B8DC" opacity="0.5"/>
          <circle cx="75%"  cy="48%" r="4"   fill="#D4C5E8" opacity="0.45" filter="url(#node-glow)"/>
          <circle cx="88%"  cy="52%" r="3"   fill="#E0D2F0" opacity="0.4"/>
          <circle cx="94%"  cy="62%" r="2.5" fill="#C0B0D8" opacity="0.5"/>
          <circle cx="77%"  cy="68%" r="5.5" fill="#D4C5E8" opacity="0.4"  filter="url(#node-glow)"/>
          <circle cx="83%"  cy="78%" r="3"   fill="#C8B8DC" opacity="0.45"/>
          <circle cx="71%"  cy="84%" r="2.5" fill="#E0D2F0" opacity="0.5"/>
          <circle cx="89%"  cy="88%" r="4.5" fill="#D4C5E8" opacity="0.4"  filter="url(#node-glow)"/>
          {/* left sparse nodes */}
          <circle cx="4%"   cy="15%" r="3.5" fill="#D4C5E8" opacity="0.35"/>
          <circle cx="8%"   cy="42%" r="2.5" fill="#C0B0D8" opacity="0.3"/>
          <circle cx="3%"   cy="68%" r="4"   fill="#D4C5E8" opacity="0.3"  filter="url(#node-glow)"/>
          <circle cx="7%"   cy="88%" r="2.5" fill="#C8B8DC" opacity="0.35"/>
          {/* faint connecting lines */}
          <line x1="78%" y1="8%"  x2="85%" y2="18%" stroke="#D4C5E8" strokeOpacity="0.15" strokeWidth="0.8"/>
          <line x1="85%" y1="18%" x2="91%" y2="32%" stroke="#D4C5E8" strokeOpacity="0.15" strokeWidth="0.8"/>
          <line x1="72%" y1="22%" x2="80%" y2="38%" stroke="#D4C5E8" strokeOpacity="0.12" strokeWidth="0.8"/>
          <line x1="91%" y1="32%" x2="88%" y2="52%" stroke="#D4C5E8" strokeOpacity="0.12" strokeWidth="0.8"/>
          <line x1="75%" y1="48%" x2="77%" y2="68%" stroke="#D4C5E8" strokeOpacity="0.15" strokeWidth="0.8"/>
          <line x1="88%" y1="52%" x2="94%" y2="62%" stroke="#D4C5E8" strokeOpacity="0.12" strokeWidth="0.8"/>
          <line x1="77%" y1="68%" x2="83%" y2="78%" stroke="#D4C5E8" strokeOpacity="0.15" strokeWidth="0.8"/>
          <line x1="83%" y1="78%" x2="89%" y2="88%" stroke="#D4C5E8" strokeOpacity="0.12" strokeWidth="0.8"/>
        </svg>

        <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '100px 24px 80px' : '148px 48px 120px', position: 'relative', zIndex: 1 }}>

          {/* ── Bio section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '420px 1fr', gap: isMobile ? '24px 0' : '0 56px', alignItems: 'stretch' }}
          >
            {/* Photo */}
            <div style={{ height: isMobile ? 320 : undefined }}>
              <PhotoVideoCard />
            </div>

            {/* Text */}
            <div style={{ paddingTop: 8 }}>
              <h1 style={{
                fontFamily: 'var(--font-display), "Space Grotesk", system-ui, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#262626',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                margin: '0 0 32px',
              }}>
                Audrey Leo
              </h1>

              <p style={{
                fontFamily: sfPro, fontWeight: 300,
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#333', lineHeight: 1.85, margin: '0 0 28px',
              }}>
                Hi, I&apos;m Audrey. I&apos;m based in London, an interdisciplinary creative with a love for
                brand storytelling, visual design, and making things that feel alive.
              </p>

              <p style={{
                fontFamily: sfPro, fontWeight: 300,
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#333', lineHeight: 1.85, margin: '0 0 16px',
              }}>
                Outside of design I&apos;m: <span style={{ fontFamily: mono, fontSize: '0.65rem', color: '#C0B0D8' }}>⸜(｡˃ ᵕ ˂ )⸝</span>
              </p>

              <ul style={{ margin: '0 0 32px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {outside.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: mono, fontSize: '0.65rem', color: '#C0B0D8', flexShrink: 0 }}>
                      {['✦', '⊹', '˖', '✿'][i % 4]}
                    </span>
                    <span style={{ fontFamily: sfPro, fontWeight: 300, fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', color: '#333', lineHeight: 1.7 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p style={{
                fontFamily: sfPro, fontWeight: 300,
                fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
                color: '#333', lineHeight: 1.85, margin: '0 0 36px',
              }}>
                I post my work on{' '}
                <a href="https://linkedin.com/in/audrey17leo" target="_blank" rel="noopener noreferrer"
                  style={{ color: '#111', fontWeight: 400, textDecoration: 'none', borderBottom: '1px solid #ddd' }}>
                  LinkedIn
                </a>
                {' '}and my portfolio. Say hello at{' '}
                <a href="mailto:audrey17leo@gmail.com"
                  style={{ color: '#111', fontWeight: 400, textDecoration: 'none', borderBottom: '1px solid #ddd' }}>
                  audrey17leo@gmail.com
                </a>. <span style={{ fontFamily: mono, fontSize: '0.65rem', color: '#C0B0D8' }}>♡</span>
              </p>

              <div style={{ display: 'flex', gap: 20 }}>
                {[
                  { label: '✉ email', href: 'mailto:audrey17leo@gmail.com' },
                  { label: '↗ linkedin', href: 'https://linkedin.com/in/audrey17leo', external: true },
                  { label: '⌥ github', href: 'https://github.com/node17a', external: true },
                ].map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    style={{
                      fontFamily: mono, fontSize: '0.65rem', color: '#555',
                      textDecoration: 'none', letterSpacing: '0.04em',
                      borderBottom: '1px solid #ddd', paddingBottom: 2,
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Experience ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: 100, paddingTop: 64, borderTop: '1px solid #E0E0DC' }}
          >
            <p style={{ fontFamily: mono, fontSize: '0.58rem', color: '#C0B0D8', letterSpacing: '0.12em', margin: '0 0 48px' }}>
              ˚ ⊹ [experience] ⊹ ˚
            </p>

            {/* Education card */}
            <div style={{
              marginBottom: 48,
              padding: '18px 22px',
              background: 'rgba(192, 176, 216, 0.07)',
              borderRadius: 12,
              border: '1px solid rgba(192, 176, 216, 0.22)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontFamily: sfPro, fontWeight: 500, fontSize: '0.95rem', color: '#111', margin: '0 0 2px', letterSpacing: '-0.01em' }}>
                    {education.school}
                  </p>
                  <p style={{ fontFamily: sfPro, fontWeight: 300, fontSize: '0.88rem', color: '#444', margin: '0 0 4px' }}>
                    {education.degree}
                  </p>
                  <p style={{ fontFamily: mono, fontSize: '0.58rem', color: '#C0B0D8', letterSpacing: '0.06em', margin: '0 0 12px' }}>
                    {education.grade}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {education.modules.map(m => (
                      <span key={m} style={{
                        fontFamily: mono, fontSize: '0.53rem', color: '#9080B8',
                        letterSpacing: '0.05em', background: 'rgba(192, 176, 216, 0.13)',
                        padding: '3px 9px', borderRadius: 4,
                      }}>
                        {m}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontFamily: mono, fontSize: '0.55rem', color: '#C0B0D8', letterSpacing: '0.06em', margin: '0 0 3px', textTransform: 'uppercase' }}>
                    ↳ {education.subrole}
                  </p>
                  <p style={{ fontFamily: sfPro, fontWeight: 300, fontSize: '0.83rem', color: '#555', margin: 0, lineHeight: 1.5 }}>
                    {education.subroleDesc}
                  </p>
                </div>
                <p style={{ fontFamily: mono, fontSize: '0.6rem', color: '#888', letterSpacing: '0.04em', margin: 0, whiteSpace: 'nowrap' }}>
                  {education.date}
                </p>
              </div>
            </div>

            <div style={{ position: 'relative', paddingLeft: 28 }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: 0, top: 6, bottom: 6, width: 1, background: '#E0E0DC' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {experiences.map((exp, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: -32, top: 6,
                      width: 7, height: 7, borderRadius: '50%', background: '#C0B0D8',
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                      <div>
                        <p style={{ fontFamily: sfPro, fontWeight: 500, fontSize: '0.95rem', color: '#111', margin: '0 0 3px', letterSpacing: '-0.01em' }}>
                          {exp.company}
                        </p>
                        <p style={{ fontFamily: sfPro, fontWeight: 300, fontSize: '0.88rem', color: '#444', margin: 0 }}>
                          {exp.role}
                        </p>
                        {exp.subrole && (
                          <p style={{ fontFamily: mono, fontSize: '0.55rem', color: '#C0B0D8', letterSpacing: '0.06em', margin: '5px 0 0', textTransform: 'uppercase' }}>
                            ↳ {exp.subrole}
                          </p>
                        )}
                        {exp.subroleDesc && (
                          <p style={{ fontFamily: sfPro, fontWeight: 300, fontSize: '0.83rem', color: '#555', margin: '3px 0 0', lineHeight: 1.5 }}>
                            {exp.subroleDesc}
                          </p>
                        )}
                      </div>
                      <p style={{ fontFamily: mono, fontSize: '0.6rem', color: '#888', letterSpacing: '0.04em', margin: 0, whiteSpace: 'nowrap' }}>
                        {exp.date} · {exp.location}
                      </p>
                    </div>

                    {exp.bullets.length > 0 && (
                      <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                            <span style={{ fontFamily: mono, fontSize: '0.55rem', color: '#999', flexShrink: 0 }}>–</span>
                            <span style={{ fontFamily: sfPro, fontWeight: 300, fontSize: '0.88rem', color: '#444', lineHeight: 1.6 }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Awards ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: 80, paddingTop: 64, borderTop: '1px solid #E0E0DC' }}
          >
            <p style={{ fontFamily: mono, fontSize: '0.58rem', color: '#C0B0D8', letterSpacing: '0.12em', margin: '0 0 48px' }}>
              ˚ ⊹ [awards] ⊹ ˚
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {awards.map((award, i) => (
                <div
                  key={i}
                  style={{
                    padding: '18px 22px',
                    background: 'rgba(192, 176, 216, 0.07)',
                    borderRadius: 12,
                    border: '1px solid rgba(192, 176, 216, 0.22)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 10 }}>
                    <p style={{ fontFamily: sfPro, fontWeight: 500, fontSize: '0.95rem', color: '#111', margin: 0, letterSpacing: '-0.01em' }}>
                      {award.title}
                    </p>
                    <p style={{ fontFamily: mono, fontSize: '0.6rem', color: '#888', letterSpacing: '0.04em', margin: 0, whiteSpace: 'nowrap' }}>
                      {award.issuer} · {award.date}
                    </p>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {award.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                        <span style={{ fontFamily: mono, fontSize: '0.55rem', color: '#999', flexShrink: 0 }}>–</span>
                        <span style={{ fontFamily: sfPro, fontWeight: 300, fontSize: '0.88rem', color: '#444', lineHeight: 1.6 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </>
  )
}
