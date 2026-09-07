import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Shell } from '@/components/site/shell'
import { ProductsBrowser } from '@/components/products/products-browser'

export const metadata: Metadata = {
  title: 'Shop all devices — VOLTARA',
  description: 'Browse VOLTARA audio, wearables, mobile, and home devices in interactive 3D.',
}

export default function ProductsPage() {
  return (
    <Shell>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-20 text-center text-muted-foreground">Loading collection…</div>}>
        <ProductsBrowser />
      </Suspense>
    </Shell>
  )
}
