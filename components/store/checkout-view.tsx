'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, CreditCard, Lock, Package } from 'lucide-react'
import { useStore } from '@/components/store/store-provider'
import { formatPrice } from '@/lib/products'

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="glass mt-1.5 w-full rounded-xl px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring"
      />
    </label>
  )
}

export function CheckoutView() {
  const { cart, cartTotal, placeOrder } = useStore()
  const router = useRouter()
  const [done, setDone] = useState(false)

  const shipping = cartTotal > 500 ? 0 : 25
  const tax = Math.round(cartTotal * 0.08)
  const total = cartTotal + shipping + tax

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    placeOrder()
    setDone(true)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-3 sm:px-6">
        <div className="glass-strong flex flex-col items-center rounded-[2rem] px-6 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold">Order confirmed</h1>
          <p className="mt-3 max-w-sm text-muted-foreground">
            Thank you for choosing VOLTARA. A confirmation is on its way to your inbox, and your
            devices are being prepared for dispatch.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/orders"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <Package className="h-4 w-4" /> View orders
            </Link>
            <Link href="/products" className="glass rounded-2xl px-6 py-3.5 font-semibold hover:bg-white/10">
              Keep shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-3 text-center sm:px-6">
        <div className="glass-strong rounded-[2rem] px-6 py-20">
          <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add a device before heading to checkout.</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-8 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Browse products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Checkout</h1>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Lock className="h-3.5 w-3.5" /> Secured, encrypted payment
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-semibold">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="First name" required placeholder="Ada" />
              <Field label="Last name" required placeholder="Lovelace" />
              <div className="sm:col-span-2">
                <Field label="Email" type="email" required placeholder="you@email.com" />
              </div>
            </div>
          </section>

          <section className="glass rounded-3xl p-6">
            <h2 className="font-display text-lg font-semibold">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address" required placeholder="123 Future Ave" />
              </div>
              <Field label="City" required placeholder="San Francisco" />
              <Field label="State / Region" required placeholder="CA" />
              <Field label="ZIP / Postal" required placeholder="94103" />
              <Field label="Country" required placeholder="United States" />
            </div>
          </section>

          <section className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <CreditCard className="h-5 w-5 text-primary" /> Payment
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Card number" required placeholder="4242 4242 4242 4242" inputMode="numeric" />
              </div>
              <Field label="Expiry" required placeholder="MM / YY" />
              <Field label="CVC" required placeholder="123" inputMode="numeric" />
            </div>
          </section>
        </div>

        <aside className="glass-strong h-fit rounded-3xl p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold">Summary</h2>
          <div className="mt-5 space-y-3">
            {cart.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-muted-foreground">
                  {product.name} <span className="text-foreground">×{qty}</span>
                </span>
                <span className="font-medium">{formatPrice(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <div className="my-4 h-px bg-white/10" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between pt-2 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-xl font-bold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            <Lock className="h-4 w-4" /> Pay {formatPrice(total)}
          </button>
        </aside>
      </form>
    </div>
  )
}
