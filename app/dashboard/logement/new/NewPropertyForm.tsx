'use client'

import { useActionState } from 'react'
import { createProperty } from '../../actions'

export function NewPropertyForm() {
  const [state, action, pending] = useActionState(createProperty, null)

  return (
    <div className="bg-[#0C0C14] border border-white/[0.09] p-8">
      <form action={action} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="name">
            Nom du logement <span className="text-red-400/70">*</span>
          </label>
          <input
            id="name" name="name" type="text" required
            className="w-full bg-[#111118] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150"
            placeholder="Studio Paris 11e"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor="description">
            Description <span className="text-white/15">(optionnel)</span>
          </label>
          <textarea
            id="description" name="description" rows={3}
            className="w-full bg-[#111118] border border-white/[0.08] px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150 resize-none"
            placeholder="Appartement lumineux au coeur de Paris…"
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
            className="w-full bg-accent text-white font-semibold py-3 hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.25)] hover:shadow-[0_0_32px_rgba(121,113,255,0.35)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
          >
            {pending ? 'Création…' : 'Créer le logement'}
          </button>
        </div>
      </form>
    </div>
  )
}
