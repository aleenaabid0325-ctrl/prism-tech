export type GadgetType = 'headphones' | 'phone' | 'watch' | 'earbuds' | 'speaker' | 'console'

export type Category = {
  slug: string
  name: string
  tagline: string
  type: GadgetType
}

export type Product = {
  id: string
  name: string
  category: string
  categoryName: string
  type: GadgetType
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  colorway: string
  color: string
  accent: string
  badge?: 'New' | 'Best Seller' | 'Limited'
  blurb: string
  description: string
  specs: { label: string; value: string }[]
  highlights: string[]
}

export const categories: Category[] = [
  { slug: 'audio', name: 'Audio', tagline: 'Reference-grade sound', type: 'headphones' },
  { slug: 'wearables', name: 'Wearables', tagline: 'Health on your wrist', type: 'watch' },
  { slug: 'mobile', name: 'Mobile', tagline: 'Pocket supercomputers', type: 'phone' },
  { slug: 'home', name: 'Home', tagline: 'Immersive spaces', type: 'speaker' },
]

export const products: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Studio Headphones',
    category: 'audio',
    categoryName: 'Audio',
    type: 'headphones',
    price: 429,
    oldPrice: 499,
    rating: 4.9,
    reviews: 2140,
    colorway: 'Nebula Blue',
    color: '#3b6fe0',
    accent: '#8b5cf6',
    badge: 'Best Seller',
    blurb: 'Adaptive spatial audio with 40h battery and titanium drivers.',
    description:
      'The Aurora Studio pushes personal audio into reference territory. Custom 40mm titanium-coated drivers deliver a wide, holographic soundstage while adaptive noise cancellation reads your environment 48,000 times a second.',
    specs: [
      { label: 'Driver', value: '40mm titanium' },
      { label: 'Battery', value: '40 hours' },
      { label: 'ANC', value: 'Adaptive Hybrid' },
      { label: 'Charge', value: 'USB-C fast' },
      { label: 'Weight', value: '268 g' },
      { label: 'Codec', value: 'LDAC / aptX' },
    ],
    highlights: ['Adaptive spatial audio', 'Hi-Res wireless', 'Memory-foam earcups'],
  },
  {
    id: 'pulse-earbuds',
    name: 'Pulse Pro Earbuds',
    category: 'audio',
    categoryName: 'Audio',
    type: 'earbuds',
    price: 199,
    rating: 4.7,
    reviews: 3820,
    colorway: 'Graphite',
    color: '#5b6b8c',
    accent: '#22d3ee',
    badge: 'New',
    blurb: 'Feather-light buds with 3D head tracking and wireless charging.',
    description:
      'Pulse Pro disappears into your ears while filling them with dimensional sound. Head-tracked spatial audio, an IPX5 sweat rating, and a case that tops up over any Qi pad.',
    specs: [
      { label: 'Driver', value: '11mm dynamic' },
      { label: 'Battery', value: '8h + 24h case' },
      { label: 'Rating', value: 'IPX5' },
      { label: 'Charge', value: 'Qi wireless' },
      { label: 'Latency', value: '55 ms mode' },
      { label: 'Mics', value: '6 beamforming' },
    ],
    highlights: ['3D head tracking', 'Wireless charging', 'Adaptive fit'],
  },
  {
    id: 'nova-watch',
    name: 'Nova Watch Ultra',
    category: 'wearables',
    categoryName: 'Wearables',
    type: 'watch',
    price: 549,
    rating: 4.8,
    reviews: 1560,
    colorway: 'Titanium Silver',
    color: '#c9d2e3',
    accent: '#3b6fe0',
    badge: 'Best Seller',
    blurb: 'Aerospace titanium, always-on AMOLED, 3-day endurance.',
    description:
      'Nova Watch Ultra is built from a single block of aerospace titanium. A 2,000-nit always-on AMOLED, dual-frequency GPS, and clinical-grade sensors track everything from ECG to blood oxygen.',
    specs: [
      { label: 'Case', value: 'Ti aerospace' },
      { label: 'Display', value: '2000-nit AMOLED' },
      { label: 'Battery', value: '72 hours' },
      { label: 'GPS', value: 'Dual-frequency' },
      { label: 'Water', value: '100 m / 10 ATM' },
      { label: 'Sensors', value: 'ECG · SpO₂' },
    ],
    highlights: ['Always-on display', 'Clinical sensors', 'Sapphire crystal'],
  },
  {
    id: 'zenith-phone',
    name: 'Zenith X Phone',
    category: 'mobile',
    categoryName: 'Mobile',
    type: 'phone',
    price: 1099,
    oldPrice: 1199,
    rating: 4.9,
    reviews: 4210,
    colorway: 'Midnight Violet',
    color: '#2a2350',
    accent: '#8b5cf6',
    badge: 'Limited',
    blurb: 'Titanium flagship with a 200MP sensor and on-device AI.',
    description:
      'Zenith X is our most advanced phone. A 6.8" LTPO display bends light at 144Hz, a 200MP periscope sensor captures the impossible, and the neural engine runs generative AI entirely on-device.',
    specs: [
      { label: 'Display', value: '6.8" LTPO 144Hz' },
      { label: 'Chip', value: 'Fusion N3 neural' },
      { label: 'Camera', value: '200MP periscope' },
      { label: 'Battery', value: '5400 mAh' },
      { label: 'Charge', value: '120W wired' },
      { label: 'Build', value: 'Titanium frame' },
    ],
    highlights: ['On-device AI', '200MP camera', '120W charging'],
  },
  {
    id: 'echo-speaker',
    name: 'Echo Sphere Speaker',
    category: 'home',
    categoryName: 'Home',
    type: 'speaker',
    price: 349,
    rating: 4.6,
    reviews: 980,
    colorway: 'Obsidian',
    color: '#1b2440',
    accent: '#22d3ee',
    badge: 'New',
    blurb: 'Room-filling 360° sound that maps to your space.',
    description:
      'Echo Sphere reads the acoustics of any room and beams 360° sound precisely where you sit. Six custom drivers and a machined aluminium chassis deliver concert-hall clarity at any volume.',
    specs: [
      { label: 'Drivers', value: '6 custom' },
      { label: 'Sound', value: '360° spatial' },
      { label: 'Tuning', value: 'Room-adaptive' },
      { label: 'Connect', value: 'Wi-Fi 6 / BT5.3' },
      { label: 'Voice', value: 'Far-field mics' },
      { label: 'Build', value: 'Machined alloy' },
    ],
    highlights: ['360° spatial audio', 'Room mapping', 'Multi-room sync'],
  },
  {
    id: 'flux-console',
    name: 'Flux Handheld Console',
    category: 'mobile',
    categoryName: 'Mobile',
    type: 'console',
    price: 649,
    rating: 4.7,
    reviews: 1330,
    colorway: 'Carbon',
    color: '#232a3d',
    accent: '#3b6fe0',
    badge: 'New',
    blurb: 'Console-class gaming with a 120Hz OLED you can hold.',
    description:
      'Flux packs desktop-class gaming into your hands. A 7" 120Hz OLED, hall-effect sticks, and active cooling keep frames buttery through the longest sessions.',
    specs: [
      { label: 'Display', value: '7" 120Hz OLED' },
      { label: 'Chip', value: 'RDNA gaming APU' },
      { label: 'Battery', value: '6 hours' },
      { label: 'Sticks', value: 'Hall-effect' },
      { label: 'Storage', value: '1TB NVMe' },
      { label: 'Cooling', value: 'Active vapor' },
    ],
    highlights: ['120Hz OLED', 'Hall-effect sticks', 'Console-class power'],
  },
  {
    id: 'lumen-buds',
    name: 'Lumen Sport Buds',
    category: 'audio',
    categoryName: 'Audio',
    type: 'earbuds',
    price: 149,
    rating: 4.5,
    reviews: 2010,
    colorway: 'Electric Cyan',
    color: '#22d3ee',
    accent: '#3b6fe0',
    blurb: 'Secure-fit buds tuned for movement, sweat, and rain.',
    description:
      'Lumen Sport locks in during the hardest workouts. Ear-hook stability, IP67 protection, and a punchy bass tuning keep you moving to the beat.',
    specs: [
      { label: 'Driver', value: '10mm dynamic' },
      { label: 'Battery', value: '10h + 30h case' },
      { label: 'Rating', value: 'IP67' },
      { label: 'Fit', value: 'Ear-hook' },
      { label: 'Charge', value: 'USB-C' },
      { label: 'Mics', value: '4 ENC' },
    ],
    highlights: ['IP67 waterproof', 'Secure ear-hooks', 'Bass-forward tuning'],
  },
  {
    id: 'orbit-watch',
    name: 'Orbit Watch Active',
    category: 'wearables',
    categoryName: 'Wearables',
    type: 'watch',
    price: 299,
    rating: 4.6,
    reviews: 870,
    colorway: 'Aurora Green',
    color: '#34d399',
    accent: '#22d3ee',
    blurb: 'Lightweight everyday smartwatch with 7-day battery.',
    description:
      'Orbit Active is the everyday companion — light, colorful, and built to last a week on a charge. Track 100+ workouts, sleep, and stress with a bright AMOLED on your wrist.',
    specs: [
      { label: 'Case', value: 'Aluminium' },
      { label: 'Display', value: 'AMOLED' },
      { label: 'Battery', value: '7 days' },
      { label: 'GPS', value: 'Built-in' },
      { label: 'Water', value: '50 m / 5 ATM' },
      { label: 'Workouts', value: '100+ modes' },
    ],
    highlights: ['7-day battery', '100+ workouts', 'Sleep tracking'],
  },
]

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getRelated(product: Product): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
