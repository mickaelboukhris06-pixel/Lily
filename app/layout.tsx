import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Geist_Mono } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lily',
  description: 'Toutes les infos de votre séjour en un lien.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Lily',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${beVietnamPro.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-[#08080C] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
