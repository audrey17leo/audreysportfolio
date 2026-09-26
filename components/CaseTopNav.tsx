'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FG, MUTED_LIGHT, HAIRLINE, BG, FONT_DISPLAY } from '@/lib/theme'

// Sticky top section tracker (eemonroy style): section names across the top,
// the one you're reading is highlighted. Click to jump.
export default function CaseTopNav({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [sections])

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 40, background: `${BG}e6`, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: `1px solid ${HAIRLINE}` }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '12px clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', gap: 28 }}>
        <Link href="/#works" data-cursor="explore" style={{ textDecoration: 'none', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span aria-hidden style={{ fontFamily: FONT_DISPLAY, color: MUTED_LIGHT }}>←</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: '0.9rem', fontWeight: 600, color: FG, letterSpacing: '-0.01em' }}>Audrey Leo</span>
        </Link>
        <div style={{ display: 'flex', gap: 'clamp(16px, 2vw, 26px)', overflowX: 'auto', scrollbarWidth: 'none', marginLeft: 'auto' }}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} data-cursor="explore"
              style={{ fontFamily: FONT_DISPLAY, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: s.id === active ? FG : MUTED_LIGHT, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'color 0.25s' }}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
