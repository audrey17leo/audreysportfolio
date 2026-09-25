'use client'
import { useRef } from 'react'

// Magnetic hover (Aditya Muralidhar micro-interaction): element eases toward
// the cursor while hovered, springs back on leave. Returns a ref + handlers.
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave },
    style: { transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' } as React.CSSProperties,
  }
}
