'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import { Scene3D } from '@/components/three/scene'
import { ProductCard } from '@/components/site/product-card'
import { useStore } from '@/components/store/store-provider'
import { formatPrice, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

const perks = [
  { icon: Truck, label: 'Free 2-day delivery' },
  { icon: RotateCcw, label: '30-day returns' },
  { icon: ShieldCheck, label: '2-year warranty' },
]

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { add, toggleWish, isWished } = useStore()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const wished = isWished(product.id)

  const onAdd = () => {
    add(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 3D viewer */}
        <div className="glass-strong relative overflow-hidden rounded-[2rem] p-4">
          <div
            className="pointer-events-none absolute inset-10 rounded-full opacity-60 blur-3xl"
            style={{ background: `radial-gradient(circle, ${product.accent}, transparent 70%)` }}
          />
          {product.badge && (
            <span
              className="absolute left-6 top-6 z-10 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: `${product.accent}22`, color: product.accent, boxShadow: `inset 0 0 0 1px ${product.accent}55` }}
            >
              {product.badge}
            </span>
          )}
          <div className="relative h-[360px] sm:h-[480px]">
            <Scene3D type={product.type} color={product.color} accent={product.accent} interactive autoRotate zoom />
          </div>
          <div className="glass absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs text-muted-foreground">
            Drag to rotate · scroll to zoom
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-primary">{product.categoryName}</p>
          <h1 className="mt-2 text-balance font-display text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/40',
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                  Save {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.highlights.map((h) => (
              <span key={h} className="glass rounded-full px-3 py-1.5 text-xs font-medium">
                {h}
              </span>
            ))}
          </div>

          <div className="mt-6 glass rounded-2xl p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Colorway</p>
            <div className="mt-2 flex items-center gap-3">
              <span
                className="h-8 w-8 rounded-full border border-white/20"
                style={{ background: product.color }}
              />
              <span className="text-sm font-medium">{product.colorway}</span>
            </div>
          </div>

          {/* qty + add */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="glass flex items-center gap-1 rounded-2xl p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={onAdd}
              className={cn(
                'group flex flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-95',
                added ? 'bg-emerald-500' : 'bg-gradient-to-r from-primary to-accent',
              )}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" /> Add to cart · {formatPrice(product.price * qty)}
                </>
              )}
            </button>

            <button
              onClick={() => toggleWish(product.id)}
              aria-label="Toggle wishlist"
              className="glass flex h-[52px] w-[52px] items-center justify-center rounded-2xl transition-transform hover:scale-105"
            >
              <Heart className={cn('h-5 w-5', wished ? 'fill-accent text-accent' : '')} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {perks.map((p) => (
              <div key={p.label} className="glass flex flex-col items-center gap-2 rounded-2xl px-2 py-4 text-center">
                <p.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-muted-foreground">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="mt-12 glass-strong rounded-[2rem] p-6 sm:p-10">
        <h2 className="font-display text-2xl font-bold">Technical specifications</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.specs.map((s) => (
            <div key={s.label} className="glass flex items-center justify-between rounded-2xl px-4 py-3.5">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-sm font-semibold">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">You may also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
