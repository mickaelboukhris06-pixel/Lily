import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { CheckoutData } from '@/lib/cards'
import { GuestShell, Card } from '../components/GuestShell'

export default async function CheckoutPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<CheckoutData>(property, 'checkout')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Check-out"
      title="Départ"
      subtitle="Procédure de départ simplifiée."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"
    >
      <div className="space-y-3">
        {data.checkOutTime && (
          <div className="bg-surface border border-white/[0.07] rounded-2xl px-5 py-4 flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <div>
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-0.5">Heure de check-out</p>
              <p className="text-white text-sm font-semibold">{data.checkOutTime}</p>
            </div>
          </div>
        )}
        <Card>
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-4">Instructions</p>
          <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{data.instructions}</p>
        </Card>
      </div>
    </GuestShell>
  )
}
