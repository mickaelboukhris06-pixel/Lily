import { NextResponse } from 'next/server'
import { stripe, PAID_PLAN_PRICE_ID } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { inviteToken } = await request.json()

    const invitation = await prisma.invitation.findUnique({
      where: { token: inviteToken },
    })

    if (!invitation || invitation.status !== 'pending' || invitation.plan !== 'paid') {
      return NextResponse.json({ error: 'Invitation invalide ou déjà utilisée.' }, { status: 400 })
    }

    const appUrl = process.env.APP_URL?.startsWith('http')
      ? process.env.APP_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    console.log('[stripe/checkout] appUrl:', appUrl)
    console.log('[stripe/checkout] priceId:', PAID_PLAN_PRICE_ID)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: PAID_PLAN_PRICE_ID, quantity: 1 }],
      customer_email: invitation.email ?? undefined,
      metadata: { inviteToken },
      success_url: `${appUrl}/invite/${inviteToken}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/invite/${inviteToken}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur interne'
    console.error('[stripe/checkout] error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
