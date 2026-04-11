'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

export async function createInvitation(
  _prevState: { error?: string; token?: string } | null,
  formData: FormData
) {
  const session = await getSession()
  if (!session) redirect('/auth/login')
  if (session.user.role !== 'master') return { error: 'Accès refusé.' }

  const email = (formData.get('email') as string)?.trim() || null
  const plan = (formData.get('plan') as string) === 'paid' ? 'paid' : 'free'

  const token = crypto.randomBytes(16).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await prisma.invitation.create({
    data: {
      token,
      email,
      plan,
      createdById: session.userId,
      expiresAt,
    },
  })

  revalidatePath('/dashboard/invitations')
  return { token }
}

export async function deleteInvitation(invitationId: string) {
  const session = await getSession()
  if (!session) redirect('/auth/login')
  if (session.user.role !== 'master') return

  await prisma.invitation.deleteMany({
    where: { id: invitationId, createdById: session.userId },
  })

  revalidatePath('/dashboard/invitations')
}
