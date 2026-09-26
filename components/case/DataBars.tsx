'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import type { Block } from '@/lib/projects'
import { FG, MUTED, GRAPHITE, HAIRLINE, ORANGE, VIOLET, FONT_MONO, FONT_DISPLAY } from '@/lib/theme'

type DataVizBlock = Extract<Block, { kind: 'dataviz' }>

function Bar({ value, max, color, delay, reduce }: { value: number; max: number; color: string; delay: number; reduce: boolean | null }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div style={{ position: 'relative', height: 12, borderRadius: 999, background: '#efece8', overflow: 'hidden' }}>
      <motion.div
        initial={reduce ? undefined : { width: 0 }}
        whileInView={reduce ? undefined : { width: `${pct}%` }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.9, ease: stellaEase, delay }}
        style={{ position: 'absolute', inset: 0, width: reduce ? `${pct}%` : undefined, borderRadius: 999, background: color }}
      />
    </div>
  )
}

// eemonroy's "data shows the truth" bars — every row rated on two scales.
export default function DataBars({ block }: { block: DataVizBlock }) {
  const reduce = useReducedMotion()
  const [aLabel, bLabel] = block.legend ?? ['A', 'B']
  return (
    <div style={{ border: `1px solid ${HAIRLINE}`, borderRadius: 18, padding: 'clamp(22px, 3vw, 40px)', background: 'linear-gradient(140deg,#faf8f6,#f2efeb)' }}>
      <div style={{ display: 'flex', gap: 22, marginBottom: 26 }}>
        {[[aLabel, ORANGE], [bLabel, VIOLET]].map(([l, c]) => (
          <span key={l} style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: GRAPHITE, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: c as string }} />{l}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        {block.bars.map((b, i) => (
          <div key={b.row} style={{ display: 'grid', gridTemplateColumns: 'clamp(120px, 22%, 200px) 1fr', gap: 'clamp(14px, 3vw, 34px)', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 500, color: b.row.includes('flash') ? FG : GRAPHITE }}>{b.row}</span>
            <div style={{ display: 'grid', gap: 7 }}>
              <Bar value={b.a} max={block.scaleMax} color={ORANGE} delay={i * 0.06} reduce={reduce} />
              {b.b !== undefined && <Bar value={b.b} max={block.scaleMax} color={VIOLET} delay={i * 0.06 + 0.05} reduce={reduce} />}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: FONT_MONO, fontSize: 11, color: MUTED, letterSpacing: '0.06em' }}>
        <span>LOW</span><span>HIGH</span>
      </div>
    </div>
  )
}
