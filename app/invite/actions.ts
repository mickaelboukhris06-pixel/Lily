'use server'

import { prisma } from '@/lib/db'
import { hashPassword, createSession } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function registerWithInvite(
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const inviteToken = formData.get('inviteToken') as string
  const stripeSessionId = (formData.get('stripeSessionId') as string) || null
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!name || !email || !password) return { error: 'Tous les champs sont requis.' }
  if (password.length < 8) return { error: 'Le mot de passe doit contenir au moins 8 caractères.' }

  const invitation = await prisma.invitation.findUnique({ where: { token: inviteToken } })
  if (!invitation || invitation.status !== 'pending') {
    return { error: 'Ce lien d\'invitation est invalide ou a déjà été utilisé.' }
  }
  if (invitation.expiresAt && invitation.expiresAt < new Date()) {
    return { error: 'Ce lien d\'invitation a expiré.' }
  }

  // For paid invitations, verify Stripe payment
  if (invitation.plan === 'paid') {
    if (!stripeSessionId) return { error: 'Paiement requis pour ce plan.' }
    try {
      const session = await stripe.checkout.sessions.retrieve(stripeSessionId)
      if (session.payment_status !== 'paid') return { error: 'Le paiement n\'a pas été confirmé.' }
      if (session.metadata?.inviteToken !== inviteToken) return { error: 'Session de paiement invalide.' }
    } catch {
      return { error: 'Impossible de vérifier le paiement.' }
    }
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: 'Un compte existe déjà avec cet email.' }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword(password),
      plan: invitation.plan,
    },
  })

  await prisma.invitation.update({
    where: { token: inviteToken },
    data: { status: 'used', usedById: user.id },
  })

  const sessionToken = await createSession(user.id)
  const cookieStore = await cookies()
  cookieStore.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  redirect('/dashboard')
}
