import Link from 'next/link'
import { AtSign, Globe, MessageCircle, Send } from 'lucide-react'

const groups = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: '/products' },
      { label: 'Audio', href: '/products?category=audio' },
      { label: 'Wearables', href: '/products?category=wearables' },
      { label: 'Mobile', href: '/products?category=mobile' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'Wishlist', href: '/wishlist' },
      { label: 'Orders', href: '/orders' },
      { label: 'Cart', href: '/cart' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Press', href: '/' },
      { label: 'Support', href: '/' },
    ],
  },
]

const socials = [
  { icon: Send, label: 'Telegram' },
  { icon: AtSign, label: 'Threads' },
  { icon: MessageCircle, label: 'Community' },
  { icon: Globe, label: 'Website' },
]

export function Footer() {
  return (
    <footer className="px-3 pb-3 pt-16 sm:px-6">
      <div className="glass mx-auto max-w-7xl rounded-3xl px-6 py-12 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <span className="h-3 w-3 rounded-sm bg-background" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">VOLTARA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Future-grade consumer electronics, engineered with obsessive detail and explored in
              interactive 3D.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-sm font-semibold">{g.title}</h4>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VOLTARA. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
