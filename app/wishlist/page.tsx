import type { Metadata } from 'next'
import { Shell } from '@/components/site/shell'
import { WishlistView } from '@/components/store/wishlist-view'

export const metadata: Metadata = { title: 'Wishlist — VOLTARA' }

export default function WishlistPage() {
  return (
    <Shell>
      <WishlistView />
    </Shell>
  )
}
