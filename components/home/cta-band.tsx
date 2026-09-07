import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CtaBand() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-3 sm:px-6">
      <div className="glass-strong relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-6 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-bold sm:text-5xl">
            Join the <span className="text-gradient">VOLTARA</span> inner circle
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
            Early access to drops, members-only pricing, and 10% off your first order. No noise —
            only the good stuff.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="glass w-full rounded-2xl px-5 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              Join
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          <Link href="/products" className="mt-6 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            or browse the full collection
          </Link>
        </div>
      </div>
    </section>
  )
}
