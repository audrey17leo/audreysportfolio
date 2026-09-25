'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useIsMobile } from '@/lib/useIsMobile'
import { FG, MUTED, BG, ACCENT, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

const links = [
  { label: 'Work', href: '/#works' },
  { label: 'About', href: '/about' },
  { label: 'Garden', href: '/garden' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '16px 24px' : '20px clamp(32px, 5vw, 64px)',
        background: scrolled ? 'rgba(250,250,250,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${'rgba(0,0,0,0.06)'}` : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Left — name/logo */}
      <Link href="/" data-cursor="explore" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/a-logo.png" alt="Audrey Leo" style={{ height: 26, width: 'auto', display: 'block' }} />
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: '1rem', fontWeight: 600, color: FG, letterSpacing: '-0.02em' }}>
          Audrey Leo
        </span>
      </Link>

      {/* Right — links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 28 }}>
        {links.map((l) => {
          const active =
            (l.href === '/#works' && pathname.startsWith('/works')) ||
            (l.href !== '/#works' && pathname === l.href)
          return (
            <Link
              key={l.label}
              href={l.href}
              data-cursor="explore"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: active ? FG : MUTED,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'color 0.2s',
              }}
            >
              {active && <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT }} />}
              {l.label}
            </Link>
          )
        })}
        {!isMobile && (
          <Link
            href="/#contact"
            data-cursor="explore"
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: BG,
              background: FG,
              padding: '9px 18px',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            Contact
          </Link>
        )}
      </div>
    </div>
  )
}
