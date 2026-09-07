import type { Metadata } from 'next'
import { Shell } from '@/components/site/shell'
import { CheckoutView } from '@/components/store/checkout-view'

export const metadata: Metadata = { title: 'Checkout — VOLTARA' }

export default function CheckoutPage() {
  return (
    <Shell>
      <CheckoutView />
    </Shell>
  )
}
