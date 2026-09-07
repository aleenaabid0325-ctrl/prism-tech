'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useStore } from '@/components/store/store-provider'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/products?category=audio', label: 'Audio' },
  { href: '/products?category=wearables', label: 'Wearables' },
  { href: '/products?category=mobile', label: 'Mobile' },
]

export function Navbar() {
  const pathname = usePathname()
  const { cartCount, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6',
          scrolled ? 'glass-strong' : 'glass',
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <span className="h-3 w-3 rounded-sm bg-background" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">VOLTARA</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = l.href === pathname
            return (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  active && 'text-foreground',
                )}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            className="hidden rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground sm:block"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            aria-label="Account"
            className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong mx-auto mt-2 max-w-7xl rounded-2xl p-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
