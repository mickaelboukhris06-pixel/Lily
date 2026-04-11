import { getGuestProperty, getCardData } from '@/lib/guest'
import { CARD_CONFIGS, CARD_ORDER } from '@/lib/cards'
import type { CheckinData, WifiData, ContactData } from '@/lib/cards'
import { CopyButton } from './components/CopyButton'
import Link from 'next/link'

export default async function GuestHomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)

  const checkinData = getCardData<CheckinData>(property, 'checkin')
  const wifiData = getCardData<WifiData>(property, 'wifi')
  const contactData = getCardData<ContactData>(property, 'contact')

  const enabledCards = CARD_ORDER.filter((type) =>
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
      {coverPhoto && (
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      )}

      {!coverPhoto && (
        <div className="fixed inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.04)_0%,transparent_65%)]" />
        </div>
      )}

      <div className="relative z-10 max-w-xl mx-auto px-4 pt-12 pb-32">

        {/* ── Header ── */}
        <div className="mb-8 px-1">
          <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.22em] mb-2">Votre séjour</p>
          <h1 className="text-[28px] font-bold text-white leading-tight tracking-tight">{property.name}</h1>
          {property.description && (
            <p className="text-white/35 mt-2 text-[13px] leading-relaxed">{property.description}</p>
          )}
        </div>

        {/* ── Cards grid ── */}
        {enabledCards.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {enabledCards.map((type) => {
              const config = CARD_CONFIGS[type as keyof typeof CARD_CONFIGS]

              // ── Check-in card ──
              if (type === 'checkin' && checkinData) {
                return (
                  <Link
                    key={type}
                    href={`/g/${token}/checkin`}
                    className="col-span-2 bg-surface border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.13] active:scale-[0.99] transition-all duration-150 group"
                  >
                    <div className="px-5 pt-4 pb-3 flex items-center gap-2.5 border-b border-white/[0.05]">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border ${config.accentClass}`}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={config.iconPath} />
                        </svg>
                      </div>
                      <span className="text-[11px] font-semibold text-white/45">{config.label}</span>
                      {checkinData.checkInTime && (
                        <span className="ml-auto text-[11px] text-white/25 font-medium">À partir de {checkinData.checkInTime}</span>
                      )}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0 ml-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    {checkinData.code ? (
                      <div className="px-5 py-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.18em] mb-1.5">Code d'accès</p>
                          <p className="text-white text-[36px] font-bold font-mono tracking-[0.22em] leading-none">{checkinData.code}</p>
                        </div>
                        <CopyButton value={checkinData.code} />
                      </div>
                    ) : checkinData.instructions ? (
                      <div className="px-5 py-4">
                        <p className="text-white/45 text-[13px] leading-relaxed line-clamp-2">{checkinData.instructions}</p>
                      </div>
                    ) : null}
                  </Link>
                )
              }

              // ── Wi-Fi card ──
              if (type === 'wifi' && wifiData) {
                return (
                  <Link
                    key={type}
                    href={`/g/${token}/wifi`}
                    className="bg-surface border border-white/[0.07] rounded-2xl p-4 flex flex-col gap-3 hover:border-white/[0.13] active:scale-[0.99] transition-all duration-150 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${config.accentClass}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={config.iconPath} />
                        </svg>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/40 transition-colors">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-1">{config.label}</p>
                      <p className="text-white text-[13px] font-semibold truncate">{wifiData.ssid}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <p className="text-white/25 text-[11px] font-mono truncate flex-1">{wifiData.password}</p>
                        <CopyButton value={wifiData.password} />
                      </div>
                    </div>
                  </Link>
                )
              }

              // ── Generic cards ──
              return (
                <Link
                  key={type}
                  href={`/g/${token}/${config.route}`}
                  className="bg-surface border border-white/[0.07] rounded-2xl p-4 flex flex-col gap-3 hover:border-white/[0.13] active:scale-[0.99] transition-all duration-150 group"
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${config.accentClass}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={config.iconPath} />
                      </svg>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/40 transition-colors">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-0.5">{config.label}</p>
                    <p className="text-white/60 text-[12px] leading-snug">{config.subtitle}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {enabledCards.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/20 text-sm">Aucune information disponible pour l'instant.</p>
          </div>
        )}
      </div>

      {/* ── Sticky contact bar ── */}
      {contactData?.phone && (
        <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-6 pt-4 bg-gradient-to-t from-base via-base/90 to-transparent">
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
