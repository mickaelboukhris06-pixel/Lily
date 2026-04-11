import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { inviteToken, userId, type } = session.metadata ?? {}

    if (type === 'upgrade' && userId) {
      // Direct upgrade — activate paid plan for the user
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: 'paid',
          stripeCustomerId: session.customer as string,
        },
      })
    } else if (inviteToken) {
      // Invitation payment — store session ID for verification at registration
      await prisma.invitation.update({
        where: { token: inviteToken },
        data: { stripeSessionId: session.id },
      })
    }
  }

  return NextResponse.json({ received: true })
}
