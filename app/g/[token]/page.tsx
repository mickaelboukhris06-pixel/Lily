import { getGuestProperty } from '@/lib/guest'
import { CARD_CONFIGS, CARD_ORDER } from '@/lib/cards'
import Link from 'next/link'

export default async function GuestHomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)

  const enabledTypes = CARD_ORDER.filter((type) =>
    property.cards.some((c) => c.type === type && c.enabled)
  )

  return (
    <main className="min-h-screen bg-base relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-5 pt-14 pb-20">
        {/* Welcome header */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-4">Bienvenue</p>
          <h1 className="text-[34px] font-bold text-white leading-tight tracking-tight">{property.name}</h1>
          {property.description && (
            <p className="text-white/35 mt-3 text-[15px] leading-relaxed">{property.description}</p>
          )}
        </div>

        {/* Cards */}
        {enabledTypes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/20 text-sm">Aucune information disponible pour l'instant.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {enabledTypes.map((type) => {
              const config = CARD_CONFIGS[type]
              return (
                <Link
                  key={type}
                  href={`/g/${token}/${config.route}`}
                  className="flex items-center gap-4 bg-surface border border-white/[0.07] rounded-2xl px-5 py-4 hover:border-white/[0.13] hover:bg-surface-hi active:scale-[0.99] transition-all duration-150 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/[0.08] border border-accent/[0.13] flex items-center justify-center flex-shrink-0 text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={config.iconPath} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-[14px]">{config.label}</p>
                    <p className="text-white/30 text-xs mt-0.5">{config.subtitle}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/15 group-hover:text-white/35 transition-colors duration-200 flex-shrink-0">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
