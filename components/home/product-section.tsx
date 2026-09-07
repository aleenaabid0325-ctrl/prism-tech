import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/site/product-card'
import type { Product } from '@/lib/products'

export function ProductSection({
  title,
  subtitle,
  products,
  href = '/products',
}: {
  title: string
  subtitle: string
  products: Product[]
  href?: string
}) {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-3 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <Link
          href={href}
          className="group hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}
