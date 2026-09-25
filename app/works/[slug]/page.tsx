import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import Reveal from '@/components/Reveal'
import { projects, getProject, type ProcessSection } from '@/lib/projects'
import { sfPro } from '@/lib/fonts'
import { FG, GRAPHITE, MUTED, MUTED_LIGHT, HAIRLINE, ACCENT, CARD, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

type Props = { params: { slug: string } }

// Parse **bold** into nodes
function parseBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 600, color: FG }}>{part}</strong> : part
  )
}

const WIDE = 1180

const label: React.CSSProperties = {
  fontFamily: FONT_MONO, fontSize: 12, color: GRAPHITE, letterSpacing: '0.12em',
  textTransform: 'uppercase', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10,
}
const heading: React.CSSProperties = {
  fontFamily: FONT_DISPLAY, fontWeight: 300, fontSize: 'clamp(1.35rem, 2vw, 1.8rem)',
  color: FG, letterSpacing: '-0.02em', lineHeight: 1.18, margin: '0 0 20px',
}
const body: React.CSSProperties = {
  fontFamily: sfPro, fontWeight: 400, fontSize: 16, color: MUTED, lineHeight: 1.6,
  letterSpacing: '0.16px', margin: 0,
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
}

function Visual({ src, caption, isVideo }: { src: string; caption?: string; isVideo?: boolean }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${HAIRLINE}`, background: CARD }}>
        {isVideo || src.endsWith('.mp4')
          ? <AutoPlayVideo src={src} style={{ width: '100%', display: 'block' }} />
          : <img src={src} alt={caption ?? ''} style={{ width: '100%', height: 'auto', display: 'block' }} />}
      </div>
      {caption && (
        <figcaption style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT, letterSpacing: '0.02em', marginTop: 12, lineHeight: 1.5 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function StateTable({ table }: { table: NonNullable<ProcessSection['table']> }) {
  return (
    <div style={{ marginTop: 24, border: `1px solid ${HAIRLINE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 2.1fr' }}>
        {table.head.map((h, i) => (
          <div key={i} style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: GRAPHITE, padding: '12px 16px', borderBottom: `1px solid ${HAIRLINE}`, background: CARD }}>{h}</div>
        ))}
        {table.rows.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} style={{
              fontFamily: sfPro, fontSize: 14.5, color: c === 0 ? FG : MUTED, fontWeight: c === 0 ? 500 : 400,
              padding: '13px 16px', lineHeight: 1.45,
              borderBottom: r < table.rows.length - 1 ? `1px solid ${HAIRLINE}` : 'none',
              borderLeft: c === 1 ? `1px solid ${HAIRLINE}` : 'none',
            }}>{cell}</div>
          ))
        )}
      </div>
    </div>
  )
}

// A text block (label + heading + body + optional table)
function TextBlock({ kicker, title, text, table }: { kicker?: string; title?: string; text?: string; table?: ProcessSection['table'] }) {
  return (
    <div>
      {kicker && <p style={label}><Dot />{kicker}</p>}
      {title && <h2 style={heading}>{title}</h2>}
      {text && <p style={body}>{parseBold(text)}</p>}
      {table && <StateTable table={table} />}
    </div>
  )
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const currentIdx = projects.findIndex(p => p.slug === params.slug)
  const nextProjects = [1, 2].map(o => projects[(currentIdx + o) % projects.length])
  const L = project.sectionLabels ?? {}

  const beatPad = 'clamp(56px, 9vh, 104px)'

  return (
    <>
      <Navbar />
      <main style={{ background: 'transparent', minHeight: '100vh' }}>

        {/* ── HERO — text + showcase, side by side ── */}
        <div className="cs-hero-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: '150px 40px 0' }}>
          <div className="cs-beat">
            <div>
              <Reveal><p style={{ ...label, color: MUTED_LIGHT }}>[{project.tags.join(' · ')}]</p></Reveal>
              <Reveal delay={0.05}>
                <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 300, fontSize: 'clamp(1.9rem, 3.2vw, 2.9rem)', color: FG, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 22px' }}>
                  {project.h1}
                </h1>
              </Reveal>
              <Reveal delay={0.1}><p style={{ ...body, maxWidth: 460 }}>{project.subtitleParagraph}</p></Reveal>
              <Reveal delay={0.15}>
                <a href="#final" data-cursor="explore" style={{ display: 'inline-block', marginTop: 26, fontFamily: FONT_MONO, fontSize: 13, color: FG, textDecoration: 'none', letterSpacing: '0.04em', borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: 3 }}>
                  Skip to the work <span style={{ color: ACCENT }}>↓</span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1}><Visual src={project.showcaseImages[0]} /></Reveal>
          </div>
        </div>

        {/* ── META strip ── */}
        <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
          <Reveal>
            <div className="cs-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, borderTop: `1px solid ${HAIRLINE}`, paddingTop: 28 }}>
              {[{ k: 'Year', v: project.year }, { k: 'Scope', v: project.scope }, { k: 'Role', v: project.role }].map(({ k, v }) => (
                <div key={k}>
                  <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: MUTED_LIGHT, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px' }}>{k}</p>
                  <p style={{ fontFamily: sfPro, fontSize: 14.5, color: FG, margin: 0, lineHeight: 1.55, whiteSpace: 'pre-line' }}>{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── FRAMING — problem | idea, side by side ── */}
        <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
          <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }}>
            <Reveal><TextBlock kicker={L.problemSpace ?? 'THE PROBLEM'} title={project.problemSpaceHeading} text={project.problemSpace} /></Reveal>
            <Reveal delay={0.08}><TextBlock kicker={L.concept ?? 'THE IDEA'} title={project.conceptHeading} text={project.concept} /></Reveal>
          </div>
        </div>

        {/* ── PROCESS BEATS — alternating visual + text ── */}
        {project.processSections.map((s, i) => {
          const hasVisual = !!(s.image || s.video)
          const visualFirst = i % 2 === 0
          const kicker = i === 0 ? (L.process ?? 'PROCESS') : undefined
          const textCol = (
            <Reveal delay={hasVisual ? 0.08 : 0}>
              <TextBlock kicker={kicker} title={s.title} text={s.body} table={s.table} />
            </Reveal>
          )
          if (!hasVisual) {
            return (
              <div key={i} className="cs-pad" style={{ maxWidth: 760, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
                {textCol}
              </div>
            )
          }
          const visualCol = <Reveal><Visual src={(s.video ?? s.image)!} caption={s.imageCaption} isVideo={!!s.video} /></Reveal>
          return (
            <div key={i} className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
              <div className="cs-beat">
                {visualFirst ? <>{visualCol}{textCol}</> : <>{textCol}{visualCol}</>}
              </div>
            </div>
          )
        })}

        {/* ── FINAL ── */}
        {project.finalImages.length > 0 && (
          <div id="final" className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
            <div className="cs-beat">
              <Reveal><Visual src={project.finalImages[0].src} caption={project.finalImages[0].caption} isVideo={project.finalImages[0].isVideo} /></Reveal>
              <Reveal delay={0.08}>
                <TextBlock kicker={L.finalDesign ?? 'THE WORK'} title={project.title} text={project.meetTheWork} />
              </Reveal>
            </div>
            {project.finalImages.slice(1).map((img, i) => (
              <div key={i} style={{ marginTop: 'clamp(24px, 4vh, 40px)' }}>
                <Reveal><Visual src={img.src} caption={img.caption} isVideo={img.isVideo} /></Reveal>
              </div>
            ))}
          </div>
        )}

        {/* ── REFLECTION ── */}
        {project.reflection.length > 0 && (
          <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
            <Reveal><p style={label}><Dot />{L.reflection ?? 'REFLECTION'}</p></Reveal>
            <Reveal delay={0.05}><h2 style={{ ...heading, maxWidth: 720, marginBottom: 36 }}>{project.reflectionHeading}</h2></Reveal>
            <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: project.reflection.length > 1 ? '1fr 1fr' : '1fr', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'start' }}>
              {project.reflection.map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 17, color: FG, letterSpacing: '-0.01em', margin: '0 0 10px' }}>{item.title}</h3>
                  <p style={{ ...body, maxWidth: 460 }}>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ── NEXT ── */}
        <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: `${beatPad} 40px 0` }}>
          <Reveal><p style={label}><Dot />NEXT</p></Reveal>
          <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 8 }}>
            {nextProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/works/${p.slug}`} data-cursor="explore" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${HAIRLINE}`, aspectRatio: '16/10', background: p.bg }}>
                    <img src={p.heroImage} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 17, fontWeight: 500, color: FG, letterSpacing: '-0.01em' }}>{p.title}</span>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT }}>{p.year}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="cs-pad cs-footer-flex" style={{ maxWidth: WIDE, margin: `${beatPad} auto 0`, padding: '32px 40px 96px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${HAIRLINE}` }}>
          <Link href="/#works" data-cursor="explore" style={{ fontFamily: FONT_MONO, fontSize: 13, color: MUTED, textDecoration: 'none', letterSpacing: '0.04em' }}>← all work</Link>
          <span style={{ fontFamily: sfPro, fontSize: 14, color: MUTED_LIGHT }}>Thanks for reading.</span>
        </div>

      </main>
    </>
  )
}
