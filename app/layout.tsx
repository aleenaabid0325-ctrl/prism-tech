import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Sora, Inter } from 'next/font/google'
import { CartProvider } from '@/components/store/store-provider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VOLTARA — Future-grade consumer electronics',
  description:
    'VOLTARA crafts premium consumer electronics and gadgets — audio, wearables, and mobile devices engineered with obsessive detail. Explore every product in interactive 3D.',
  generator: 'v0.app',
  keywords: [
    'VOLTARA',
    'premium electronics',
    'gadgets',
    'headphones',
    'smartwatch',
    'smartphone',
    '3D shopping',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#05060f',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${sora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
