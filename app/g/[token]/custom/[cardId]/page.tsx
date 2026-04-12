import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function GuestCustomCardPage({
  params,
}: {
  params: Promise<{ token: string; cardId: string }>
}) {
  const { token, cardId } = await params

  const guestToken = await prisma.guestToken.findUnique({ where: { token } })
  if (!guestToken) notFound()

  const card = await prisma.customCard.findFirst({
    where: { id: cardId, propertyId: guestToken.propertyId, enabled: true },
    include: { items: { orderBy: { order: 'asc' } } },
  })
  if (!card) notFound()

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Top-left halo */}
      <div
        className="fixed top-0 left-0 w-[700px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(160,148,255,0.28) 0%, rgba(100,160,255,0.12) 35%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-4 pt-14 pb-20">
        <Link
          href={`/g/${token}`}
          className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-8 group text-xs"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Retour
        </Link>

        <div className="mb-8">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.25em] mb-2">Information</p>
          <h1 className="text-[32px] font-bold text-white leading-[1.05] tracking-tight">
            {card.emoji && <span className="mr-2">{card.emoji}</span>}
            {card.title}
          </h1>
        </div>

        {card.items.length === 0 ? (
          <p className="text-white/25 text-sm">Aucune information disponible.</p>
        ) : (
          <div className="space-y-2">
            {card.items.map((item, i) => (
              <div
                key={item.id}
                className="bg-[#0C0C14] border border-white/[0.07] px-5 py-4"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-semibold text-white/20 mt-0.5 w-4 flex-shrink-0 tabular-nums">{i + 1}</span>
                  <div>
                    <p className="text-[13px] font-semibold text-white">{item.title}</p>
                    {item.content && (
                      <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{item.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
