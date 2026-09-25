'use client'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { sfPro, mono } from '@/lib/fonts'

export default function GardenPage() {
  return (
    <>
      <Navbar />
      <main style={{
        background: '#fafafa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '0 32px',
      }}>
        <p style={{
          fontFamily: mono,
          fontSize: '0.58rem',
          color: '#C0B0D8',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          margin: '0 0 20px',
        }}>
          coming soon
        </p>

        <h1 style={{
          fontFamily: sfPro,
          fontWeight: 400,
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#111',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          margin: '0 0 16px',
        }}>
          audrey is still working on this.
        </h1>

        <p style={{
          fontFamily: sfPro,
          fontWeight: 300,
          fontSize: '1rem',
          color: '#888',
          margin: '0 0 40px',
          letterSpacing: '-0.01em',
        }}>
          be sure to check back soon :)
        </p>

        <Link
          href="/"
          style={{
            fontFamily: mono,
            fontSize: '0.62rem',
            color: '#111',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            borderBottom: '1px solid #ddd',
            paddingBottom: 2,
          }}
        >
          ← back home
        </Link>
      </main>
    </>
  )
}
