import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { CheckinData } from '@/lib/cards'
import { GuestShell, Card } from '../components/GuestShell'
import { CopyButton } from '../components/CopyButton'

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
      accentClass="bg-emerald-500/[0.08] border border-emerald-500/[0.18] text-emerald-400"
      iconPath="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
    >
      <div className="space-y-3">

        {data.checkInTime && (
          <div className="bg-[#0C0C14] border border-white/[0.07] px-5 py-4 flex items-center gap-3">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 flex-shrink-0">
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
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em]">Code d'accès</p>
              <CopyButton value={data.code} />
            </div>
            <p className="text-white text-[42px] font-bold font-mono tracking-[0.22em] leading-none">
              {data.code}
            </p>
          </Card>
        )}

        {data.keyLocation && (
          <Card>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Localisation de la clé</p>
            <p className="text-white text-sm font-semibold leading-relaxed">{data.keyLocation}</p>
          </Card>
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
