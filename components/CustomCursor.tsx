'use client'
import { useEffect, useRef, useState } from 'react'
import { mono } from '@/lib/fonts'

const DOT_COLOR  = '#1C1C1A'
const PILL_COLOR = '#1C1C1A'

type CursorMode = 'none' | 'explore' | 'see-project'

export default function CustomCursor() {
  const cursorRef   = useRef<HTMLDivElement>(null)
  const [mode, setMode]       = useState<CursorMode>('none')
  const [visible,   setVisible]   = useState(false)

  const modeRef      = useRef<CursorMode>('none')
  const visibleRef   = useRef(false)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    let rafId: number | null = null
    let px = -200, py = -200

    const onMove = (e: MouseEvent) => {
      px = e.clientX
      py = e.clientY
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`
        if (!visibleRef.current) {
          visibleRef.current = true
          setVisible(true)
        }
      })
    }

    let overRaf: number | null = null
    let pendingTarget: Element | null = null

    const onOver = (e: MouseEvent) => {
      pendingTarget = e.target as Element
      if (overRaf !== null) return
      overRaf = requestAnimationFrame(() => {
        overRaf = null
        const el = pendingTarget?.closest('[data-cursor]') as HTMLElement | null
        const val = el?.getAttribute('data-cursor')
        const m: CursorMode = val === 'see-project' ? 'see-project' : val === 'explore' ? 'explore' : 'none'
        if (m === modeRef.current) return
        modeRef.current = m
        setMode(m)
      })
    }

    const onLeave = () => { visibleRef.current = false; setVisible(false) }
    const onEnter = () => { visibleRef.current = true;  setVisible(true) }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      if (rafId)  cancelAnimationFrame(rafId)
      if (overRaf) cancelAnimationFrame(overRaf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  const isExplore = mode === 'explore'
  const isSee = mode === 'see-project'

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999999,
        willChange: 'transform',
        width: isSee ? 116 : isExplore ? 72 : 10,
        height: isSee ? 38 : isExplore ? 26 : 10,
        borderRadius: isSee ? 12 : 100,
        background: isSee ? '#ffffff' : isExplore ? PILL_COLOR : DOT_COLOR,
        boxShadow: isSee ? '0 6px 22px rgba(20,20,30,0.16)' : 'none',
        opacity: visible ? 1 : 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.15s ease, width 0.2s cubic-bezier(0.22,1,0.36,1), height 0.2s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {isExplore && (
        <span style={{ fontFamily: mono, fontSize: '0.55rem', letterSpacing: '0.09em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap', userSelect: 'none' }}>
          Explore
        </span>
      )}
      {isSee && (
        <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: '0.86rem', fontWeight: 500, color: '#1c1c1a', whiteSpace: 'nowrap', userSelect: 'none' }}>
          see project
        </span>
      )}
    </div>
  )
}
