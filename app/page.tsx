import { Shell } from '@/components/site/shell'
import { Hero } from '@/components/home/hero'
import { Categories } from '@/components/home/categories'
import { ProductSection } from '@/components/home/product-section'
import { FeatureBand } from '@/components/home/feature-band'
import { CtaBand } from '@/components/home/cta-band'
import { products } from '@/lib/products'

export default function HomePage() {
  const newArrivals = products.filter((p) => p.badge === 'New').slice(0, 3)
  const bestSellers = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'Limited').slice(0, 3)

  return (
    <Shell>
      <Hero />
      <Categories />
      <ProductSection
        title="New arrivals"
        subtitle="The latest to leave the VOLTARA lab."
        products={newArrivals}
      />
      <FeatureBand />
      <ProductSection
        title="Best sellers"
        subtitle="What everyone is reaching for right now."
        products={bestSellers}
      />
      <CtaBand />
    </Shell>
  )
}
