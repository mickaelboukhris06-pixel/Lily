import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { InvitationForm } from './InvitationForm'
import { CopyLinkButton } from './CopyLinkButton'
import { DeleteInvitationButton } from './DeleteInvitationButton'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'text-yellow-400/80 bg-yellow-500/[0.07] border-yellow-500/20' },
  used: { label: 'Utilisée', color: 'text-emerald-400/80 bg-emerald-500/[0.07] border-emerald-500/20' },
  expired: { label: 'Expirée', color: 'text-white/25 bg-white/[0.03] border-white/[0.07]' },
}

export default async function InvitationsPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')
  if (session.user.role !== 'master') notFound()

  const invitations = await prisma.invitation.findMany({
    where: { createdById: session.userId },
    include: { usedBy: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const now = new Date()
  const items = invitations.map((inv) => ({
    ...inv,
    computedStatus: inv.status === 'pending' && inv.expiresAt && inv.expiresAt < now ? 'expired' : inv.status,
  }))

  return (
    <div>
      <div className="mb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-6 group text-xs"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-0.5 transition-transform duration-150">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Tableau de bord
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Invitations</h1>
        <p className="text-white/30 text-sm mt-1">Gérez les accès à la plateforme.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] items-start">
        {/* List */}
        <div>
          {items.length === 0 ? (
            <div className="border border-dashed border-white/[0.08] p-16 text-center">
              <p className="text-white/20 text-sm">Aucune invitation pour l'instant.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((inv) => {
                const statusMeta = STATUS_LABELS[inv.computedStatus] ?? STATUS_LABELS.pending
                return (
                  <div
                    key={inv.id}
                    className="bg-[#0C0C14] border border-white/[0.07] px-5 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {inv.email && (
                            <p className="text-[13px] font-semibold text-white truncate">{inv.email}</p>
                          )}
                          <span className={`text-[10px] font-semibold px-2 py-0.5 border ${statusMeta.color}`}>
                            {statusMeta.label}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 border ${
                            inv.plan === 'paid'
                              ? 'text-accent/80 bg-accent/[0.07] border-accent/20'
                              : 'text-white/30 bg-white/[0.04] border-white/[0.07]'
                          }`}>
                            {inv.plan === 'paid' ? 'Payant' : 'Gratuit'}
                          </span>
                        </div>

                        {inv.usedBy && (
                          <p className="text-white/30 text-xs mt-1">
                            Utilisée par {inv.usedBy.name} ({inv.usedBy.email})
                          </p>
                        )}

                        <div className="flex items-center gap-4 mt-2.5">
                          {inv.computedStatus === 'pending' && (
                            <CopyLinkButton token={inv.token} />
                          )}
                          <p className="text-white/20 text-[11px]">
                            {new Date(inv.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                            {inv.expiresAt && inv.computedStatus === 'pending' && (
                              <> · expire le {new Date(inv.expiresAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</>
                            )}
                          </p>
                        </div>
                      </div>

                      {inv.computedStatus !== 'used' && (
                        <DeleteInvitationButton id={inv.id} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:sticky lg:top-20">
          <InvitationForm />
        </div>
      </div>
    </div>
  )
}
