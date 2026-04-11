import { NextResponse } from 'next/server'
import { stripe, PAID_PLAN_PRICE_ID } from '@/lib/stripe'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.redirect('/auth/login')

  if (session.user.plan === 'paid' || session.user.role === 'master') {
    return NextResponse.redirect(new URL('/dashboard/logement/new', process.env.APP_URL ?? 'http://localhost:3000'))
  }

  const appUrl = process.env.APP_URL?.startsWith('http')
    ? process.env.APP_URL
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const stripeSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PAID_PLAN_PRICE_ID, quantity: 1 }],
    customer_email: session.user.email,
    metadata: { userId: session.userId, type: 'upgrade' },
    success_url: `${appUrl}/dashboard/logement/new`,
    cancel_url: `${appUrl}/dashboard`,
  })

  return NextResponse.redirect(stripeSession.url!)
}
