'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import type { Block } from '@/lib/projects'
import { FG, MUTED, GRAPHITE, HAIRLINE, CARD, ORANGE, FONT_MONO, FONT_DISPLAY, FONT_SERIF } from '@/lib/theme'

type DiagramBlock = Extract<Block, { kind: 'diagram' }>

function Connector({ delay, reduce }: { delay: number; reduce: boolean | null }) {
  return (
    <svg className="cs-connector" width="46" height="24" viewBox="0 0 46 24" fill="none" aria-hidden>
      <motion.path
        d="M1 12 H36"
        stroke={GRAPHITE} strokeWidth="1.5"
        initial={reduce ? undefined : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay }}
      />
      <path d="M34 7 L42 12 L34 17" stroke={GRAPHITE} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

// eemonroy's trigger → branches flow (the "global cap" logic diagram).
export default function LogicDiagram({ block }: { block: DiagramBlock }) {
  const reduce = useReducedMotion()
  const n = block.branches.length
  return (
    <div className="cs-diagram" style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 210px) 46px 1fr', columnGap: 'clamp(10px, 2vw, 22px)', rowGap: 16, alignItems: 'center' }}>
      <div className="cs-diagram-trigger" style={{ gridColumn: 1, gridRow: `1 / span ${n}`, alignSelf: 'center' }}>
        <div style={{
          borderRadius: 18, padding: '22px 20px', textAlign: 'center',
          background: '#fff', border: `1px solid ${HAIRLINE}`, boxShadow: '0 18px 40px -26px rgba(0,0,0,.28)',
        }}>
          <p style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: ORANGE, margin: '0 0 8px' }}>TRIGGER</p>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: 15, fontWeight: 500, color: FG, margin: 0, lineHeight: 1.35 }}>{block.trigger}</p>
        </div>
      </div>

      {block.branches.map((b, i) => (
        <div key={b.tag} style={{ display: 'contents' }}>
          <div className="cs-connector-cell" style={{ gridColumn: 2, gridRow: i + 1, display: 'flex', justifyContent: 'center' }}>
            <Connector delay={0.15 + i * 0.12} reduce={reduce} />
          </div>
          <motion.div
            style={{ gridColumn: 3, gridRow: i + 1, borderRadius: 14, padding: '16px 20px', background: CARD, border: `1px solid ${HAIRLINE}`, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 14px' }}
            initial={reduce ? undefined : { opacity: 0, x: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: stellaEase, delay: 0.2 + i * 0.12 }}
          >
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: '0.1em', color: GRAPHITE }}>{b.tag}</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 500, color: FG }}>{b.title}</span>
            <span style={{ fontFamily: FONT_SERIF, fontSize: 15, fontStyle: 'italic', color: MUTED, marginLeft: 'auto' }}>{b.note}</span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
