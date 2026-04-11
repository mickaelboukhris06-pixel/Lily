'use client'

import { useState } from 'react'

export function StripeCheckoutButton({ inviteToken }: { inviteToken: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteToken }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }
      if (!data.url) {
        setError('Aucune URL de paiement reçue.')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur réseau.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-[#8880ff] transition-all shadow-[0_0_20px_rgba(121,113,255,0.18)] hover:shadow-[0_0_28px_rgba(121,113,255,0.28)] disabled:opacity-40 disabled:cursor-not-allowed text-sm"
      >
        {loading ? 'Chargement…' : 'Procéder au paiement'}
      </button>
      {error && (
        <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl px-4 py-3">
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </div>
  )
}
