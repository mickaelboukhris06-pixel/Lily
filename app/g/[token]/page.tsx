import { getGuestProperty, getCardData } from '@/lib/guest'
import { CARD_CONFIGS, CARD_ORDER } from '@/lib/cards'
import type { ContactData } from '@/lib/cards'
import Link from 'next/link'


const CARD_STYLES: Record<string, { color: string; glow: string; border: string; dot: string }> = {
  checkin:   { color: 'from-emerald-500/30 to-emerald-500/0', glow: 'bg-emerald-500',  border: 'hover:border-emerald-500/35', dot: 'bg-emerald-400'  },
  wifi:      { color: 'from-sky-500/30     to-sky-500/0',     glow: 'bg-sky-500',      border: 'hover:border-sky-500/35',     dot: 'bg-sky-400'      },
  checkout:  { color: 'from-amber-500/30   to-amber-500/0',   glow: 'bg-amber-500',    border: 'hover:border-amber-500/35',   dot: 'bg-amber-400'    },
  rules:     { color: 'from-yellow-500/30  to-yellow-500/0',  glow: 'bg-yellow-500',   border: 'hover:border-yellow-500/35',  dot: 'bg-yellow-400'   },
  transport: { color: 'from-cyan-500/30    to-cyan-500/0',    glow: 'bg-cyan-500',     border: 'hover:border-cyan-500/35',    dot: 'bg-cyan-400'     },
  tips:      { color: 'from-rose-500/30    to-rose-500/0',    glow: 'bg-rose-500',     border: 'hover:border-rose-500/35',    dot: 'bg-rose-400'     },
  contact:   { color: 'from-violet-500/30  to-violet-500/0',  glow: 'bg-violet-500',   border: 'hover:border-violet-500/35',  dot: 'bg-violet-400'   },
}

export default async function GuestHomePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const contactData = getCardData<ContactData>(property, 'contact')
  const coverPhoto = property.coverPhoto ?? null

  const activeCards = CARD_ORDER.filter((type) =>
    property.cards.some((c) => c.type === type && c.enabled)
  )
  const customCards = property.customCards

  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={coverPhoto ? {
        backgroundImage: `url(${coverPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: '#000',
      } : { backgroundColor: '#000' }}
    >
      {coverPhoto && (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}

      {/* Top-left halo */}
      <div
        className="fixed top-0 left-0 w-[700px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(160,148,255,0.28) 0%, rgba(100,160,255,0.12) 35%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-14 pb-36">

        {/* Header */}
        <div className="px-1 pb-8">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.25em] mb-2">Votre séjour</p>
          <h1 className="text-[36px] font-bold text-white leading-[1.05] tracking-tight">{property.name}</h1>
          {property.description && (
            <p className="text-white/40 mt-2 text-sm leading-relaxed">{property.description}</p>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {activeCards.map((type) => {
            const config = CARD_CONFIGS[type as keyof typeof CARD_CONFIGS]
            const style = CARD_STYLES[type] ?? { color: 'from-white/10 to-white/0', glow: 'bg-white', border: 'hover:border-white/20', dot: 'bg-white/40' }

            return (
              <Link
                key={type}
                href={`/g/${token}/${config.route}`}
                className={`group relative overflow-hidden bg-[#0C0C14] border border-white/[0.09] p-5 aspect-square flex flex-col justify-between transition-all duration-300 ${style.border} hover:-translate-y-0.5`}
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)' }}
              >
                {/* Glassmorphism overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Glow top-right */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-35 transition-opacity duration-500 ${style.glow}`} />

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-8 h-8 bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-white/15 transition-colors duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white/70 transition-colors duration-300">
                      <path d={config.iconPath} />
                    </svg>
                  </div>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/45 transition-colors duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Label */}
                <div className="relative z-10">
                  <div className={`w-1.5 h-1.5 rounded-full mb-2.5 ${style.dot} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  <p className="text-[11px] font-bold text-white/35 uppercase tracking-[0.2em] group-hover:text-white/75 transition-colors duration-300">{config.label}</p>
                  <p className="text-white/20 text-[10px] mt-0.5 leading-snug group-hover:text-white/40 transition-colors duration-300">{config.subtitle}</p>
                </div>
              </Link>
            )
          })}

          {customCards.map((cc) => (
            <Link
              key={cc.id}
              href={`/g/${token}/custom/${cc.id}`}
              className="group relative overflow-hidden bg-[#0C0C14] border border-white/[0.09] p-5 aspect-square flex flex-col justify-between transition-all duration-300 hover:border-white/[0.18] hover:-translate-y-0.5"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Glow top-right */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-white" />

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-8 h-8 bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-white/15 transition-colors duration-300 text-base leading-none">
                  {cc.emoji ?? '📋'}
                </div>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/15 group-hover:text-white/45 transition-colors duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Label */}
              <div className="relative z-10">
                <div className="w-1.5 h-1.5 rounded-full mb-2.5 bg-white/40 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[11px] font-bold text-white/35 uppercase tracking-[0.2em] group-hover:text-white/75 transition-colors duration-300">{cc.title}</p>
                <p className="text-white/20 text-[10px] mt-0.5 leading-snug group-hover:text-white/40 transition-colors duration-300">{cc.items.length} élément{cc.items.length !== 1 ? 's' : ''}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Sticky contact bar */}
      {contactData?.phone && (
        <div className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-7 pt-6 bg-gradient-to-t from-black via-black/80 to-transparent">
          <a
            href={`tel:${contactData.phone}`}
            className="flex items-center justify-center gap-2.5 w-full max-w-lg mx-auto bg-white/[0.07] border border-white/[0.10] hover:bg-white/[0.10] active:scale-[0.99] py-4 transition-all duration-150"
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
