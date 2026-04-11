import { getGuestProperty, getCardData } from '@/lib/guest'
import { CARD_CONFIGS } from '@/lib/cards'
import type { CheckinData, WifiData, ContactData } from '@/lib/cards'
import { CopyButton } from './components/CopyButton'
import Link from 'next/link'

const SECONDARY_ORDER = ['checkout', 'rules', 'transport', 'tips', 'contact']

export default async function GuestHomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)

  const checkinData = getCardData<CheckinData>(property, 'checkin')
  const wifiData = getCardData<WifiData>(property, 'wifi')
  const contactData = getCardData<ContactData>(property, 'contact')

  const navCards = SECONDARY_ORDER.filter((type) =>
    property.cards.some((c) => c.type === type && c.enabled)
  )

  const coverPhoto = property.coverPhoto ?? null

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
      {/* Dark overlay when cover photo is set */}
      {coverPhoto && (
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}

      {/* Ambient glow (only without cover photo) */}
      {!coverPhoto && (
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.04)_0%,transparent_65%)]" />
        </div>
      )}

      <div className="relative z-10 max-w-xl mx-auto px-5 pt-12 pb-28">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="mb-10">
          <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.22em] mb-3">Votre séjour</p>
          <h1 className="text-[30px] font-bold text-white leading-tight tracking-tight">{property.name}</h1>
          {property.description && (
            <p className="text-white/35 mt-2.5 text-[14px] leading-relaxed">{property.description}</p>
          )}
        </div>

        {/* ── Check-in inline ───────────────────────────────── */}
        {checkinData && (
          <div className="mb-3">
            <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden">

              {/* Section header */}
              <div className="px-5 pt-4 pb-3.5 flex items-center gap-2.5 border-b border-white/[0.05]">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/[0.18] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </div>
                <span className="text-[11px] font-semibold text-white/45">Check-in</span>
                {checkinData.checkInTime && (
                  <span className="ml-auto text-[11px] text-white/25 font-medium">
                    À partir de {checkinData.checkInTime}
                  </span>
                )}
              </div>

              {/* Access code */}
              {checkinData.code && (
                <div className="px-5 py-5">
                  <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-3">
                    Code d'accès
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-white text-[38px] font-bold font-mono tracking-[0.22em] leading-none">
                      {checkinData.code}
                    </p>
                    <CopyButton value={checkinData.code} />
                  </div>
                </div>
              )}

              {/* Instructions excerpt */}
              {checkinData.instructions && (
                <div className="px-5 pb-5 border-t border-white/[0.05] pt-4">
                  <p className="text-white/50 text-[13px] leading-relaxed line-clamp-2">
                    {checkinData.instructions}
                  </p>
                  <Link
                    href={`/g/${token}/checkin`}
                    className="inline-flex items-center gap-1 text-[11px] text-white/25 hover:text-white/50 transition-colors mt-2.5"
                  >
                    Voir toutes les instructions
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Wi-Fi inline ──────────────────────────────────── */}
        {wifiData && (
          <div className="mb-8">
            <div className="bg-surface border border-white/[0.07] rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/[0.18] flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.18em] mb-1">Wi-Fi</p>
                <p className="text-white text-[13px] font-semibold truncate">{wifiData.ssid}</p>
                <p className="text-white/30 text-[12px] font-mono mt-0.5 truncate">{wifiData.password}</p>
              </div>
              <CopyButton value={wifiData.password} />
            </div>
          </div>
        )}

        {/* ── Navigation cards ──────────────────────────────── */}
        {navCards.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.22em] mb-3">
              Informations
            </p>
            <div className="space-y-2">
              {navCards.map((type) => {
                const config = CARD_CONFIGS[type as keyof typeof CARD_CONFIGS]
                return (
                  <Link
                    key={type}
                    href={`/g/${token}/${config.route}`}
                    className="flex items-center gap-4 bg-surface border border-white/[0.07] rounded-2xl px-5 py-4 hover:border-white/[0.13] hover:bg-surface-hi active:scale-[0.99] transition-all duration-150 group"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${config.accentClass}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={config.iconPath} />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-[13px]">{config.label}</p>
                      <p className="text-white/30 text-xs mt-0.5">{config.subtitle}</p>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/15 group-hover:text-white/35 transition-colors duration-200 flex-shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!checkinData && !wifiData && navCards.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/20 text-sm">Aucune information disponible pour l'instant.</p>
          </div>
        )}
      </div>

      {/* ── Sticky contact bar ────────────────────────────────── */}
      {contactData?.phone && (
        <div className="fixed bottom-0 left-0 right-0 z-20 px-5 pb-6 pt-4 bg-gradient-to-t from-base via-base/90 to-transparent">
          <a
            href={`tel:${contactData.phone}`}
            className="flex items-center justify-center gap-2.5 w-full max-w-xl mx-auto bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.09] active:scale-[0.99] rounded-2xl py-4 transition-all duration-150"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/55">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.12h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-white/65 text-[13px] font-semibold">
              Contacter {contactData.name}
            </span>
          </a>
        </div>
      )}
    </main>
  )
}
