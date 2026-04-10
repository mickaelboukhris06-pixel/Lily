import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { CARD_CONFIGS, CARD_ORDER } from '@/lib/cards'
import { ShareButton } from './ShareButton'
import { ToggleCardButton } from './ToggleCardButton'

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const property = await prisma.property.findFirst({
    where: { id, ownerId: session.userId },
    include: { cards: true, guestToken: true },
  })
  if (!property) notFound()

  const cardMap = new Map(property.cards.map((c) => [c.type, c]))

  return (
    <div>
      {/* Back + title */}
      <div className="mb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-6 group text-xs"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Mes logements
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">{property.name}</h1>
        {property.description && (
          <p className="text-white/30 text-sm mt-1.5">{property.description}</p>
        )}
      </div>

      {/* Share block */}
      <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[13px] font-semibold text-white mb-0.5">Lien locataire</p>
            <p className="text-white/30 text-xs">
              {property.guestToken
                ? 'Partagez ce lien avec vos locataires.'
                : 'Générez un lien unique pour ce logement.'}
            </p>
          </div>
          <ShareButton propertyId={property.id} existingToken={property.guestToken?.token ?? null} />
        </div>
      </div>

      {/* Cards section */}
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">Cartes d'information</h2>
        <p className="text-white/25 text-xs mt-1">Configurez et activez les cartes visibles par vos locataires.</p>
      </div>

      <div className="space-y-2">
        {CARD_ORDER.map((type) => {
          const config = CARD_CONFIGS[type]
          const card = cardMap.get(type)
          const isConfigured = !!card
          const isEnabled = card?.enabled ?? false

          return (
            <div
              key={type}
              className="bg-surface border border-white/[0.07] rounded-xl px-5 py-4 flex items-center gap-4"
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center flex-shrink-0 text-accent">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={config.iconPath} />
                </svg>
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white">{config.label}</p>
                <p className="text-white/25 text-xs">{config.subtitle}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {isConfigured && (
                  <ToggleCardButton propertyId={property.id} type={type} enabled={isEnabled} />
                )}
                <Link
                  href={`/dashboard/logement/${property.id}/carte/${type}`}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-lg transition-all duration-150 ${
                    isConfigured
                      ? 'bg-white/[0.06] text-white/50 hover:bg-white/[0.09] hover:text-white/70'
                      : 'bg-accent text-white hover:bg-[#8880ff] shadow-[0_0_12px_rgba(121,113,255,0.18)]'
                  }`}
                >
                  {isConfigured ? 'Modifier' : 'Configurer'}
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
