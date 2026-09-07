import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Shell } from '@/components/site/shell'
import { ProductDetail } from '@/components/products/product-detail'
import { getProduct, getRelated, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: 'Product not found — VOLTARA' }
  return {
    title: `${product.name} — VOLTARA`,
    description: product.blurb,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()
  const related = getRelated(product)

  return (
    <Shell>
      <ProductDetail product={product} related={related} />
    </Shell>
  )
}
