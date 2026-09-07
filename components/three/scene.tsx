'use client'

import dynamic from 'next/dynamic'
import type { GadgetType } from '@/lib/products'

const ProductViewer = dynamic(() => import('./product-viewer').then((m) => m.ProductViewer), {
  ssr: false,
  loading: () => <LoadingOrb />,
})

function LoadingOrb() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-accent/50 blur-sm" />
        <div className="absolute inset-5 rounded-full bg-primary" />
      </div>
    </div>
  )
}

type Props = {
  type: GadgetType
  color?: string
  accent?: string
  interactive?: boolean
  autoRotate?: boolean
  zoom?: boolean
  className?: string
}

export function Scene3D(props: Props) {
  return <ProductViewer {...props} />
}
