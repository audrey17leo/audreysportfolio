'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/lib/useIsMobile'
import { FG, MUTED_LIGHT, FONT_DISPLAY, FONT_BODY } from '@/lib/theme'

const links = [
  { label: 'work', href: '/#works' },
  { label: 'about', href: '/about' },
  { label: 'garden', href: '/garden' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: FONT_BODY,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: active ? FG : MUTED_LIGHT,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s',
  })

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: isMobile ? '20px 24px' : '28px clamp(32px, 6vw, 88px)',
        background: 'linear-gradient(#f6f5f2 55%, rgba(246,245,242,0))',
      }}
    >
      {/* Left — serif wordmark */}
      <Link href="/" data-cursor="explore" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span aria-hidden style={{ fontFamily: FONT_BODY, fontSize: '0.9rem', color: FG }}>✳</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontSize: '1.05rem', fontWeight: 600, color: FG, letterSpacing: '-0.02em' }}>
          Audrey Leo
        </span>
      </Link>

      {/* Right — lowercase links */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: isMobile ? 16 : 28 }}>
        {links.map((l) => {
          const active =
            (l.href === '/#works' && pathname.startsWith('/works')) ||
            (l.href !== '/#works' && pathname === l.href)
          return (
            <Link key={l.label} href={l.href} data-cursor="explore" style={linkStyle(active)}>
              {l.label}
            </Link>
          )
        })}
        <span style={{ color: MUTED_LIGHT }}>·</span>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor="explore" style={linkStyle(false)}>resume</a>
        <a href="https://linkedin.com/in/audrey17leo" target="_blank" rel="noopener noreferrer" data-cursor="explore" style={linkStyle(false)}>linkedin</a>
      </div>
    </div>
  )
}
