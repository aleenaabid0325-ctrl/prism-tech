import type { Metadata } from 'next'
import { Shell } from '@/components/site/shell'
import { OrdersView } from '@/components/store/orders-view'

export const metadata: Metadata = { title: 'Orders — VOLTARA' }

export default function OrdersPage() {
  return (
    <Shell>
      <OrdersView />
    </Shell>
  )
}
