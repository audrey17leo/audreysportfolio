import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ClientProviders from '@/components/ClientProviders'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const geistMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// Editorial serif for case-study body copy — closest freely-licensable match to
// Anthropic's Copernicus/Tiempos literary serif.
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Audrey Leo, Product Designer & Creative Technologist',
  description:
    'Portfolio of Audrey Leo, product design, creative computing, and interactive media. Art & Technology at UCL.',
  openGraph: {
    title: 'Audrey Leo, Product Designer & Creative Technologist',
    description:
      'Portfolio of Audrey Leo, product design, creative computing, and interactive media.',
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
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body
        className="antialiased"
        style={{
          cursor: 'none',
          fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
          background: '#fdfcfc',
          color: '#000000',
        }}
      >
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
