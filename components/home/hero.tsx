'use client'

import Link from 'next/link'
import { ArrowRight, Move3d, Sparkles } from 'lucide-react'
import { Scene3D } from '@/components/three/scene'

const stats = [
  { value: '2M+', label: 'Devices shipped' },
  { value: '4.9', label: 'Avg. rating' },
  { value: '120+', label: 'Countries' },
]

export function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-3 sm:px-6">
      <div className="glass-strong relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="animate-rise">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New — Aurora Studio, now with adaptive spatial audio
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Technology you can <span className="text-gradient">feel</span> before you touch.
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              VOLTARA crafts premium audio, wearables, and mobile devices. Explore every product in
              real, interactive 3D — spin it, study it, and make it yours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Explore the shop
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products/aurora-headphones"
                className="glass flex items-center gap-2 rounded-2xl px-6 py-3.5 font-semibold transition-colors hover:bg-white/10"
              >
                <Move3d className="h-4 w-4 text-primary" />
                View in 3D
              </Link>
            </div>

            <div className="mt-10 flex gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[340px] sm:h-[440px] lg:h-[520px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
              <Scene3D type="headphones" color="#3b6fe0" accent="#8b5cf6" interactive autoRotate zoom />
            </div>
            <div className="glass absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 text-xs text-muted-foreground">
              Drag to rotate · scroll to zoom
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
