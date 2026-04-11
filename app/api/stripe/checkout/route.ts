import { NextResponse } from 'next/server'
import { stripe, PAID_PLAN_PRICE_ID } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const { inviteToken } = await request.json()

  const invitation = await prisma.invitation.findUnique({
    where: { token: inviteToken },
  })

  if (!invitation || invitation.status !== 'pending' || invitation.plan !== 'paid') {
    return NextResponse.json({ error: 'Invitation invalide.' }, { status: 400 })
  }

  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PAID_PLAN_PRICE_ID, quantity: 1 }],
    customer_email: invitation.email ?? undefined,
    metadata: { inviteToken },
    success_url: `${appUrl}/invite/${inviteToken}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/invite/${inviteToken}`,
  })

  return NextResponse.json({ url: session.url })
}
