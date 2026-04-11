'use client'

import { useActionState } from 'react'
import { registerWithInvite } from '@/app/invite/actions'

export function RegisterForm({
  inviteToken,
  stripeSessionId,
  defaultEmail,
}: {
  inviteToken: string
  stripeSessionId?: string
  defaultEmail?: string
}) {
  const [state, action, pending] = useActionState(registerWithInvite, null)

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="inviteToken" value={inviteToken} />
      {stripeSessionId && <input type="hidden" name="stripeSessionId" value={stripeSessionId} />}

      <div>
        <label className="block text-xs font-medium text-white/40 mb-2">Prénom</label>
        <input
          name="name" type="text" required autoComplete="given-name"
          className="w-full bg-[#141421] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all"
          placeholder="Marie"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-white/40 mb-2">Email</label>
        <input
          name="email" type="email" required autoComplete="email"
          defaultValue={defaultEmail}
          className="w-full bg-[#141421] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all"
          placeholder="vous@example.com"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-white/40 mb-2">Mot de passe</label>
        <input
          name="password" type="password" required autoComplete="new-password"
          className="w-full bg-[#141421] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#7971FF]/60 transition-all"
          placeholder="8 caractères minimum"
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
          className="w-full bg-[#7971FF] text-white font-semibold py-3 rounded-xl hover:bg-[#8880ff] transition-all shadow-[0_0_20px_rgba(121,113,255,0.18)] hover:shadow-[0_0_28px_rgba(121,113,255,0.28)] disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {pending ? 'Création…' : 'Créer mon compte'}
        </button>
      </div>
    </form>
  )
}
