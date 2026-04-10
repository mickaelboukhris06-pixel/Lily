import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { CheckinData } from '@/lib/cards'
import { GuestShell, Card, Divider } from '../components/GuestShell'

export default async function CheckinPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<CheckinData>(property, 'checkin')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Check-in"
      title="Arrivée"
      subtitle="Tout ce qu'il faut savoir pour entrer."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
    >
      <div className="space-y-3">
        {data.checkInTime && (
          <div className="bg-surface border border-white/[0.07] rounded-2xl px-5 py-4 flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <div>
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-0.5">Heure de check-in</p>
              <p className="text-white text-sm font-semibold">{data.checkInTime}</p>
            </div>
          </div>
        )}

        {data.code && (
          <Card>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-3">Code d'accès</p>
            <p className="text-white text-4xl font-bold font-mono tracking-[0.18em]">{data.code}</p>
          </Card>
        )}

        {data.keyLocation && (
          <Card>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Localisation de la clé</p>
            <p className="text-white text-sm font-semibold">{data.keyLocation}</p>
          </Card>
        )}

        <Card>
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-4">Instructions</p>
          <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{data.instructions}</p>
        </Card>
      </div>
    </GuestShell>
  )
}
