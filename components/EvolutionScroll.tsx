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
    analysis: 'The fastest way to make an animation tool is to slide a timeline under a canvas, so that is exactly what day one is, tldraw untouched on top, a film-editing strip bolted beneath. It works. It also quietly lies about what the thing is: two sets of chrome, two vocabularies, a camera that reads as a red rectangle you drew rather than a frame you are shooting through. The tell is small but total: nothing on screen agrees with anything else. The real problem was never a missing feature. It was that the app did not yet believe it was one app.' },
  { date: 'Aug 6', phase: 'Bolted on', title: 'The camera joins the canvas', img: '/projects/evolution/flash-aug06.jpg',
    analysis: 'The first fix is not a feature, it is a decision about whose language to speak. The red rectangle becomes tldraw’s own dashed selection frame: “this is selected,” said the way tldraw already says it. A tiny move, but it sets the rule for everything after. When the host already has a word for something, do not invent a second one. Borrow the furniture. Almost every simplification that follows is really just this principle, applied again.' },
  { date: 'Aug 11', phase: 'Borrowed furniture', title: 'Export moves to where tldraw keeps sharing', img: '/projects/evolution/flash-aug11.jpg',
    analysis: 'If you are going to live inside another app, muscle memory is a feature. So Export stops being a bespoke button and takes the exact geometry of Share, sitting where a tldraw user already reaches to send something out; the settings get rebuilt on tldraw’s own menus. The app stops reading as two products stacked and starts reading as one. The timeline still hogs a full-height column, a compromise I could see, but had not yet earned the right to delete.' },
  { date: 'Aug 15', phase: 'Borrowed furniture', title: 'Record says what it is', img: '/projects/evolution/flash-aug15.jpg',
    analysis: 'A red dot feels confident until you watch someone hunt for it. So the one control everybody came for stopped being a glyph and became a word: Record. It is the least clever change in the whole log and one of the most useful. Clarity beats minimalism at exactly the moment a user is unsure. Audio, in the same breath, stopped being a special case and laid out like any other lane. Fewer exceptions is fewer things to explain.' },
  { date: 'Aug 19', phase: 'Borrowed furniture', title: 'The clip’s name comes to the canvas', img: '/projects/evolution/flash-aug19.jpg',
    analysis: 'The stage and the timeline kept disagreeing, and every disagreement cost a glance downward. So the clip’s name climbed onto the object itself, a small chip that lets the thing you are touching tell you which take it belongs to, right where your attention already is. It is a rule I kept returning to: put the label on the object, not in a panel beside it. Information wants to live where the work happens.' },
  { date: 'Aug 22', phase: 'Borrowed furniture', title: 'The lane column is deleted', img: '/projects/evolution/flash-aug22.jpg',
    analysis: 'For weeks a left-hand column held the menus, and for weeks I treated it as load-bearing. It was not. Once track and camera menus could open from the lane itself, the column had nothing left to do, so it went, and the panel collapsed to ruler-plus-bars. This was the first cut that felt like subtraction as design rather than tidying: naming and locking moved onto the thing being named, and a whole region of chrome simply stopped being necessary.' },
  { date: 'Aug 26', phase: 'Borrowed furniture', title: 'It becomes a site, not a page', img: '/projects/evolution/flash-aug26.jpg',
    analysis: 'An editor is only half a product; the other half is everywhere the work goes afterward. So the design pushed outward: Share & Export, rooms under /f/, home and watch pages inheriting the gallery’s chrome, until the thing felt like a place, not a page. The quiet win is what did not move. The editor shell held still while everything around it changed, and a stable center is what lets the edges grow.' },
  { date: 'Sep 4', phase: 'One toolbar', title: 'REC joins the toolbar, Take becomes Clip', img: '/projects/evolution/flash-sep04.jpg',
    analysis: 'This is the jump the whole log had been walking toward. Record leaves its own strip and becomes a red lens inside tldraw’s main toolbar, one toolbar, not two, and the transport row finally disappears. Then a rename that mattered more than it looks: Take 1 becomes Clip A. I had been speaking film (takes, transport, tape) to people who don’t. Naming a thing the user’s word for it is the moment the tool stops being a port of something else and starts being its own.' },
  { date: 'Sep 7', phase: 'One toolbar', title: 'The shell settles', img: '/projects/evolution/flash-sep07.jpg',
    analysis: 'Once the outside stops moving, you can afford to make the inside complicated. With the shell holding, the work went underneath it: clip edges that re-reach after every edit, overlapping clips on different tracks that merge on contact. None of it shows in a screenshot, which is the point: a settled surface is permission for a richer model. Stability is not the opposite of ambition. It is the precondition for it.' },
  { date: 'Sep 17', phase: 'The spike', title: 'The timeline becomes the object', img: '/projects/evolution/flash-sep17.jpg',
    analysis: 'The last question turned out to be the first one, finally asked properly: what if you never think about the timeline at all? Clips become thin coloured pills you handle directly; point at one and it opens a preview, growing its lane to make room instead of covering the neighbour. Secondary animation folds under the clip it rides as sub-clips, and, the part I am proudest of, nothing asks which properties to animate. The sub-clip reads them straight from the performance. The timeline stopped being a place you manage and became an object you hold. That is the direction that became the product.' },
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
        From bolted-on to built-in, ten builds, one gesture, photographed doing the same thing.
      </h2>
      <p style={{ fontFamily: sfPro, fontSize: 16, color: MUTED, lineHeight: 1.6, margin: '0 0 10px', maxWidth: 640 }}>
        Every build opened and driven identically, draw a stroke, record a take, drag it across the stage, so what moves between them is the design decision, not the demo. Scroll to watch it happen.
      </p>
      <a href="https://tldrawflash.com" target="_blank" rel="noopener noreferrer" data-cursor="explore"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FONT_MONO, fontSize: 13, color: FG, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 3, marginBottom: 8 }}>
        Where it landed → tldrawflash.com <span style={{ color: ACCENT }}>↗</span>
      </a>

      {/* scrolly */}
      <div className="evo-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 'clamp(28px, 4vw, 64px)', marginTop: 'clamp(36px, 6vh, 72px)' }}>
        {/* sticky visual (desktop) */}
        {!isMobile && (
          <div style={{ position: 'sticky', top: 88, alignSelf: 'start', height: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
