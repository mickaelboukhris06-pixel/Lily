import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const appUrl = process.env.APP_URL ?? 'http://localhost:3000'

  if (error) {
    return NextResponse.redirect(`${appUrl}/auth/login?error=google_cancelled`)
  }

  const storedState = request.cookies.get('oauth_state')?.value
  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(`${appUrl}/auth/login?error=invalid_state`)
  }

  try {
    // Échange code → tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        redirect_uri: `${appUrl}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    })

    const tokenBody = await tokenRes.json()

    if (!tokenRes.ok) {
      console.error('[Google OAuth] token error:', tokenBody)
      return NextResponse.redirect(`${appUrl}/auth/login?error=token_exchange_failed`)
    }

    const tokens = tokenBody as { access_token: string }

    // Profil Google
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })

    if (!profileRes.ok) {
      return NextResponse.redirect(`${appUrl}/auth/login?error=profile_fetch_failed`)
    }

    const profile = await profileRes.json() as {
      sub: string
      email: string
      name: string
      given_name?: string
    }

    if (!profile.email || !profile.sub) {
      return NextResponse.redirect(`${appUrl}/auth/login?error=missing_profile`)
    }

    // Upsert utilisateur
    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId: profile.sub }, { email: profile.email }] },
    })

    if (user) {
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId: profile.sub },
        })
      }
    } else {
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.given_name ?? profile.name,
          googleId: profile.sub,
        },
      })
    }

    const token = await createSession(user.id)

    const response = NextResponse.redirect(`${appUrl}/dashboard`)
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    response.cookies.delete('oauth_state')

    return response

  } catch (err) {
    console.error('[Google OAuth] callback error:', err)
    const msg = err instanceof Error ? encodeURIComponent(err.message) : 'unknown'
    return NextResponse.redirect(`${appUrl}/auth/login?error=callback_error&msg=${msg}`)
  }
}
