'use client'

import { useState, useTransition } from 'react'
import { toggleCard } from '@/app/dashboard/actions'

interface ToggleCardButtonProps {
  propertyId: string
  type: string
  enabled: boolean
}

export function ToggleCardButton({ propertyId, type, enabled }: ToggleCardButtonProps) {
  const [isEnabled, setIsEnabled] = useState(enabled)
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    const next = !isEnabled
    setIsEnabled(next)
    startTransition(() => { toggleCard(propertyId, type, next) })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      title={isEnabled ? 'Désactiver' : 'Activer'}
      className={`w-10 h-5 rounded-full transition-all duration-200 relative disabled:opacity-40 flex-shrink-0 ${
        isEnabled
          ? 'bg-accent shadow-[0_0_8px_rgba(121,113,255,0.35)]'
          : 'bg-white/[0.1]'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          isEnabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}
