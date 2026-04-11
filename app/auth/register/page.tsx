'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { register } from '../actions'

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, null)

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Top-left halo */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[700px] h-[600px] z-0"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(160,148,255,0.45) 0%, rgba(100,160,255,0.20) 35%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[360px]">
        <Link href="/" className="flex items-center justify-center mb-10">
          <span className="text-[15px] font-bold tracking-[0.07em] text-white">lily</span>
        </Link>

        <div className="bg-[#0C0C14] border border-white/[0.09] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="mb-7">
            <h1 className="text-[22px] font-bold text-white tracking-tight mb-1.5">Créer un compte</h1>
            <p className="text-white/35 text-sm">Commencez à configurer votre logement.</p>
          </div>

          {/* Google */}
          <a
            href="/api/auth/google"
            className="w-full flex items-center justify-center gap-2.5 bg-white text-[#1a1a1a] font-semibold py-2.5 hover:bg-slate-100 transition-colors duration-150 text-sm mb-5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </a>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-white/20 text-xs">ou</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          <form action={action} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="name">Prénom</label>
              <input
                id="name" name="name" type="text" required autoComplete="given-name"
                className="w-full bg-[#111118] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all duration-150"
                placeholder="Marie"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                className="w-full bg-[#111118] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all duration-150"
                placeholder="vous@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="password">Mot de passe</label>
              <input
                id="password" name="password" type="password" required autoComplete="new-password"
                className="w-full bg-[#111118] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all duration-150"
                placeholder="8 caractères minimum"
              />
            </div>

            {state?.error && (
              <div className="bg-red-500/[0.07] border border-red-500/20 px-4 py-3">
                <p className="text-red-400 text-xs">{state.error}</p>
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit" disabled={pending}
                className="w-full bg-[#7971FF] text-white font-semibold py-3 hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.25)] hover:shadow-[0_0_32px_rgba(121,113,255,0.35)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
              >
                {pending ? 'Création…' : 'Créer mon compte'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="text-white/50 hover:text-white transition-colors duration-150">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  )
}
