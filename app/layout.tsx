import type { Metadata } from 'next'
import { Schibsted_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ClientProviders from '@/components/ClientProviders'

// Flim design language:
// Swizzy → Schibsted Grotesk (display) · PP Neue Montreal Mono → JetBrains Mono · Arial (body)
const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
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
    <html lang="en" className={`${schibsted.variable} ${jetbrainsMono.variable}`}>
      <body
        className="antialiased"
        style={{
          cursor: 'none',
          fontFamily: 'Arial, system-ui, sans-serif',
          color: '#141414',
          // Sketchpad grid on warm canvas — the Flim surface
          background: '#f5f5f5',
          backgroundImage:
            'linear-gradient(#d9d9d9 1px, transparent 1px), linear-gradient(90deg, #d9d9d9 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <ClientProviders>{children}</ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
