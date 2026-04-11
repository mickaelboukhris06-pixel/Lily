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
      accentClass="bg-amber-500/[0.08] border border-amber-500/[0.18] text-amber-400"
      iconPath="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"
    >
      <div className="space-y-3">
        {data.checkOutTime && (
          <div className="bg-[#0C0C14] border border-white/[0.07] px-5 py-4 flex items-center gap-3">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 flex-shrink-0">
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
          <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{data.instructions}</p>
        </Card>

        {data.photos && data.photos.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-3 px-1">Photos</p>
            <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
              {data.photos.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-64 h-44 object-cover flex-shrink-0 snap-start border border-white/[0.07]"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </GuestShell>
  )
}
