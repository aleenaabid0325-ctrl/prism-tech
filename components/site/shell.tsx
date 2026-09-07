import type { ReactNode } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-24 sm:pt-28">{children}</main>
      <Footer />
    </div>
  )
}
