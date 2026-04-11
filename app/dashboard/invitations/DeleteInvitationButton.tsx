'use client'

import { useTransition } from 'react'
import { deleteInvitation } from './actions'

export function DeleteInvitationButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => deleteInvitation(id))}
      disabled={pending}
      className="text-white/20 hover:text-red-400/70 transition-colors disabled:opacity-40"
      title="Supprimer"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  )
}
