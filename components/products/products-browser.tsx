'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/site/product-card'
import { categories, products, formatPrice } from '@/lib/products'
import { cn } from '@/lib/utils'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top rated' },
]

const MAX_PRICE = 1200

export function ProductsBrowser() {
  const params = useSearchParams()
  const initialCategory = params.get('category') ?? 'all'

  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [mobileFilters, setMobileFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice)
    if (category !== 'all') list = list.filter((p) => p.category === category)
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
    }
    return list
  }, [category, sort, maxPrice])

  const catOptions = [{ slug: 'all', name: 'All products' }, ...categories]

  const Filters = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Category
        </h3>
        <div className="mt-3 flex flex-col gap-1">
          {catOptions.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                'rounded-xl px-3 py-2 text-left text-sm transition-colors',
                category === c.slug
                  ? 'bg-gradient-to-r from-primary/25 to-accent/25 font-semibold text-foreground'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Max price
        </h3>
        <input
          type="range"
          min={100}
          max={MAX_PRICE}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-4 w-full accent-primary"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Up to <span className="font-semibold text-foreground">{formatPrice(maxPrice)}</span>
        </p>
      </div>
    </div>
  )

  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-6">
      <div className="glass-strong overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10">
        <p className="text-sm font-medium text-primary">Collection</p>
        <h1 className="mt-2 text-balance font-display text-4xl font-bold sm:text-5xl">
          Every VOLTARA device
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Spin any product in 3D, compare the specs, and add your favorites to the cart.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="glass hidden h-fit rounded-3xl p-6 lg:block">
          <Filters />
        </aside>

        <div>
          <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilters(true)}
                className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> products
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-muted-foreground sm:inline">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="glass rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring [&>option]:bg-popover [&>option]:text-popover-foreground"
              >
                {sorts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="glass mt-6 rounded-3xl p-16 text-center">
              <p className="font-display text-lg font-semibold">Nothing matches those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">Try raising the price or picking another category.</p>
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <div className="glass-strong absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters" className="glass rounded-full p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <Filters />
          </div>
        </div>
      )}
    </section>
  )
}
