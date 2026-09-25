import type { Metadata } from 'next'
import { Manrope, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ClientProviders from '@/components/ClientProviders'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

// Editorial serif display (stands in for Exposure / New Spirit)
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Audrey Leo — Product Designer & Creative Technologist',
  description:
    'Portfolio of Audrey Leo — product design, creative computing, and interactive media. Art & Technology at UCL.',
  openGraph: {
    title: 'Audrey Leo — Product Designer & Creative Technologist',
    description:
      'Portfolio of Audrey Leo — product design, creative computing, and interactive media.',
    type: 'website',
  },
  icons: [
    { rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', url: '/a-logo.png' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
      <body
        className="antialiased"
        style={{
          cursor: 'none',
          fontFamily: 'var(--font-manrope), Manrope, system-ui, sans-serif',
          background: '#f6f5f2',
          color: '#1c1c1c',
        }}
      >
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
