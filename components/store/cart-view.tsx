'use client'

import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Scene3D } from '@/components/three/scene'
import { useStore } from '@/components/store/store-provider'
import { formatPrice } from '@/lib/products'

export function CartView() {
  const { cart, setQty, remove, cartTotal, cartCount } = useStore()
  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 25
  const tax = Math.round(cartTotal * 0.08)
  const total = cartTotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-3 sm:px-6">
        <div className="glass-strong flex flex-col items-center rounded-[2rem] px-6 py-20 text-center">
          <span className="glass flex h-16 w-16 items-center justify-center rounded-2xl">
            <ShoppingBag className="h-7 w-7 text-primary" />
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Looks like you haven&apos;t added anything yet. Explore the collection and find your next device.
          </p>
          <Link
            href="/products"
            className="mt-8 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Browse products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your cart</h1>
      <p className="mt-2 text-muted-foreground">{cartCount} item{cartCount !== 1 && 's'} ready to ship.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map(({ product, qty }) => (
            <div key={product.id} className="glass flex gap-4 rounded-3xl p-4">
              <Link
                href={`/products/${product.id}`}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 40%, ${product.accent}33, transparent 70%)` }}
              >
                <Scene3D type={product.type} color={product.color} accent={product.accent} interactive={false} />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/products/${product.id}`} className="font-display font-semibold hover:text-primary">
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.colorway} · {product.categoryName}</p>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    aria-label="Remove item"
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="glass flex items-center gap-1 rounded-xl p-1">
                    <button
                      onClick={() => setQty(product.id, qty - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-display font-bold">{formatPrice(product.price * qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="glass-strong h-fit rounded-3xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatPrice(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Estimated tax</dt>
              <dd className="font-medium">{formatPrice(tax)}</dd>
            </div>
            <div className="my-3 h-px bg-white/10" />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-xl font-bold">{formatPrice(total)}</dd>
            </div>
          </dl>

          {shipping === 0 && cartTotal > 0 && (
            <p className="mt-3 rounded-xl bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
              You&apos;ve unlocked free shipping.
            </p>
          )}

          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
