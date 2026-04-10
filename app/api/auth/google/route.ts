import { NextResponse } from 'next/server'
import crypto from 'crypto'

export function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'

  if (!clientId) {
    return NextResponse.json({ error: 'GOOGLE_CLIENT_ID non configuré.' }, { status: 500 })
  }

  // state anti-CSRF
  const state = crypto.randomBytes(16).toString('hex')

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${appUrl}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'select_account',
  })

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  )

  // Stocker le state dans un cookie httpOnly pour vérification au callback
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 10, // 10 min
    path: '/',
  })

  return response
}
