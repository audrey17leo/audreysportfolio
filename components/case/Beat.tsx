import type { Block } from '@/lib/projects'
import Reveal from '@/components/Reveal'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import ScrollRevealText from './ScrollRevealText'
import { FG, MUTED, MUTED_LIGHT, GRAPHITE, HAIRLINE, PASTEL, FONT_DISPLAY, FONT_SERIF } from '@/lib/theme'

type BeatBlock = Extract<Block, { kind: 'beat' }>

// Shared type scale (matches productdesc): tiny caps eyebrow -> serif subhead -> Inter body.
export const csEyebrow: React.CSSProperties = {
  fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 600, color: GRAPHITE,
  letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px',
  display: 'flex', alignItems: 'center', gap: 9,
}
export const csSubhead: React.CSSProperties = {
  fontFamily: FONT_SERIF, fontWeight: 500, fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
  color: FG, letterSpacing: '-0.005em', lineHeight: 1.28, margin: '0 0 20px',
}
export const csCaption: React.CSSProperties = {
  fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 500, color: MUTED_LIGHT,
  letterSpacing: '0.02em', lineHeight: 1.5, marginTop: 18,
}

export function Eyebrow({ label, accent }: { label: string; accent: string }) {
  return (
    <p style={csEyebrow}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, display: 'inline-block' }} />{label}
    </p>
  )
}

function Table({ table, tint, accent }: { table: NonNullable<BeatBlock['table']>; tint: string; accent: string }) {
  return (
    <div style={{ marginTop: 24, border: `1px solid ${HAIRLINE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 2.5fr' }}>
        {table.head.map((h, i) => (
          <div key={i} style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GRAPHITE, padding: '11px 15px', borderBottom: `1px solid ${HAIRLINE}`, background: tint }}>{h}</div>
        ))}
        {table.rows.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} style={{
              fontFamily: FONT_DISPLAY, fontSize: 14, color: c === 0 ? accent : MUTED, fontWeight: c === 0 ? 600 : 400,
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

// Consistent visual-LEFT / text-RIGHT beat (eemonroy's rhythm). Panel carries the
// weight in a soft mascot pastel; text is short and top-aligned.
export default function Beat({ block, id }: { block: BeatBlock; id?: string }) {
  const pastel = PASTEL[block.tint ?? 'blue']

  const visual = (
    <Reveal className="cs-beat-visual" style={{ display: 'flex' }}>
      <div style={{ width: '100%', borderRadius: 20, padding: 'clamp(20px, 3vw, 46px)', background: `linear-gradient(150deg, ${pastel.bg}, #f6f4f2)` }}>
        <div className="cs-img" style={{ borderRadius: 12, boxShadow: '0 26px 55px -30px rgba(30,30,50,.32)' }}>
          {block.media.isVideo || block.media.src.endsWith('.mp4')
            ? <AutoPlayVideo src={block.media.src} style={{ width: '100%', display: 'block' }} />
            : <img src={block.media.src} alt={block.caption ?? block.heading} />}
        </div>
      </div>
    </Reveal>
  )

  const text = (
    <div className="cs-beat-text">
      <Reveal><Eyebrow label={block.label} accent={pastel.ink} /></Reveal>
      <Reveal delay={0.05}><h2 style={csSubhead}>{block.heading}</h2></Reveal>
      <ScrollRevealText text={block.body} maxWidth="54ch" />
      {block.table && <Reveal delay={0.05}><Table table={block.table} tint={pastel.bg} accent={pastel.ink} /></Reveal>}
      {block.caption && <p style={csCaption}>{block.caption}</p>}
    </div>
  )

  return (
    <section id={id} className="cs-beat-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'clamp(32px, 5vw, 76px)', alignItems: 'start' }}>
      {visual}{text}
    </section>
  )
}
