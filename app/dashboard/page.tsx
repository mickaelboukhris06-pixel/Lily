import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const properties = await prisma.property.findMany({
    where: { ownerId: session.userId },
    include: {
      cards: { where: { enabled: true } },
      guestToken: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mes logements</h1>
          <p className="text-white/30 text-sm mt-1">
            {properties.length === 0
              ? 'Aucun logement pour l\'instant.'
              : `${properties.length} logement${properties.length > 1 ? 's' : ''}`}
          </p>
        </div>
        <Link
          href={session.user.plan === 'free' && session.user.role !== 'master' ? '/api/stripe/upgrade' : '/dashboard/logement/new'}
          className="bg-accent text-white font-semibold px-4 py-2.5 hover:bg-[#8880ff] transition-all duration-200 flex items-center gap-2 text-xs shadow-[0_0_16px_rgba(121,113,255,0.25)] hover:shadow-[0_0_28px_rgba(121,113,255,0.35)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau logement
        </Link>
      </div>

      {/* Empty state */}
      {properties.length === 0 ? (
        <div className="border border-dashed border-white/[0.08] p-20 text-center">
          <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mx-auto mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/25">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <h2 className="text-[17px] font-semibold text-white mb-2">Votre premier logement</h2>
          <p className="text-white/30 text-sm mb-7 max-w-xs mx-auto leading-relaxed">Configurez vos cartes et partagez le lien avec vos locataires.</p>
          <Link
            href="/dashboard/logement/new"
            className="bg-accent text-white font-semibold px-5 py-2.5 hover:bg-[#8880ff] transition-all duration-200 text-sm inline-flex items-center gap-2 shadow-[0_0_16px_rgba(121,113,255,0.2)]"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Créer un logement
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/dashboard/logement/${property.id}`}
              className="bg-[#0C0C14] border border-white/[0.07] p-6 hover:border-white/[0.15] hover:bg-[#111118] transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-9 h-9 bg-white/[0.05] border border-white/[0.07] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                </div>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/15 group-hover:text-white/35 transition-colors duration-200 mt-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <h2 className="text-[15px] font-semibold text-white mb-1">{property.name}</h2>
              {property.description && (
                <p className="text-white/30 text-xs mb-4 line-clamp-1">{property.description}</p>
              )}

              <div className="flex items-center gap-2 mt-4">
                <span className="text-[11px] text-white/25 bg-white/[0.05] px-2.5 py-1">
                  {property.cards.length} carte{property.cards.length !== 1 ? 's' : ''} actives
                </span>
                {property.guestToken && (
                  <span className="text-[11px] text-accent bg-accent/[0.08] border border-accent/20 px-2.5 py-1">
                    Lien actif
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
