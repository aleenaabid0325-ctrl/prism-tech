import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Scene3D } from '@/components/three/scene'
import { categories } from '@/lib/products'

const accents: Record<string, { color: string; accent: string }> = {
  audio: { color: '#3b6fe0', accent: '#8b5cf6' },
  wearables: { color: '#c9d2e3', accent: '#3b6fe0' },
  mobile: { color: '#2a2350', accent: '#8b5cf6' },
  home: { color: '#1b2440', accent: '#22d3ee' },
}

export function Categories() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-3 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-balance font-display text-3xl font-bold sm:text-4xl">Shop by category</h2>
          <p className="mt-2 text-muted-foreground">Four families, one obsessive standard.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const a = accents[c.slug]
          return (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group glass relative flex flex-col overflow-hidden rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className="absolute inset-x-6 top-6 h-40 rounded-full opacity-50 blur-2xl transition-opacity group-hover:opacity-80"
                style={{ background: `radial-gradient(circle, ${a.accent}, transparent 70%)` }}
              />
              <div className="relative h-40">
                <Scene3D type={c.type} color={a.color} accent={a.accent} interactive={false} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.tagline}</p>
                </div>
                <span className="glass flex h-9 w-9 items-center justify-center rounded-full transition-colors group-hover:bg-white/10">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
