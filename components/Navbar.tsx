'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/lib/useIsMobile'
import { ACCENT, FONT_DISPLAY } from '@/lib/theme'

const links = [
  { label: 'Work', href: '/#works' },
  { label: 'About', href: '/about' },
  { label: 'Garden', href: '/garden' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/audrey17leo', external: true },
]

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

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
        padding: isMobile ? '18px 24px' : '26px clamp(32px, 6vw, 96px)',
        mixBlendMode: 'difference',
      }}
    >
      {/* Left — wordmark */}
      <Link href="/" data-cursor="explore" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: '1.05rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>
          Audrey Leo<span style={{ color: ACCENT }}>.</span>
        </span>
      </Link>

      {/* Right — text links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 16 : 28 }}>
        {links.map((l) => {
          const active =
            (l.href === '/#works' && pathname.startsWith('/works')) ||
            (!l.external && l.href !== '/#works' && pathname === l.href)
          return (
            <Link
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              data-cursor="explore"
              style={{
                fontSize: '0.82rem',
                fontWeight: active ? 700 : 500,
                letterSpacing: '-0.01em',
                color: '#fff',
                opacity: active ? 1 : 0.7,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {l.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
