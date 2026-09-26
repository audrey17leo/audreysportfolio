'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import type { Block } from '@/lib/projects'
import { FG, MUTED, GRAPHITE, HAIRLINE, PASTEL, FONT_DISPLAY } from '@/lib/theme'

type DataVizBlock = Extract<Block, { kind: 'dataviz' }>

const CORAL = PASTEL.coral.ink
const BLUE = PASTEL.blue.ink

function Bar({ value, max, color, delay, reduce }: { value: number; max: number; color: string; delay: number; reduce: boolean | null }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div style={{ position: 'relative', height: 11, borderRadius: 999, background: '#efece8', overflow: 'hidden' }}>
      <motion.div
        initial={reduce ? undefined : { width: 0 }}
        whileInView={reduce ? undefined : { width: `${pct}%` }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 0.9, ease: stellaEase, delay }}
        style={{ position: 'absolute', inset: 0, width: reduce ? `${pct}%` : undefined, borderRadius: 999, background: color }}
      />
    </div>
  )
}

// eemonroy's data panel — every row rated on two soft-pastel scales.
export default function DataBars({ block }: { block: DataVizBlock }) {
  const reduce = useReducedMotion()
  const [aLabel, bLabel] = block.legend ?? ['A', 'B']
  const lbl: React.CSSProperties = { fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: GRAPHITE }
  return (
    <div style={{ border: `1px solid ${HAIRLINE}`, borderRadius: 20, padding: 'clamp(24px, 3vw, 44px)', background: 'linear-gradient(150deg,#faf8f6,#f1eeea)' }}>
      <div style={{ display: 'flex', gap: 22, marginBottom: 28 }}>
        {[[aLabel, CORAL], [bLabel, BLUE]].map(([l, c]) => (
          <span key={l} style={{ ...lbl, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: c as string }} />{l}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 22 }}>
        {block.bars.map((b, i) => (
          <div key={b.row} style={{ display: 'grid', gridTemplateColumns: 'clamp(120px, 24%, 190px) 1fr', gap: 'clamp(14px, 3vw, 30px)', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: b.row.includes('flash') ? 600 : 400, color: b.row.includes('flash') ? FG : GRAPHITE }}>{b.row}</span>
            <div style={{ display: 'grid', gap: 7 }}>
              <Bar value={b.a} max={block.scaleMax} color={CORAL} delay={i * 0.06} reduce={reduce} />
              {b.b !== undefined && <Bar value={b.b} max={block.scaleMax} color={BLUE} delay={i * 0.06 + 0.05} reduce={reduce} />}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, ...lbl, color: MUTED }}>
        <span>Low</span><span>High</span>
      </div>
    </div>
  )
}
