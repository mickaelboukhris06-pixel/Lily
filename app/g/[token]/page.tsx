import { getGuestProperty, getCardData } from '@/lib/guest'
import { CARD_CONFIGS, CARD_ORDER } from '@/lib/cards'
import type { CheckinData, WifiData, ContactData } from '@/lib/cards'
import { CopyButton } from './components/CopyButton'
import Link from 'next/link'

export default async function GuestHomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)

  const checkinData  = getCardData<CheckinData>(property, 'checkin')
  const wifiData     = getCardData<WifiData>(property, 'wifi')
  const contactData  = getCardData<ContactData>(property, 'contact')

  const coverPhoto = property.coverPhoto ?? null

  // Cards to show in the grid (excluding checkin/wifi which get custom treatment)
  const gridCards = CARD_ORDER.filter((type) =>
    type !== 'checkin' && type !== 'wifi' &&
    property.cards.some((c) => c.type === type && c.enabled)
  )

  const hasCheckin = property.cards.some((c) => c.type === 'checkin' && c.enabled)
  const hasWifi    = property.cards.some((c) => c.type === 'wifi'    && c.enabled)

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={coverPhoto ? {
        backgroundImage: `url(${coverPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#08080C',
      } : { backgroundColor: '#08080C' }}
    >
      {coverPhoto && (
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/90 to-transparent" />
        </div>
      )}
      {!coverPhoto && (
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.05)_0%,transparent_65%)]" />
        </div>
      )}

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-14 pb-36 space-y-3">

        {/* ── Header ── */}
        <div className="px-1 pb-4">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.25em] mb-2">Votre séjour</p>
          <h1 className="text-[32px] font-bold text-white leading-[1.1] tracking-tight">{property.name}</h1>
          {property.description && (
            <p className="text-white/40 mt-2.5 text-sm leading-relaxed">{property.description}</p>
          )}
        </div>

        {/* ── Check-in ── */}
        {hasCheckin && (
          <Link
            href={`/g/${token}/checkin`}
            className="block bg-[#0F1A15] border border-emerald-500/20 rounded-3xl overflow-hidden hover:border-emerald-500/35 active:scale-[0.99] transition-all duration-150 group"
          >
            {/* Header row */}
            <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-emerald-500/10">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </div>
              <span className="text-[12px] font-semibold text-emerald-400/70 tracking-wide">Check-in</span>
              {checkinData?.checkInTime && (
                <span className="ml-auto text-[11px] text-white/30 font-medium">À partir de {checkinData.checkInTime}</span>
              )}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/40 transition-colors ml-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>

            {/* Code */}
            {checkinData?.code ? (
              <div className="px-5 py-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-emerald-500/40 uppercase tracking-[0.2em] mb-2">Code d'accès</p>
                  <p className="text-white text-[42px] font-bold font-mono tracking-[0.25em] leading-none">{checkinData.code}</p>
                </div>
                <CopyButton value={checkinData.code} />
              </div>
            ) : checkinData?.instructions ? (
              <div className="px-5 py-4">
                <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{checkinData.instructions}</p>
                <p className="text-emerald-500/50 text-xs mt-2 font-medium">Voir toutes les instructions →</p>
              </div>
            ) : null}
          </Link>
        )}

        {/* ── Wi-Fi ── */}
        {hasWifi && wifiData && (
          <Link
            href={`/g/${token}/wifi`}
            className="block bg-[#0D1520] border border-blue-500/20 rounded-3xl px-5 py-5 hover:border-blue-500/35 active:scale-[0.99] transition-all duration-150 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                  </svg>
                </div>
                <span className="text-[12px] font-semibold text-blue-400/70 tracking-wide">Wi-Fi</span>
              </div>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/40 transition-colors">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="text-white font-semibold text-[15px] truncate">{wifiData.ssid}</p>
                <p className="text-white/30 text-[13px] font-mono mt-0.5 truncate">{wifiData.password}</p>
              </div>
              <CopyButton value={wifiData.password} />
            </div>
          </Link>
        )}

        {/* ── Grid 2×2 ── */}
        {gridCards.length > 0 && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            {gridCards.map((type) => {
              const config = CARD_CONFIGS[type as keyof typeof CARD_CONFIGS]

              const accentMap: Record<string, { bg: string; border: string; icon: string; label: string }> = {
                checkout:  { bg: 'bg-[#1A1500]', border: 'border-amber-500/20',  icon: 'text-amber-400',  label: 'text-amber-400/70'  },
                rules:     { bg: 'bg-[#1A1A00]', border: 'border-yellow-500/20', icon: 'text-yellow-400', label: 'text-yellow-400/70' },
                transport: { bg: 'bg-[#001A1A]', border: 'border-cyan-500/20',   icon: 'text-cyan-400',   label: 'text-cyan-400/70'   },
                tips:      { bg: 'bg-[#1A0A10]', border: 'border-rose-500/20',   icon: 'text-rose-400',   label: 'text-rose-400/70'   },
                contact:   { bg: 'bg-[#12001A]', border: 'border-violet-500/20', icon: 'text-violet-400', label: 'text-violet-400/70' },
              }
              const accent = accentMap[type] ?? { bg: 'bg-surface', border: 'border-white/[0.07]', icon: 'text-white/50', label: 'text-white/30' }

              return (
                <Link
                  key={type}
                  href={`/g/${token}/${config.route}`}
                  className={`${accent.bg} border ${accent.border} rounded-3xl p-5 flex flex-col gap-4 hover:brightness-110 active:scale-[0.98] transition-all duration-150 group`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={accent.icon}>
                        <path d={config.iconPath} />
                      </svg>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/40 transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-[11px] font-bold uppercase tracking-[0.15em] mb-1 ${accent.label}`}>{config.label}</p>
                    <p className="text-white/50 text-[12px] leading-snug">{config.subtitle}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </div>

      {/* ── Sticky contact bar ── */}
      {contactData?.phone && (
        <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-7 pt-6 bg-gradient-to-t from-[#08080C] via-[#08080C]/80 to-transparent">
          <a
            href={`tel:${contactData.phone}`}
            className="flex items-center justify-center gap-2.5 w-full max-w-lg mx-auto bg-white/[0.07] border border-white/[0.10] hover:bg-white/[0.10] active:scale-[0.99] rounded-2xl py-4 transition-all duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.12h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-white/60 text-[13px] font-semibold">Contacter {contactData.name}</span>
          </a>
        </div>
      )}
    </main>
  )
}
