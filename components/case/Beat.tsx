import type { Block } from '@/lib/projects'
import Reveal from '@/components/Reveal'
import AutoPlayVideo from '@/components/AutoPlayVideo'
import ScrollRevealText from './ScrollRevealText'
import { FG, MUTED, MUTED_LIGHT, GRAPHITE, HAIRLINE, ACCENT, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

type BeatBlock = Extract<Block, { kind: 'beat' }>

function Table({ table }: { table: NonNullable<BeatBlock['table']> }) {
  return (
    <div style={{ marginTop: 24, border: `1px solid ${HAIRLINE}`, borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 2.4fr' }}>
        {table.head.map((h, i) => (
          <div key={i} style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: GRAPHITE, padding: '11px 15px', borderBottom: `1px solid ${HAIRLINE}`, background: '#fff' }}>{h}</div>
        ))}
        {table.rows.map((row, r) =>
          row.map((cell, c) => (
            <div key={`${r}-${c}`} style={{
              fontFamily: FONT_DISPLAY, fontSize: 14, color: c === 0 ? FG : MUTED, fontWeight: c === 0 ? 600 : 400,
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

// Alternating visual / text beat (eemonroy's THE PROBLEM etc.).
export default function Beat({ block, id }: { block: BeatBlock; id?: string }) {
  const visualLeft = block.side === 'visual-left'

  const visual = (
    <Reveal className="cs-beat-visual" style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', borderRadius: 20, padding: 'clamp(18px, 2.6vw, 38px)', background: 'linear-gradient(140deg, #f7f5f3, #efece8)', border: `1px solid ${HAIRLINE}` }}>
        <div className="cs-img" style={{ borderRadius: 12, boxShadow: '0 26px 55px -30px rgba(0,0,0,.34)' }}>
          {block.media.isVideo || block.media.src.endsWith('.mp4')
            ? <AutoPlayVideo src={block.media.src} style={{ width: '100%', display: 'block' }} />
            : <img src={block.media.src} alt={block.caption ?? block.heading} />}
        </div>
      </div>
    </Reveal>
  )

  const text = (
    <div className="cs-beat-text" style={{ alignSelf: 'center' }}>
      <Reveal>
        <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: GRAPHITE, letterSpacing: '0.13em', textTransform: 'uppercase', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />{block.label}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 'clamp(1.4rem, 2.3vw, 1.95rem)', letterSpacing: '-0.03em', lineHeight: 1.14, color: FG, margin: '0 0 22px' }}>{block.heading}</h2>
      </Reveal>
      <ScrollRevealText text={block.body} />
      {block.table && <Reveal delay={0.05}><Table table={block.table} /></Reveal>}
      {block.caption && (
        <p style={{ fontFamily: FONT_MONO, fontSize: 12, color: MUTED_LIGHT, lineHeight: 1.5, marginTop: 18 }}>{block.caption}</p>
      )}
    </div>
  )

  return (
    <section id={id} className="cs-beat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'stretch' }}>
      {visualLeft ? <>{visual}{text}</> : <>{text}{visual}</>}
    </section>
  )
}
