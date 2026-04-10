'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createProperty } from '../../actions'

export default function NewPropertyPage() {
  const [state, action, pending] = useActionState(createProperty, null)

  return (
    <div className="max-w-md">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-8 group text-xs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
        Retour
      </Link>

      <h1 className="text-2xl font-bold text-white tracking-tight mb-1.5">Nouveau logement</h1>
      <p className="text-white/30 text-sm mb-8">Vous pourrez configurer les cartes ensuite.</p>

      <div className="bg-surface border border-white/[0.07] rounded-2xl p-8">
        <form action={action} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="name">
              Nom du logement <span className="text-red-400/70">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-surface-hi border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150"
              placeholder="Studio Paris 11e"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="description">
              Description <span className="text-white/15">(optionnel)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full bg-surface-hi border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150 resize-none"
              placeholder="Appartement lumineux au cœur de Paris…"
            />
          </div>

          {state?.error && (
            <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-xs">{state.error}</p>
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.18)] hover:shadow-[0_0_28px_rgba(121,113,255,0.28)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
            >
              {pending ? 'Création…' : 'Créer le logement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
