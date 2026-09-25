'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BG, FG, ACCENT } from '@/lib/theme'

// Minimal loading animation: a percent counter runs up, then the panel
// wipes away to reveal the page.
export default function Loader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('nointro')) {
      setDone(true)
      return
    }
    let raf = 0
    const start = performance.now()
    const DURATION = 1500
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      // ease-out so it decelerates toward 100
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 260)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: BG,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: 'clamp(28px, 5vw, 64px)',
            cursor: 'none',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: FG,
            }}
          >
            Audrey Leo<span style={{ color: ACCENT }}>.</span>
          </motion.span>

          <span
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontSize: 'clamp(3.5rem, 14vw, 11rem)',
              fontWeight: 600,
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
              color: FG,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {count}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
