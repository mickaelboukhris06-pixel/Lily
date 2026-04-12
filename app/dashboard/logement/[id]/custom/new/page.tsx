'use client'

import { useActionState } from 'react'
import { createCustomCard } from '@/app/dashboard/actions'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function NewCustomCardPage() {
  const { id } = useParams<{ id: string }>()
  const [state, action, pending] = useActionState(createCustomCard, null)

  return (
    <div className="max-w-md">
      <Link
        href={`/dashboard/logement/${id}`}
        className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-8 group text-xs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
        Retour
      </Link>

      <h1 className="text-2xl font-bold text-white tracking-tight mb-1.5">Nouvelle carte</h1>
      <p className="text-white/30 text-sm mb-8">Créez une carte personnalisée pour ce logement.</p>

      <div className="bg-[#0C0C14] border border-white/[0.09] p-8">
        <form action={action} className="space-y-5">
          <input type="hidden" name="propertyId" value={id} />
          <div className="flex gap-3">
            <div className="w-20">
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide">Emoji</label>
              <input
                name="emoji"
                type="text"
                maxLength={2}
                placeholder="🏠"
                className="w-full bg-[#111118] border border-white/[0.08] px-3 py-3 text-white text-center text-lg focus:outline-none focus:border-accent/60 transition-all duration-150"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide">
                Titre <span className="text-red-400/70">*</span>
              </label>
              <input
                name="title"
                type="text"
                required
                autoFocus
                placeholder="Domotique, Piscine, Barbecue…"
                className="w-full bg-[#111118] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150"
              />
            </div>
          </div>

          {state?.error && (
            <div className="bg-red-500/[0.07] border border-red-500/20 px-4 py-3">
              <p className="text-red-400 text-xs">{state.error}</p>
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-accent text-white font-semibold py-3 hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.25)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
            >
              {pending ? 'Création…' : 'Créer la carte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
