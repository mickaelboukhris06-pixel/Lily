'use client'

import { useActionState } from 'react'
import { createInvitation } from './actions'

export function InvitationForm() {
  const [state, action, pending] = useActionState(createInvitation, null)

  const appUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const inviteLink = state?.token ? `${appUrl}/invite/${state.token}` : null

  return (
    <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
      <h2 className="text-[14px] font-semibold text-white mb-1">Nouvelle invitation</h2>
      <p className="text-white/30 text-xs mb-5">Envoyez un lien d'accès à un propriétaire.</p>

      {inviteLink ? (
        <div className="space-y-4">
          <div className="bg-emerald-500/[0.07] border border-emerald-500/20 rounded-xl px-4 py-3">
            <p className="text-emerald-400 text-xs font-medium mb-1">Invitation créée</p>
            <p className="text-white/60 text-xs break-all">{inviteLink}</p>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(inviteLink)}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copier le lien
          </button>
        </div>
      ) : (
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2">Email (optionnel)</label>
            <input
              name="email"
              type="email"
              placeholder="locataire@example.com"
              className="w-full bg-[#141421] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2">Plan</label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5 cursor-pointer hover:border-white/[0.14] transition-colors has-[:checked]:border-accent/40 has-[:checked]:bg-accent/[0.05]">
                <input type="radio" name="plan" value="free" defaultChecked className="mt-0.5 accent-[#7971FF]" />
                <div>
                  <p className="text-white text-xs font-semibold">Gratuit</p>
                  <p className="text-white/30 text-[11px] mt-0.5">2 logements max</p>
                </div>
              </label>
              <label className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl p-3.5 cursor-pointer hover:border-white/[0.14] transition-colors has-[:checked]:border-accent/40 has-[:checked]:bg-accent/[0.05]">
                <input type="radio" name="plan" value="paid" className="mt-0.5 accent-[#7971FF]" />
                <div>
                  <p className="text-white text-xs font-semibold">Payant</p>
                  <p className="text-white/30 text-[11px] mt-0.5">Logements illimités</p>
                </div>
              </label>
            </div>
          </div>

          {state?.error && (
            <p className="text-red-400 text-xs">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-accent text-white font-semibold py-2.5 rounded-xl hover:bg-[#8880ff] transition-all text-xs disabled:opacity-40 shadow-[0_0_12px_rgba(121,113,255,0.18)]"
          >
            {pending ? 'Création…' : 'Créer le lien d\'invitation'}
          </button>
        </form>
      )}
    </div>
  )
}
