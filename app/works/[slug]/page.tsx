import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import Reveal from '@/components/Reveal'
import { projects, getProject } from '@/lib/projects'
import { sfPro } from '@/lib/fonts'
import { FG, GREEN, MUTED, MUTED_LIGHT, HAIRLINE, ACCENT, CARD, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

type Props = { params: { slug: string } }

// Parse **bold** syntax into React nodes
function parseBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ fontWeight: 600, color: FG }}>{part}</strong>
      : part
  )
}

// Section label — mono, bracketed, accent dot
function Label({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: FONT_MONO,
      fontSize: '0.62rem',
      color: MUTED_LIGHT,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      margin: '0 0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
      {text}
    </p>
  )
}

const NARROW = 780
const WIDE = 1120

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const currentIdx = projects.findIndex(p => p.slug === params.slug)
  const nextProjects = [1, 2].map(offset => projects[(currentIdx + offset) % projects.length])

  const h2Style: React.CSSProperties = {
    fontFamily: FONT_DISPLAY,
    fontWeight: 600,
    fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
    color: FG,
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    margin: '0 0 28px',
  }
  const bodyStyle: React.CSSProperties = {
    fontFamily: sfPro,
    fontWeight: 400,
    fontSize: '1.05rem',
    color: MUTED,
    lineHeight: 1.8,
    margin: 0,
  }

  return (
    <>
      <Navbar />
      <main style={{ background: 'transparent', minHeight: '100vh' }}>

        {/* ── HERO ── */}
        <div className="cs-hero-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: '170px 48px 64px' }}>
          <Reveal>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', color: MUTED_LIGHT, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 28px' }}>
              [{project.tags.join(' · ')}]
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
              color: FG,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              margin: '0 0 28px',
              maxWidth: 15 + 'ch',
            }}>
              {project.h1}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ ...bodyStyle, maxWidth: 640, margin: '0 0 28px' }}>
              {project.subtitleParagraph}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a href="#final" data-cursor="explore" style={{
              fontFamily: FONT_MONO, fontSize: '0.66rem', color: FG, textDecoration: 'none',
              letterSpacing: '0.06em', borderBottom: `1px solid ${HAIRLINE}`, paddingBottom: 3,
            }}>
              Skip to Final Design <span style={{ color: ACCENT }}>↓</span>
            </a>
          </Reveal>
        </div>

        {/* ── SHOWCASE IMAGES ── */}
        <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: '0 48px 96px' }}>
          {project.showcaseImages.length === 1 ? (
            <Reveal style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${HAIRLINE}` }}>
              <img
                src={project.showcaseImages[0]}
                alt={project.title}
                style={{ width: '100%', display: 'block', maxHeight: 640, objectFit: project.showcaseImages[0].endsWith('.png') ? 'contain' : 'cover' }}
              />
            </Reveal>
          ) : (
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {project.showcaseImages.map((src, i) => (
                <Reveal key={i} delay={i * 0.08} style={{ flex: '1 1 320px', borderRadius: 18, overflow: 'hidden', border: `1px solid ${HAIRLINE}` }}>
                  <img src={src} alt="" style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: src.endsWith('.png') ? 'contain' : 'cover' }} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        {/* ── METADATA: SCOPE | ROLE | YEAR ── */}
        <div className="cs-pad" style={{ maxWidth: NARROW, margin: '0 auto', padding: '0 48px 110px' }}>
          <Reveal>
            <div className="cs-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, borderTop: `1px solid ${HAIRLINE}`, paddingTop: 36 }}>
              {[
                { label: 'YEAR', value: project.year },
                { label: 'SCOPE', value: project.scope },
                { label: 'ROLE', value: project.role },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', color: MUTED_LIGHT, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: sfPro, fontSize: '0.92rem', color: FG, fontWeight: 400, margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── PROBLEM SPACE ── */}
        <div className="cs-pad" style={{ maxWidth: NARROW, margin: '0 auto', padding: '0 48px 110px' }}>
          <Reveal><Label text={project.sectionLabels?.problemSpace ?? 'PROBLEM SPACE'} /></Reveal>
          <Reveal delay={0.06}><h2 style={h2Style}>{project.problemSpaceHeading}</h2></Reveal>
          <Reveal delay={0.1}><p style={bodyStyle}>{parseBold(project.problemSpace)}</p></Reveal>
        </div>

        {/* ── CONCEPT ── */}
        <div className="cs-pad" style={{ maxWidth: NARROW, margin: '0 auto', padding: '0 48px 110px' }}>
          <Reveal><Label text={project.sectionLabels?.concept ?? 'CONCEPT'} /></Reveal>
          <Reveal delay={0.06}><h2 style={h2Style}>{project.conceptHeading}</h2></Reveal>
          <Reveal delay={0.1}><p style={bodyStyle}>{project.concept}</p></Reveal>
        </div>

        {/* ── PROCESS ── */}
        <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: '0 48px 110px' }}>
          <div style={{ maxWidth: NARROW - 40, margin: '0 auto' }}>
            <Reveal><Label text={project.sectionLabels?.process ?? 'PROCESS'} /></Reveal>
          </div>
          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 88 }}>
            {project.processSections.map((section, i) => (
              <Reveal key={i} y={32}>
                <div style={{ maxWidth: NARROW - 40, margin: '0 auto' }}>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '1.15rem', color: FG, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                    {section.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: '1rem', margin: section.image || section.video ? '0 0 32px' : '0' }}>
                    {parseBold(section.body)}
                  </p>
                </div>
                {section.video && (
                  <figure style={{ margin: '0 auto', maxWidth: WIDE }}>
                    <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${HAIRLINE}` }}>
                      <AutoPlayVideo src={section.video} style={{ width: '100%', display: 'block' }} />
                    </div>
                    {section.imageCaption && <Caption text={section.imageCaption} />}
                  </figure>
                )}
                {section.image && !section.video && (
                  <figure style={{ margin: '0 auto', maxWidth: WIDE }}>
                    <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${HAIRLINE}` }}>
                      <img src={section.image} alt={section.imageCaption ?? section.title} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                    </div>
                    {section.imageCaption && <Caption text={section.imageCaption} />}
                  </figure>
                )}
                {section.image2 && (
                  <figure style={{ margin: '24px auto 0', maxWidth: WIDE }}>
                    <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${HAIRLINE}` }}>
                      <img src={section.image2} alt={section.imageCaption2 ?? section.title} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                    </div>
                    {section.imageCaption2 && <Caption text={section.imageCaption2} />}
                  </figure>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── FINAL DESIGN ── */}
        {project.finalImages.length > 0 && (
          <div id="final" className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: '0 48px 110px' }}>
            <div style={{ maxWidth: NARROW - 40, margin: '0 auto 48px' }}>
              <Reveal><Label text={project.sectionLabels?.finalDesign ?? 'FINAL DESIGN'} /></Reveal>
              <Reveal delay={0.06}>
                <h2 style={{ ...h2Style, fontSize: 'clamp(1.8rem, 3.4vw, 2.8rem)', margin: '0 0 20px' }}>{project.title}</h2>
              </Reveal>
              <Reveal delay={0.1}><p style={{ ...bodyStyle, maxWidth: 600 }}>{project.meetTheWork}</p></Reveal>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {project.finalImages.map((img, i) => (
                <Reveal key={i} y={36} as="figure" style={{ margin: 0 }}>
                  <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '16/9', border: `1px solid ${HAIRLINE}` }}>
                    {img.isVideo ? (
                      <AutoPlayVideo src={img.src} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                    ) : (
                      <img src={img.src} alt={img.caption} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                    )}
                  </div>
                  {img.caption && <Caption text={img.caption} />}
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ── REFLECTION ── */}
        {project.reflection.length > 0 && (
          <div className="cs-pad" style={{ maxWidth: NARROW, margin: '0 auto', padding: '0 48px 110px' }}>
            <Reveal><Label text={project.sectionLabels?.reflection ?? 'REFLECTION'} /></Reveal>
            <Reveal delay={0.06}><h2 style={{ ...h2Style, margin: '0 0 40px' }}>{project.reflectionHeading}</h2></Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {project.reflection.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '1.1rem', color: FG, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                    {item.title}
                  </h3>
                  <p style={{ ...bodyStyle, fontSize: '1rem' }}>{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ── SOURCE CODE ── */}
        {project.sourceCode && (
          <div className="cs-pad" style={{ maxWidth: NARROW, margin: '0 auto', padding: '0 48px 110px' }}>
            <Reveal><Label text="SOURCE CODE" /></Reveal>
            <Reveal delay={0.06}>
              <a href={project.sourceCode.url} target="_blank" rel="noopener noreferrer" data-cursor="explore" style={{
                fontFamily: FONT_DISPLAY, fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 600, color: FG,
                letterSpacing: '-0.02em', lineHeight: 1.3, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 3, display: 'inline-block',
              }}>
                {project.sourceCode.label} <span style={{ color: ACCENT }}>↗</span>
              </a>
            </Reveal>
          </div>
        )}

        {/* ── NEXT PROJECTS ── */}
        <div className="cs-pad" style={{ maxWidth: WIDE, margin: '0 auto', padding: '0 48px 40px' }}>
          <Reveal><Label text="INTERESTED IN MORE?" /></Reveal>
          <Reveal delay={0.06}>
            <h2 style={{ ...h2Style, margin: '0 0 40px' }}>See the next projects <span style={{ color: ACCENT }}>→</span></h2>
          </Reveal>
          <div className="cs-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
            {nextProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link href={`/works/${p.slug}`} data-cursor="explore" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ background: CARD, border: `1px solid ${HAIRLINE}`, borderRadius: 18, overflow: 'hidden' }}>
                    <div style={{ background: p.bg, aspectRatio: '4/3', overflow: 'hidden' }}>
                      <img src={p.heroImage} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ padding: '18px 20px 22px' }}>
                      <p style={{ fontFamily: FONT_MONO, fontSize: '0.58rem', color: MUTED_LIGHT, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                        {p.tags.slice(0, 2).join(' · ')}
                      </p>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: '1.05rem', fontWeight: 600, color: FG, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                        {p.title}
                      </p>
                      <p style={{ fontFamily: sfPro, fontSize: '0.82rem', color: MUTED, fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
                        {p.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="cs-pad cs-footer-flex" style={{
          maxWidth: WIDE, margin: '40px auto 0', padding: '40px 48px 100px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${HAIRLINE}`,
        }}>
          <Link href="/works" data-cursor="explore" style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', color: MUTED, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ← all works
          </Link>
          <span style={{ fontFamily: sfPro, fontSize: '0.9rem', color: MUTED }}>Thanks for stopping by :)</span>
        </div>

      </main>
    </>
  )
}

function Caption({ text }: { text: string }) {
  return (
    <figcaption style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', color: MUTED, letterSpacing: '0.03em', marginTop: 14, lineHeight: 1.5, textAlign: 'center' }}>
      {text}
    </figcaption>
  )
}
