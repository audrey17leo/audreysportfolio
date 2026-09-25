import type { Metadata } from 'next'
import { Figtree, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ClientProviders from '@/components/ClientProviders'

// Aditya Muralidhar design language:
// Figtree (body) · Space Grotesk (display, stands in for Stack Sans) · JetBrains Mono (labels)
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
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
    <html lang="en" className={`${figtree.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body
        className="antialiased"
        style={{
          cursor: 'none',
          fontFamily: 'var(--font-body), Figtree, system-ui, sans-serif',
          background: '#fafafa',
          color: '#262626',
        }}
      >
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
