import type { Metadata } from 'next'
import { Noto_Serif, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hotel-concept.kbdigitalco.co.uk'),
  title: 'The Alder Fold | Countryside B&B in Thornby Green',
  description:
    'A concept website for a fictional countryside bed and breakfast: restored barn rooms, a cooked breakfast and quiet gardens in the village of Thornby Green.',
  openGraph: {
    title: 'The Alder Fold | Countryside B&B in Thornby Green',
    description: 'A concept website for a fictional countryside bed and breakfast.',
    url: '/',
    siteName: 'The Alder Fold',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'The Alder Fold, a countryside bed and breakfast' }],
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['bed and breakfast', 'countryside', 'barn conversion', 'B&B', 'concept website'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  )
}
