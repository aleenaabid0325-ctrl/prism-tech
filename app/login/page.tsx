import type { Metadata } from 'next'
import { Shell } from '@/components/site/shell'
import { AuthView } from '@/components/store/auth-view'

export const metadata: Metadata = { title: 'Sign in — VOLTARA' }

export default function LoginPage() {
  return (
    <Shell>
      <AuthView />
    </Shell>
  )
}
