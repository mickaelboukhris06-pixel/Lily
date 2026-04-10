'use server'

import { prisma } from '@/lib/db'
import { hashPassword, verifyPassword, createSession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function register(_prevState: { error?: string } | null, formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!name || !email || !password) {
    return { error: 'Tous les champs sont requis.' }
  }
  if (password.length < 8) {
    return { error: 'Le mot de passe doit contenir au moins 8 caractères.' }
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'Un compte existe déjà avec cet email.' }
  }

  const user = await prisma.user.create({
    data: { name, email, password: hashPassword(password) },
  })

  const token = await createSession(user.id)
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  redirect('/dashboard')
}

export async function login(_prevState: { error?: string } | null, formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email et mot de passe requis.' }
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    return { error: 'Email ou mot de passe incorrect.' }
  }
  if (!verifyPassword(password, user.password)) {
    return { error: 'Email ou mot de passe incorrect.' }
  }

  const token = await createSession(user.id)
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })

  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value
  if (token) {
    await prisma.session.delete({ where: { token } }).catch(() => {})
    cookieStore.delete('session')
  }
  redirect('/auth/login')
}
