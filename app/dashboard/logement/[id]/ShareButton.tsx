'use client'

import { useState } from 'react'
import { generateGuestToken } from '@/app/dashboard/actions'

interface ShareButtonProps {
  propertyId: string
  existingToken: string | null
}

export function ShareButton({ propertyId, existingToken }: ShareButtonProps) {
  const [token, setToken] = useState<string | null>(existingToken)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)

  const guestUrl = token
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/g/${token}`
    : null

  async function handleGenerate() {
    setLoading(true)
    const result = await generateGuestToken(propertyId)
    if (result?.token) setToken(result.token)
    setLoading(false)
  }

  async function handleCopy() {
    if (!guestUrl) return
    await navigator.clipboard.writeText(guestUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!token) {
    return (
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-accent text-white font-semibold px-4 py-2 text-xs transition-all duration-200 hover:bg-[#8880ff] disabled:opacity-40 shadow-[0_0_14px_rgba(121,113,255,0.2)] flex-shrink-0"
      >
        {loading ? 'Génération…' : 'Générer le lien'}
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <code className="text-[11px] text-white/30 bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 font-mono truncate max-w-[180px]">
        /g/{token}
      </code>
      <button
        onClick={handleCopy}
        className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 transition-all duration-200 border ${
          copied
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.09] hover:text-white/70 border-white/[0.07]'
        }`}
      >
        {copied ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Copié
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copier
          </>
        )}
      </button>
    </div>
  )
}
