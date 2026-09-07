import type { Metadata } from 'next'
import { Shell } from '@/components/site/shell'
import { CartView } from '@/components/store/cart-view'

export const metadata: Metadata = { title: 'Cart — VOLTARA' }

export default function CartPage() {
  return (
    <Shell>
      <CartView />
    </Shell>
  )
}
