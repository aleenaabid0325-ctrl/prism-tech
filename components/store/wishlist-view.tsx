'use client'

import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'
import { ProductCard } from '@/components/site/product-card'
import { useStore } from '@/components/store/store-provider'
import { products } from '@/lib/products'

export function WishlistView() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your wishlist</h1>
      <p className="mt-2 text-muted-foreground">
        {items.length > 0 ? `${items.length} saved device${items.length !== 1 ? 's' : ''}.` : 'Save devices you love to find them here.'}
      </p>

      {items.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="glass-strong mt-8 flex flex-col items-center rounded-[2rem] px-6 py-20 text-center">
          <span className="glass flex h-16 w-16 items-center justify-center rounded-2xl">
            <Heart className="h-7 w-7 text-accent" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold">No saved items yet</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Tap the heart on any product to keep it here for later.
          </p>
          <Link
            href="/products"
            className="mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Discover products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
