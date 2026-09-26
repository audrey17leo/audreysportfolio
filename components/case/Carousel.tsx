'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'
import type { Block } from '@/lib/projects'
import { FG, MUTED, GRAPHITE, HAIRLINE, FONT_DISPLAY, FONT_MONO, FONT_SERIF } from '@/lib/theme'

type CarouselBlock = Extract<Block, { kind: 'carousel' }>

// eemonroy's full-bleed notification carousel (category + prev/next + dots).
export default function Carousel({ block }: { block: CarouselBlock }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const n = block.items.length
  const go = (d: number) => setI((p) => (p + d + n) % n)
  const perView = 3
  const visible = Array.from({ length: Math.min(perView, n) }, (_, k) => block.items[(i + k) % n])

  return (
    <div style={{ borderRadius: 20, padding: 'clamp(28px, 5vw, 64px)', background: 'linear-gradient(140deg,#f7f5f3,#eeeae6)', border: `1px solid ${HAIRLINE}` }}>
      <p style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.13em', textTransform: 'uppercase', color: GRAPHITE, margin: '0 0 22px' }}>{block.label}</p>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(perView, n)}, 1fr)`, gap: 'clamp(14px, 2vw, 24px)' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((it, k) => (
            <motion.div
              key={`${i}-${k}-${it.title}`}
              layout={!reduce}
              initial={reduce ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: stellaEase }}
              style={{ background: '#fff', borderRadius: 16, border: `1px solid ${HAIRLINE}`, padding: '22px 22px 26px', minHeight: 190, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxShadow: '0 20px 44px -30px rgba(0,0,0,.3)' }}
            >
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 600, color: FG, margin: '0 0 6px' }}>{it.title}</p>
              <p style={{ fontFamily: FONT_SERIF, fontSize: 14.5, lineHeight: 1.5, color: MUTED, margin: 0 }}>{it.sub}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 26 }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: GRAPHITE }}>{block.category}</span>
        <div style={{ display: 'flex', gap: 10 }}>
          {(['‹', '›'] as const).map((s, d) => (
            <button key={s} onClick={() => go(d === 0 ? -1 : 1)} data-cursor="explore" aria-label={d === 0 ? 'Previous' : 'Next'}
              style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${HAIRLINE}`, background: '#fff', color: FG, fontSize: 18, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 7, justifyContent: 'center', marginTop: 18 }}>
        {block.items.map((_, k) => (
          <span key={k} style={{ width: k === i ? 22 : 7, height: 7, borderRadius: 999, background: k === i ? FG : '#d8d4cf', transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  )
}
