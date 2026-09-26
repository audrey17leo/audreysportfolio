import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import Reveal from '@/components/Reveal'
import EvolutionScroll from '@/components/EvolutionScroll'
import CaseTOC from '@/components/CaseTOC'
import { projects, getProject, type ProcessSection, type Project } from '@/lib/projects'
import { FG, GRAPHITE, MUTED, MUTED_LIGHT, HAIRLINE, ACCENT, FONT_DISPLAY, FONT_BODY, FONT_MONO } from '@/lib/theme'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

type Props = { params: { slug: string } }

const sectionGap = 'clamp(56px, 9vh, 104px)'

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const currentIdx = projects.findIndex(p => p.slug === params.slug)
  const nextProjects = [1, 2].map(o => projects[(currentIdx + o) % projects.length])

  if (project.blocks && project.blocks.length) {
    return <ShowcaseCaseStudy project={project} nextProjects={nextProjects} />
  }
  return <LegacyCaseStudy project={project} nextProjects={nextProjects} />
}

/* ══════════════════════════ UI-first showcase layout ══════════════════════════ */

function BigMedia({ media, priority }: { media: { src: string; caption?: string; isVideo?: boolean }; priority?: boolean }) {
  return (
    <Reveal>
      <figure style={{ margin: '0 0 clamp(36px, 5vh, 64px)' }}>
        <div className="cs-img" style={{ borderRadius: 18 }}>
          {media.isVideo || media.src.endsWith('.mp4')
            ? <AutoPlayVideo src={media.src} style={{ width: '100%', display: 'block' }} />
            : <img src={media.src} alt={media.caption ?? ''} loading={priority ? 'eager' : 'lazy'} />}
        </div>
        {media.caption && (
          <figcaption style={{ fontFamily: FONT_BODY, fontSize: 13.5, color: MUTED_LIGHT, lineHeight: 1.5, marginTop: 13, maxWidth: '60ch' }}>{media.caption}</figcaption>
        )}
      </figure>
    </Reveal>
  )
}

function ShowcaseCaseStudy({ project, nextProjects }: { project: Project; nextProjects: Project[] }) {
  const media = project.finalImages
  const hero = media[0]
  const screens = media.slice(1)
  const yearShort = project.year.split('·')[0].trim()
  const roleShort = project.role.split('.')[0]

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        {/* ── HEADER (minimal) ── */}
        <div className="cs-pad" style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(100px, 14vh, 156px) clamp(20px, 4vw, 40px) 0' }}>
          <Reveal>
            <Link href="/#works" data-cursor="explore" style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600, color: MUTED, textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' }}>← back to work</Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, fontWeight: 600, color: GRAPHITE, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '30px 0 16px' }}>{project.discipline} · {yearShort}</p>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 0.98, letterSpacing: '-0.04em', color: FG, margin: 0 }}>{project.title}</h1>
            <p style={{ fontFamily: FONT_BODY, fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', lineHeight: 1.5, color: MUTED, maxWidth: '56ch', margin: '22px 0 0' }}>{project.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 30px', alignItems: 'center', marginTop: 30 }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: 14.5, color: MUTED }}>
                <strong style={{ color: FG, fontWeight: 600 }}>Role</strong>&nbsp;&nbsp;{roleShort}
              </span>
              {project.liveUrl && (
                <a href={project.liveUrl.url} target="_blank" rel="noopener noreferrer" data-cursor="explore" style={{ fontFamily: FONT_DISPLAY, fontSize: 13.5, fontWeight: 500, color: FG, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 3 }}>
                  Live → {project.liveUrl.label} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>

        {/* ── HERO MEDIA (big) ── */}
        {hero && (
          <div className="cs-pad" style={{ maxWidth: 1320, margin: 'clamp(48px, 7vh, 84px) auto 0', padding: '0 clamp(20px, 4vw, 40px)' }}>
            <BigMedia media={hero} priority />
          </div>
        )}

        {/* ── MORE SCREENS (big) ── */}
        {screens.length > 0 && (
          <div className="cs-pad" style={{ maxWidth: 1320, margin: 'clamp(24px, 4vh, 48px) auto 0', padding: '0 clamp(20px, 4vw, 40px)' }}>
            {screens.map((s, i) => <BigMedia key={i} media={s} />)}
          </div>
        )}

        {/* ── THE BUILD (interactive) ── */}
        <div style={{ marginTop: 'clamp(76px, 11vh, 128px)' }}>
          <div className="cs-pad" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px) clamp(16px, 2.5vh, 28px)' }}>
            <Reveal>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, fontWeight: 600, color: GRAPHITE, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>The build, week by week</p>
            </Reveal>
          </div>
          <EvolutionScroll />
        </div>

        {/* ── NEXT ── */}
        <div className="cs-pad" style={{ maxWidth: 1180, margin: 'clamp(80px, 12vh, 140px) auto 0', padding: '0 clamp(20px, 4vw, 40px)' }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 12.5, fontWeight: 600, color: GRAPHITE, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 20px' }}>Next</p>
          <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {nextProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/works/${p.slug}`} data-cursor="explore" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="cs-img" style={{ aspectRatio: '16/10', background: p.bg, position: 'relative' }}>
                    <img src={p.heroImage} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: p.heroImage.endsWith('.png') ? 'contain' : 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 13, gap: 16 }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: 16, fontWeight: 500, color: FG }}>{p.title}</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600, color: GRAPHITE, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{p.discipline} · {p.year.split('·')[0].trim()}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="cs-pad cs-footer-flex" style={{ maxWidth: 1180, margin: `${sectionGap} auto 0`, padding: '30px clamp(20px, 4vw, 40px) 96px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${HAIRLINE}` }}>
          <Link href="/#works" data-cursor="explore" style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600, color: MUTED, textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase' }}>← all work</Link>
          <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: MUTED_LIGHT }}>Thanks for reading.</span>
        </div>
      </main>
    </>
  )
}

/* ══════════════════════════ legacy circle-status layout ══════════════════════════ */

function inline(text: string, base = 0): React.ReactNode {
  const nodes: React.ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0, m: RegExpExecArray | null, k = base
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) nodes.push(<strong key={k++} style={{ fontWeight: 600, color: FG }}>{m[1]}</strong>)
    else nodes.push(<em key={k++} style={{ fontStyle: 'italic' }}>{m[2]}</em>)
    last = re.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

function RichText({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} style={{ ...style, margin: i === 0 ? 0 : '0.85em 0 0' }}>
          {para.split('\n').map((line, j) => (
            <span key={j}>{j > 0 ? <br /> : null}{inline(line, j * 100)}</span>
          ))}
        </p>
      ))}
    </>
  )
}

const eyebrow: React.CSSProperties = {
  fontFamily: FONT_MONO, fontSize: 12, color: GRAPHITE, letterSpacing: '0.12em',
  textTransform: 'uppercase', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 9,
}
const h1Style: React.CSSProperties = {
  fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 'clamp(1.9rem, 2.8vw, 2.25rem)',
  color: FG, letterSpacing: '-0.03em', lineHeight: 1.12, margin: '0 0 20px',
}
const h2Style: React.CSSProperties = {
  fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: 'clamp(1.3rem, 1.9vw, 1.5rem)',
  color: FG, letterSpacing: '-0.025em', lineHeight: 1.28, margin: '0 0 16px',
}
const bodyStyle: React.CSSProperties = {
  fontFamily: FONT_BODY, fontWeight: 400, fontSize: 16, color: MUTED, lineHeight: 1.6, margin: 0,
}

function Dot() {
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
}

function FullImage({ src, caption, isVideo }: { src: string; caption?: string; isVideo?: boolean }) {
  return (
    <figure style={{ margin: '24px 0 0' }}>
      <div className="cs-img">
        {isVideo || src.endsWith('.mp4')
          ? <AutoPlayVideo src={src} style={{ width: '100%', display: 'block' }} />
          : <img src={src} alt={caption ?? ''} />}
      </div>
      {caption && (
        <figcaption style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT, marginTop: 11, lineHeight: 1.5 }}>{caption}</figcaption>
      )}
    </figure>
  )
}

function StateTable({ table }: { table: NonNullable<ProcessSection['table']> }) {
  return (
    <div style={{ marginTop: 22, border: `1px solid ${HAIRLINE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 2.3fr' }}>
        {table.head.map((h, i) => (
          <div key={i} style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: GRAPHITE, padding: '11px 15px', borderBottom: `1px solid ${HAIRLINE}`, background: '#fff' }}>{h}</div>
        ))}
        {table.rows.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} style={{
              fontFamily: FONT_BODY, fontSize: 14, color: c === 0 ? FG : MUTED, fontWeight: c === 0 ? 500 : 400,
              padding: '12px 15px', lineHeight: 1.45,
              borderBottom: r < table.rows.length - 1 ? `1px solid ${HAIRLINE}` : 'none',
              borderLeft: c === 1 ? `1px solid ${HAIRLINE}` : 'none',
            }}>{cell}</div>
          ))
        )}
      </div>
    </div>
  )
}

function LegacyCaseStudy({ project, nextProjects }: { project: Project; nextProjects: Project[] }) {
  const L = project.sectionLabels ?? {}
  const isFlash = project.slug === 'tldraw-flash'

  const tocSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'problem', label: 'The problem' },
    { id: 'idea', label: 'The idea' },
    { id: 'process', label: 'Process' },
    ...(isFlash ? [{ id: 'evolution', label: 'Evolution' }] : []),
    ...(project.finalImages.length ? [{ id: 'work', label: 'The work' }] : []),
    ...(project.reflection.length ? [{ id: 'reflection', label: 'Reflection' }] : []),
  ]

  return (
    <>
      <Navbar />
      <main style={{ background: 'transparent', minHeight: '100vh' }}>
        <div className="cs-hero-pad" style={{ maxWidth: 1240, margin: '0 auto', padding: '104px 40px 0' }}>
          <Reveal>
            <Link href="/#works" data-cursor="explore" style={{ fontFamily: FONT_MONO, fontSize: 12.5, color: MUTED, textDecoration: 'none', letterSpacing: '0.04em' }}>← back to work</Link>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="cs-img" style={{ marginTop: 18 }}>
              <img src={project.showcaseImages[0]} alt={project.title} />
            </div>
          </Reveal>
        </div>

        <div className="cs-pad" style={{ padding: `clamp(52px, 8vh, 96px) 40px 0` }}>
          <div className="cs-body">
            <CaseTOC sections={tocSections} />

            <div>
              <section id="overview">
                <Reveal><p style={{ ...eyebrow, color: MUTED_LIGHT }}>[{project.tags.join(' · ')}]</p></Reveal>
                <Reveal delay={0.04}><h1 style={h1Style}>{project.h1}</h1></Reveal>
                <Reveal delay={0.08}><RichText text={project.subtitleParagraph} style={{ ...bodyStyle, maxWidth: '62ch' }} /></Reveal>
                <Reveal delay={0.11}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 40px', marginTop: 28, borderTop: `1px solid ${HAIRLINE}`, paddingTop: 24 }}>
                    {[{ k: 'Year', v: project.year }, { k: 'Scope', v: project.scope }, { k: 'Role', v: project.role }].map(({ k, v }) => (
                      <div key={k} style={{ minWidth: 130 }}>
                        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: MUTED_LIGHT, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 7px' }}>{k}</p>
                        <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: FG, margin: 0, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                {project.liveUrl && (
                  <Reveal delay={0.14}>
                    <a href={project.liveUrl.url} target="_blank" rel="noopener noreferrer" data-cursor="explore" style={{ display: 'inline-block', marginTop: 22, fontFamily: FONT_MONO, fontSize: 13, color: FG, textDecoration: 'none', letterSpacing: '0.04em', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 3 }}>
                      Live → {project.liveUrl.label} <span style={{ color: ACCENT }}>↗</span>
                    </a>
                  </Reveal>
                )}
              </section>

              <section id="problem" style={{ marginTop: sectionGap }}>
                <Reveal><p style={eyebrow}><Dot />{L.problemSpace ?? 'THE PROBLEM'}</p></Reveal>
                <Reveal delay={0.04}><h2 style={h2Style}>{project.problemSpaceHeading}</h2></Reveal>
                <Reveal delay={0.08}><RichText text={project.problemSpace} style={bodyStyle} /></Reveal>
              </section>

              <section id="idea" style={{ marginTop: sectionGap }}>
                <Reveal><p style={eyebrow}><Dot />{L.concept ?? 'THE IDEA'}</p></Reveal>
                <Reveal delay={0.04}><h2 style={h2Style}>{project.conceptHeading}</h2></Reveal>
                <Reveal delay={0.08}><RichText text={project.concept} style={bodyStyle} /></Reveal>
              </section>

              {project.processSections.map((s, i) => (
                <section key={i} id={i === 0 ? 'process' : undefined} style={{ marginTop: sectionGap }}>
                  {i === 0 && <Reveal><p style={eyebrow}><Dot />{L.process ?? 'PROCESS'}</p></Reveal>}
                  <Reveal delay={0.04}>
                    <h2 style={h2Style}>
                      <span style={{ color: MUTED_LIGHT, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')} · </span>
                      {s.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.08}><RichText text={s.body} style={bodyStyle} /></Reveal>
                  {s.table && <Reveal delay={0.1}><StateTable table={s.table} /></Reveal>}
                  {(s.video || s.image) && <Reveal delay={0.1}><FullImage src={(s.video ?? s.image)!} caption={s.imageCaption} isVideo={!!s.video} /></Reveal>}
                  {s.image2 && <Reveal delay={0.1}><FullImage src={s.image2} caption={s.imageCaption2} /></Reveal>}
                </section>
              ))}

              {isFlash && (
                <section id="evolution" style={{ marginTop: sectionGap }}>
                  <EvolutionScroll />
                </section>
              )}

              {project.finalImages.length > 0 && (
                <section id="work" style={{ marginTop: sectionGap }}>
                  <Reveal><p style={eyebrow}><Dot />{L.finalDesign ?? 'THE WORK'}</p></Reveal>
                  <Reveal delay={0.04}><h2 style={h2Style}>{project.title}</h2></Reveal>
                  <Reveal delay={0.08}><RichText text={project.meetTheWork} style={bodyStyle} /></Reveal>
                  {project.finalImages.map((img, i) => (
                    <Reveal key={i} delay={0.1}><FullImage src={img.src} caption={img.caption} isVideo={img.isVideo} /></Reveal>
                  ))}
                </section>
              )}

              {project.reflection.length > 0 && (
                <section id="reflection" style={{ marginTop: sectionGap }}>
                  <Reveal><p style={eyebrow}><Dot />{L.reflection ?? 'REFLECTION'}</p></Reveal>
                  <Reveal delay={0.04}><h2 style={{ ...h2Style, marginBottom: 28 }}>{project.reflectionHeading}</h2></Reveal>
                  <div style={{ display: 'grid', gap: 'clamp(24px, 3.5vh, 40px)' }}>
                    {project.reflection.map((item, i) => (
                      <Reveal key={i} delay={i * 0.05}>
                        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: '1.25rem', color: FG, letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.3 }}>{item.title}</h3>
                        <RichText text={item.body} style={bodyStyle} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        <div className="cs-pad" style={{ maxWidth: 1120, margin: '0 auto', padding: `${sectionGap} 40px 0` }}>
          <Reveal><p style={eyebrow}><Dot />NEXT</p></Reveal>
          <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 6 }}>
            {nextProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/works/${p.slug}`} data-cursor="explore" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="cs-img" style={{ aspectRatio: '16/10', background: p.bg, position: 'relative' }}>
                    <img src={p.heroImage} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: p.heroImage.endsWith('.png') ? 'contain' : 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 13 }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 500, color: FG, letterSpacing: '-0.01em' }}>{p.title}</span>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT }}>{p.year}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="cs-pad cs-footer-flex" style={{ maxWidth: 1120, margin: `${sectionGap} auto 0`, padding: '30px 40px 96px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${HAIRLINE}` }}>
          <Link href="/#works" data-cursor="explore" style={{ fontFamily: FONT_MONO, fontSize: 13, color: MUTED, textDecoration: 'none', letterSpacing: '0.04em' }}>← all work</Link>
          <span style={{ fontFamily: FONT_BODY, fontSize: 14, color: MUTED_LIGHT }}>Thanks for reading.</span>
        </div>
      </main>
    </>
  )
}
