'use client'

import { useTransition } from 'react'
import { toggleCustomCard } from '@/app/dashboard/actions'

export function ToggleCustomCardButton({ cardId, enabled }: { cardId: string; enabled: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => toggleCustomCard(cardId, !enabled))}
      className={`relative w-9 h-5 transition-colors duration-200 flex-shrink-0 disabled:opacity-40 ${
        enabled ? 'bg-accent' : 'bg-white/[0.10]'
      }`}
      title={enabled ? 'Désactiver' : 'Activer'}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white transition-all duration-200 ${
          enabled ? 'left-[18px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}
