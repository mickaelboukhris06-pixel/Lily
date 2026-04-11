'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

export async function createProperty(_prevState: { error?: string } | null, formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()

  if (!name) return { error: 'Le nom du logement est requis.' }

  // Enforce 2-property limit for free accounts
  if (session.user.plan === 'free' && session.user.role !== 'master') {
    const count = await prisma.property.count({ where: { ownerId: session.userId } })
    if (count >= 2) {
      return { error: 'Le plan gratuit est limité à 2 logements. Passez au plan payant pour en ajouter davantage.' }
    }
  }

  const property = await prisma.property.create({
    data: {
      name,
      description: description || null,
      ownerId: session.userId,
    },
  })

  redirect(`/dashboard/logement/${property.id}`)
}

export async function deleteProperty(propertyId: string) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  await prisma.property.deleteMany({
    where: { id: propertyId, ownerId: session.userId },
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function generateGuestToken(propertyId: string) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId: session.userId },
  })
  if (!property) return { error: 'Logement introuvable.' }

  const existing = await prisma.guestToken.findUnique({ where: { propertyId } })
  if (existing) {
    revalidatePath(`/dashboard/logement/${propertyId}`)
    return { token: existing.token }
  }

  const token = crypto.randomBytes(16).toString('hex')
  await prisma.guestToken.create({ data: { token, propertyId } })

  revalidatePath(`/dashboard/logement/${propertyId}`)
  return { token }
}

export async function toggleCard(propertyId: string, type: string, enabled: boolean) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId: session.userId },
  })
  if (!property) return

  await prisma.card.updateMany({
    where: { propertyId, type },
    data: { enabled },
  })

  revalidatePath(`/dashboard/logement/${propertyId}`)
}

export async function saveCard(
  propertyId: string,
  type: string,
  _prevState: { error?: string } | null,
  formData: FormData
) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const property = await prisma.property.findFirst({
    where: { id: propertyId, ownerId: session.userId },
  })
  if (!property) return { error: 'Logement introuvable.' }

  const data: Record<string, unknown> = {}
  formData.forEach((value, key) => {
    if (typeof value === 'string' && key !== 'photo_keep' && key !== 'photos') {
      data[key] = value
    }
  })

  // Photos already uploaded client-side — just collect the URLs
  const keptPhotos = (formData.getAll('photo_keep') as string[]).filter(Boolean)
  const newPhotos = (formData.getAll('photos') as string[]).filter(Boolean)
  const allPhotos = [...keptPhotos, ...newPhotos]
  if (allPhotos.length > 0) data.photos = allPhotos

  await prisma.card.upsert({
    where: { propertyId_type: { propertyId, type } },
    create: { propertyId, type, data: JSON.stringify(data), enabled: true },
    update: { data: JSON.stringify(data) },
  })

  revalidatePath(`/dashboard/logement/${propertyId}`)
  redirect(`/dashboard/logement/${propertyId}`)
}

export async function updateCoverPhoto(propertyId: string, photoUrl: string | null) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  await prisma.property.update({
    where: { id: propertyId, ownerId: session.userId },
    data: { coverPhoto: photoUrl },
  })

  revalidatePath(`/dashboard/logement/${propertyId}`)
}
