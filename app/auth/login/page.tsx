'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '../actions'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const errorMessages: Record<string, string> = {
  google_cancelled: 'Connexion Google annulée.',
  invalid_state: 'Requête invalide, réessayez.',
  token_exchange_failed: 'Erreur Google, réessayez.',
  profile_fetch_failed: 'Impossible de récupérer le profil Google.',
  missing_profile: 'Profil Google incomplet.',
}

function GoogleError() {
  const params = useSearchParams()
  const err = params.get('error')
  const msg = params.get('msg')
  if (!err) return null
  const label = errorMessages[err] ?? `Erreur : ${err}${msg ? ` — ${decodeURIComponent(msg)}` : ''}`
  return (
    <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl px-4 py-3 mb-4">
      <p className="text-red-400 text-xs">{label}</p>
    </div>
  )
}

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null)

  return (
    <main className="min-h-screen bg-[#08080C] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.06)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[360px]">
        <Link href="/" className="flex items-center justify-center mb-10">
          <span className="text-[15px] font-semibold tracking-[0.07em] text-white">lily</span>
        </Link>

        <div className="bg-[#0F0F15] border border-white/[0.07] rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
          <div className="mb-7">
            <h1 className="text-[22px] font-bold text-white tracking-tight mb-1.5">Connexion</h1>
            <p className="text-white/35 text-sm">Accédez à votre espace propriétaire.</p>
          </div>

          <Suspense fallback={null}>
            <GoogleError />
          </Suspense>

          {/* Google */}
          <a
            href="/api/auth/google"
            className="w-full flex items-center justify-center gap-2.5 bg-white text-[#1a1a1a] font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150 text-sm mb-5"
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
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" required autoComplete="email"
                className="w-full bg-[#141421] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all duration-150"
                placeholder="vous@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="password">Mot de passe</label>
              <input
                id="password" name="password" type="password" required autoComplete="current-password"
                className="w-full bg-[#141421] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all duration-150"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-xs">{state.error}</p>
              </div>
            )}

            <div className="pt-1">
              <button
                type="submit" disabled={pending}
                className="w-full bg-[#7971FF] text-white font-semibold py-3 rounded-xl hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.18)] hover:shadow-[0_0_28px_rgba(121,113,255,0.28)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
              >
                {pending ? 'Connexion…' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          Pas encore de compte ?{' '}
          <Link href="/auth/register" className="text-white/50 hover:text-white transition-colors duration-150">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  )
}
