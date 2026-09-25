'use client'
import { useEffect, useRef, useState } from 'react'
import { FG, GRAPHITE, MUTED, MUTED_LIGHT, HAIRLINE, ACCENT, CARD, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'
import { sfPro } from '@/lib/fonts'

type Step = {
  date: string
  phase: string
  title: string
  analysis: string
  img: string
}

// Curated from Audrey's own build log ("Six Weeks of Flash"): each build shot
// doing the same thing, so what changed is the design decision.
const STEPS: Step[] = [
  { date: 'Aug 3', phase: 'Bolted on', title: 'A video editor under a canvas', img: '/projects/evolution/flash-aug03.jpg',
    analysis: 'Day one is honest about the problem: tldraw untouched on top, a dark film-editing strip bolted underneath. Two sets of chrome, two vocabularies, and a camera that reads as a red rectangle drawn on the page rather than a frame around the scene. It works — and it looks like two products stacked.' },
  { date: 'Aug 6', phase: 'Bolted on', title: 'The camera joins the canvas', img: '/projects/evolution/flash-aug06.jpg',
    analysis: 'The red rectangle becomes tldraw’s own dashed selection frame — the first decision to borrow the host’s language instead of inventing a new one. The transport lifts off the strip into a floating row. Small move, big principle: stop building furniture tldraw already owns.' },
  { date: 'Aug 11', phase: 'Borrowed furniture', title: 'Export moves to where tldraw keeps sharing', img: '/projects/evolution/flash-aug11.jpg',
    analysis: 'Export takes the exact geometry of tldraw’s Share button and sits in the share zone; settings get rebuilt on tldraw’s menu primitives. The app stops looking like two products — but the timeline still owns a full-height column on the left.' },
  { date: 'Aug 15', phase: 'Borrowed furniture', title: 'Record says what it is', img: '/projects/evolution/flash-aug15.jpg',
    analysis: 'The bare red dot becomes a pill that reads Record. A label over a glyph, placed on the one control everybody hunts for. Audio stops being a special case and lays out like any other lane.' },
  { date: 'Aug 19', phase: 'Borrowed furniture', title: 'The clip’s name comes to the canvas', img: '/projects/evolution/flash-aug19.jpg',
    analysis: 'A small chip under the object names the clip it belongs to, so the stage and the timeline agree without a glance down. The link between a thing and its take becomes visible exactly where the work happens.' },
  { date: 'Aug 22', phase: 'Borrowed furniture', title: 'The lane column is deleted', img: '/projects/evolution/flash-aug22.jpg',
    analysis: 'Menus open from the lane itself, so the column that held them is gone. The panel collapses to ruler-plus-bars — the first real simplification. Naming and locking move onto the thing being named, not a control strip beside it.' },
  { date: 'Aug 26', phase: 'Borrowed furniture', title: 'It becomes a site, not a page', img: '/projects/evolution/flash-aug26.jpg',
    analysis: 'Share & Export replaces Export; rooms move under /f/; the home and watch pages take the gallery’s chrome. The design work spreads outward to everything around the editor — while the editor shell itself finally holds still.' },
  { date: 'Sep 4', phase: 'One toolbar', title: 'REC joins the toolbar — Take becomes Clip', img: '/projects/evolution/flash-sep04.jpg',
    analysis: 'The biggest jump in the log. Record is rebuilt as a red lens and moves into tldraw’s main toolbar — one toolbar instead of two, the transport row gone. A new recording is Clip A, not Take 1: the film vocabulary gives way to the user’s word for it. Recording state shows on the stage, not just the panel.' },
  { date: 'Sep 7', phase: 'One toolbar', title: 'The shell settles', img: '/projects/evolution/flash-sep07.jpg',
    analysis: 'With the shell holding still, the work moves underneath it: clip edges re-reach after every action, overlapping clips on different tracks merge. A settled shell is exactly what lets the model beneath get complicated.' },
  { date: 'Sep 17', phase: 'The spike', title: 'The timeline becomes the object', img: '/projects/evolution/flash-sep17.jpg',
    analysis: 'The direction that becomes the product: clips are thin coloured pills you handle directly; pointing at one opens a preview and grows its lane to make room. Secondary animation folds under the clip it rides as sub-clips — and nothing asks which properties to animate, because the sub-clip reads them straight from the performance.' },
]

const PHASES = [
  { name: 'Bolted on', range: 'Aug 3–6' },
  { name: 'Borrowed furniture', range: 'Aug 11–26' },
  { name: 'One toolbar', range: 'Aug 31–Sep 7' },
  { name: 'The spike', range: 'Sep 16–17' },
]

export default function EvolutionScroll() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i)
            if (!Number.isNaN(i)) setActive(i)
          }
        })
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
    )
    stepRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const current = STEPS[active]

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }} className="cs-pad">
      {/* header */}
      <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: GRAPHITE, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
        The 8-week evolution
      </p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 300, fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)', color: FG, letterSpacing: '-0.02em', lineHeight: 1.17, margin: '0 0 18px', maxWidth: 720 }}>
        From bolted-on to built-in — ten builds, one gesture, photographed doing the same thing.
      </h2>
      <p style={{ fontFamily: sfPro, fontSize: 16, color: MUTED, lineHeight: 1.6, margin: '0 0 10px', maxWidth: 640 }}>
        Every build opened and driven identically — draw a stroke, record a take, drag it across the stage — so what moves between them is the design decision, not the demo. Scroll to watch it happen.
      </p>
      <a href="https://tldrawflash.com" target="_blank" rel="noopener noreferrer" data-cursor="explore"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONT_MONO, fontSize: 13, color: FG, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 3, marginBottom: 8 }}>
        Where it landed → tldrawflash.com <span style={{ color: ACCENT }}>↗</span>
      </a>

      {/* scrolly */}
      <div className="evo-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(28px, 4vw, 64px)', marginTop: 'clamp(36px, 6vh, 72px)' }}>
        {/* sticky visual (desktop) */}
        {!isMobile && (
          <div style={{ position: 'sticky', top: 90, alignSelf: 'start', height: 'max-content' }}>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${HAIRLINE}`, background: CARD, aspectRatio: '1440 / 860', position: 'relative' }}>
              {STEPS.map((s, i) => (
                <img key={s.img} src={s.img} alt={s.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === active ? 1 : 0, transition: 'opacity 0.5s ease' }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, gap: 12 }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT, letterSpacing: '0.06em' }}>{current.date} · {current.phase}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT }}>{String(active + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span>
            </div>
            {/* phase progress */}
            <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
              {STEPS.map((_, i) => (
                <span key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= active ? ACCENT : HAIRLINE, transition: 'background 0.3s' }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 12 }}>
              {PHASES.map((p) => {
                const on = p.name === current.phase
                return (
                  <span key={p.name} style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.04em', color: on ? FG : MUTED_LIGHT, textTransform: 'uppercase' }}>
                    {p.name}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* scrolling analysis */}
        <div style={{ display: 'grid', gap: isMobile ? 40 : 0 }}>
          {STEPS.map((s, i) => (
            <div
              key={s.img}
              data-i={i}
              ref={(el) => { stepRefs.current[i] = el }}
              style={{
                minHeight: isMobile ? 'auto' : '78vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                opacity: isMobile ? 1 : (i === active ? 1 : 0.32),
                transition: 'opacity 0.4s ease',
              }}
            >
              <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT }}>{s.phase}</span>
              <div style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT, margin: '6px 0 14px' }}>{s.date}</div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: FG, letterSpacing: '-0.02em', lineHeight: 1.18, margin: '0 0 16px' }}>
                {s.title}
              </h3>
              {isMobile && (
                <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${HAIRLINE}`, background: CARD, margin: '0 0 16px' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
              <p style={{ fontFamily: sfPro, fontSize: 16.5, color: MUTED, lineHeight: 1.6, margin: 0, maxWidth: '46ch' }}>
                {s.analysis}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
