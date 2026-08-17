import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Zilla_Slab } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-zilla-slab',
})

export const metadata: Metadata = {
  title: 'ArgenDo-Ku Creator',
  description:
    'Maquetá y exportá libros de Sudokus listos para Amazon KDP: puzles, soluciones y exportación PDF en un solo lugar.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1c1917',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`dark bg-stone-900 ${geistSans.variable} ${zillaSlab.variable}`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
