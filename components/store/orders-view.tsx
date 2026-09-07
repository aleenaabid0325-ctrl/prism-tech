'use client'

import Link from 'next/link'
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react'
import { useStore } from '@/components/store/store-provider'
import { formatPrice } from '@/lib/products'
import { cn } from '@/lib/utils'

const statusMeta = {
  Delivered: { icon: CheckCircle2, className: 'text-emerald-400 bg-emerald-500/15' },
  Shipped: { icon: Truck, className: 'text-primary bg-primary/15' },
  Processing: { icon: Clock, className: 'text-accent bg-accent/15' },
}

export function OrdersView() {
  const { orders } = useStore()

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6">
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Your orders</h1>
      <p className="mt-2 text-muted-foreground">Track every VOLTARA device on its way to you.</p>

      {orders.length === 0 ? (
        <div className="glass-strong mt-8 flex flex-col items-center rounded-[2rem] px-6 py-20 text-center">
          <span className="glass flex h-16 w-16 items-center justify-center rounded-2xl">
            <Package className="h-7 w-7 text-primary" />
          </span>
          <h2 className="mt-6 font-display text-2xl font-bold">No orders yet</h2>
          <p className="mt-2 text-muted-foreground">When you place an order it will appear here.</p>
          <Link
            href="/products"
            className="mt-8 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {orders.map((order) => {
            const meta = statusMeta[order.status]
            const Icon = meta.icon
            return (
              <div key={order.id} className="glass rounded-3xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold">Order {order.id}</p>
                    <p className="text-sm text-muted-foreground">Placed {order.date}</p>
                  </div>
                  <span className={cn('flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold', meta.className)}>
                    <Icon className="h-3.5 w-3.5" />
                    {order.status}
                  </span>
                </div>

                <div className="my-4 h-px bg-white/10" />

                <div className="space-y-2">
                  {order.items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center justify-between gap-2 text-sm">
                      <Link href={`/products/${product.id}`} className="text-muted-foreground hover:text-foreground">
                        {product.name} <span className="text-foreground">×{qty}</span>
                      </Link>
                      <span className="font-medium">{formatPrice(product.price * qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-lg font-bold">{formatPrice(order.total)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
