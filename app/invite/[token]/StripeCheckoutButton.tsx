'use client'

import { useState } from 'react'

export function StripeCheckoutButton({ inviteToken }: { inviteToken: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteToken }),
      })
      const { url, error } = await res.json()
      if (error) { alert(error); setLoading(false); return }
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-[#8880ff] transition-all shadow-[0_0_20px_rgba(121,113,255,0.18)] hover:shadow-[0_0_28px_rgba(121,113,255,0.28)] disabled:opacity-40 disabled:cursor-not-allowed text-sm"
    >
      {loading ? 'Redirection…' : 'Procéder au paiement'}
    </button>
  )
}
