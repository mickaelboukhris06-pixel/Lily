import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { RegisterForm } from './RegisterForm'
import { StripeCheckoutButton } from './StripeCheckoutButton'

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>
  searchParams: Promise<{ session_id?: string }>
}) {
  const { token } = await params
  const { session_id: stripeSessionId } = await searchParams

  const invitation = await prisma.invitation.findUnique({ where: { token } })
  if (!invitation) notFound()

  const isExpired = invitation.expiresAt && invitation.expiresAt < new Date()
  const isUsed = invitation.status === 'used'

  return (
    <main className="min-h-screen bg-[#08080C] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.06)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 w-full max-w-[360px]">
        <div className="flex items-center justify-center mb-10">
          <span className="text-[15px] font-semibold tracking-[0.07em] text-white">lily</span>
        </div>

        <div className="bg-[#0F0F15] border border-white/[0.07] rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
          {isUsed ? (
            <div className="text-center py-4">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/25">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-[18px] font-bold text-white mb-2">Invitation déjà utilisée</h1>
              <p className="text-white/35 text-sm">Ce lien a déjà été utilisé pour créer un compte.</p>
            </div>
          ) : isExpired ? (
            <div className="text-center py-4">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/25">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <h1 className="text-[18px] font-bold text-white mb-2">Invitation expirée</h1>
              <p className="text-white/35 text-sm">Ce lien d'invitation n'est plus valide. Demandez-en un nouveau.</p>
            </div>
          ) : invitation.plan === 'paid' && !stripeSessionId ? (
            // Paid invite — payment required first
            <div>
              <div className="mb-7">
                <div className="w-9 h-9 rounded-xl bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-accent">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h1 className="text-[22px] font-bold text-white tracking-tight mb-1.5">Plan Professionnel</h1>
                <p className="text-white/35 text-sm">
                  Vous avez été invité à rejoindre lily avec un accès illimité à tous vos logements.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Logements illimités
                </div>
                <div className="flex items-center gap-3 text-xs text-white/50 mt-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Toutes les fonctionnalités
                </div>
              </div>

              <StripeCheckoutButton inviteToken={token} />
            </div>
          ) : (
            // Free invite OR paid after Stripe payment
            <div>
              <div className="mb-7">
                <h1 className="text-[22px] font-bold text-white tracking-tight mb-1.5">Créer votre compte</h1>
                <p className="text-white/35 text-sm">
                  {invitation.plan === 'paid'
                    ? 'Paiement confirmé. Créez votre compte pour commencer.'
                    : 'Vous avez été invité à rejoindre lily.'}
                </p>
                {invitation.plan === 'paid' && (
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-lg px-2.5 py-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-emerald-400 text-[11px] font-semibold">Paiement confirmé</span>
                  </div>
                )}
              </div>

              <RegisterForm
                inviteToken={token}
                stripeSessionId={stripeSessionId}
                defaultEmail={invitation.email ?? undefined}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
