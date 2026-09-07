'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import { Scene3D } from '@/components/three/scene'
import { cn } from '@/lib/utils'

export function AuthView() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-6">
      <div className="glass-strong grid overflow-hidden rounded-[2rem] lg:grid-cols-2">
        {/* 3D side */}
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-accent/25" />
          <div className="pointer-events-none absolute inset-12 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <div>
              <span className="font-display text-lg font-bold">VOLTARA</span>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Sign in to sync your devices, track orders, and unlock members-only drops.
              </p>
            </div>
            <div className="relative h-72">
              <Scene3D type="watch" color="#c9d2e3" accent="#8b5cf6" interactive autoRotate />
            </div>
          </div>
        </div>

        {/* Form side */}
        <div className="p-6 sm:p-10">
          <div className="glass inline-flex rounded-2xl p-1">
            <button
              onClick={() => setMode('signin')}
              className={cn(
                'rounded-xl px-5 py-2 text-sm font-semibold transition-colors',
                mode === 'signin' ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' : 'text-muted-foreground',
              )}
            >
              Sign in
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                'rounded-xl px-5 py-2 text-sm font-semibold transition-colors',
                mode === 'signup' ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground' : 'text-muted-foreground',
              )}
            >
              Create account
            </button>
          </div>

          <h1 className="mt-8 font-display text-3xl font-bold">
            {mode === 'signin' ? 'Welcome back' : 'Join VOLTARA'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'signin'
              ? 'Enter your details to access your account.'
              : 'Create an account to start your collection.'}
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            {mode === 'signup' && (
              <IconField icon={User} label="Full name" placeholder="Ada Lovelace" required />
            )}
            <IconField icon={Mail} label="Email" type="email" placeholder="you@email.com" required />
            <IconField icon={Lock} label="Password" type="password" placeholder="••••••••" required />

            {mode === 'signin' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="accent-primary" /> Remember me
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              {mode === 'signin' ? 'Sign in' : 'Create account'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-semibold text-primary hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>

          <Link href="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">
            Continue as guest
          </Link>
        </div>
      </div>
    </div>
  )
}

function IconField({
  icon: Icon,
  label,
  ...props
}: { icon: React.ElementType; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="glass mt-1.5 flex items-center gap-3 rounded-xl px-4 focus-within:ring-2 focus-within:ring-ring">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <input
          {...props}
          className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
        />
      </div>
    </label>
  )
}
