'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsMobile } from '@/lib/useIsMobile'
import { FG, CARD, HAIRLINE, R_PILL, FONT_DISPLAY, FONT_MONO } from '@/lib/theme'

const links = [
  { label: 'Work', href: '/#works' },
  { label: 'About', href: '/about' },
  { label: 'Garden', href: '/garden' },
]

function Pill({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      data-cursor="explore"
      style={{
        fontFamily: FONT_MONO,
        fontSize: '0.68rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 500,
        textDecoration: 'none',
        padding: '9px 16px',
        borderRadius: R_PILL,
        border: `1px solid ${active ? FG : HAIRLINE}`,
        background: active ? FG : CARD,
        color: active ? CARD : FG,
        whiteSpace: 'nowrap',
        transition: 'background 0.2s, color 0.2s, border-color 0.2s',
      }}
    >
      {label}
    </Link>
  )
}

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
        padding: isMobile ? '14px 20px' : '20px clamp(32px, 5vw, 64px)',
      }}
    >
      {/* Left — wordmark */}
      <Link href="/" data-cursor="explore" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/a-logo.png" alt="Audrey Leo" style={{ height: 24, width: 'auto', display: 'block' }} />
        {!isMobile && (
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: '1.05rem', fontWeight: 500, color: FG, letterSpacing: '-0.02em' }}>
            Audrey Leo
          </span>
        )}
      </Link>

      {/* Right — pill nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8 }}>
        {links.map((l) => {
          const active =
            (l.href === '/#works' && pathname.startsWith('/works')) ||
            (l.href !== '/#works' && pathname === l.href)
          return <Pill key={l.label} href={l.href} label={l.label} active={active} />
        })}
        {!isMobile && <Pill href="/#contact" label="Contact" active />}
      </div>
    </div>
  )
}
