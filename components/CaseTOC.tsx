'use client'
import { useEffect, useState } from 'react'
import { FG, MUTED_LIGHT, FONT_BODY } from '@/lib/theme'

// Left sticky table of contents (ruocanpeng circle-status style): section
// names, right-aligned, the one you're reading highlighted.
export default function CaseTOC({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id) })
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [sections])

  return (
    <nav className="cs-toc" style={{ display: 'flex', flexDirection: 'column', gap: 11, textAlign: 'right' }}>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-cursor="explore"
          style={{
            fontFamily: FONT_BODY, fontSize: 15, fontWeight: s.id === active ? 500 : 400,
            color: s.id === active ? FG : MUTED_LIGHT, textDecoration: 'none', transition: 'color 0.2s',
            lineHeight: 1.5,
          }}
        >
          {s.label}
        </a>
      ))}
    </nav>
  )
}
