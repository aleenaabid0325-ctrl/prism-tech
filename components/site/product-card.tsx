'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'
import { Scene3D } from '@/components/three/scene'
import { useStore } from '@/components/store/store-provider'
import { formatPrice, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, toggleWish, isWished } = useStore()
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const wished = isWished(product.id)

  const onMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -6, y: px * 8 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        animationDelay: `${index * 70}ms`,
      }}
      className="group glass animate-rise relative flex flex-col overflow-hidden rounded-3xl p-4 transition-[transform,box-shadow] duration-200 will-change-transform hover:shadow-[0_30px_80px_-30px_var(--electric)]"
    >
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${product.accent}55, 0 0 40px -8px ${product.accent}66` }}
      />

      <button
        onClick={() => toggleWish(product.id)}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        className="glass absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110"
      >
        <Heart className={cn('h-4 w-4', wished ? 'fill-accent text-accent' : 'text-foreground')} />
      </button>

      {product.badge && (
        <span
          className="absolute left-6 top-6 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: `${product.accent}22`, color: product.accent, boxShadow: `inset 0 0 0 1px ${product.accent}55` }}
        >
          {product.badge}
        </span>
      )}

      <Link href={`/products/${product.id}`} className="relative block">
        <div className="relative h-52 w-full">
          <div
            className="absolute inset-6 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-90"
            style={{ background: `radial-gradient(circle, ${product.accent}, transparent 70%)` }}
          />
          <Scene3D type={product.type} color={product.color} accent={product.accent} interactive={false} />
        </div>
      </Link>

      <div className="mt-2 flex flex-1 flex-col">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews.toLocaleString()})</span>
          <span className="ml-auto uppercase tracking-wide">{product.categoryName}</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="mt-2 font-display text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.blurb}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <button
            onClick={() => add(product)}
            className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
