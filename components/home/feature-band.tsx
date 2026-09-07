import { BatteryCharging, Cpu, Radio, ShieldCheck, Truck, Waves } from 'lucide-react'

const features = [
  { icon: Cpu, title: 'On-device AI', text: 'Neural engines that think locally, privately, instantly.' },
  { icon: Waves, title: 'Spatial audio', text: 'Head-tracked, room-adaptive sound in every product.' },
  { icon: BatteryCharging, title: 'All-day power', text: 'Fast charging and multi-day batteries as standard.' },
  { icon: ShieldCheck, title: '2-year warranty', text: 'Every VOLTARA device is covered, no fine print.' },
  { icon: Truck, title: 'Free delivery', text: 'Carbon-neutral shipping on all orders, worldwide.' },
  { icon: Radio, title: 'Seamless sync', text: 'One ecosystem — your devices simply know each other.' },
]

const marquee = ['AUDIO', 'WEARABLES', 'MOBILE', 'HOME', 'GAMING', 'ACCESSORIES']

export function FeatureBand() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-3 sm:px-6">
      <div className="glass-strong overflow-hidden rounded-[2rem] px-6 py-12 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass flex gap-4 rounded-2xl p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex overflow-hidden rounded-2xl py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex shrink-0 animate-[marquee_22s_linear_infinite] items-center gap-10 pr-10">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="font-display text-2xl font-bold text-muted-foreground/40">
              {m}
              <span className="ml-10 text-primary/40">✦</span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 animate-[marquee_22s_linear_infinite] items-center gap-10 pr-10" aria-hidden>
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="font-display text-2xl font-bold text-muted-foreground/40">
              {m}
              <span className="ml-10 text-primary/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
