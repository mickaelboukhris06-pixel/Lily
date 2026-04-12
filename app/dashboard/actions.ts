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

  // Only paid users and master can create properties
  if (session.user.plan === 'free' && session.user.role !== 'master') {
    return { error: 'Un abonnement est requis pour créer un logement.' }
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

// ── Custom Cards ────────────────────────────────────────────

export async function createCustomCard(_prev: { error?: string } | null, formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const propertyId = formData.get('propertyId') as string
  const title = (formData.get('title') as string)?.trim()
  const emoji = (formData.get('emoji') as string)?.trim() || null

  if (!title) return { error: 'Un titre est requis.' }

  const property = await prisma.property.findFirst({ where: { id: propertyId, ownerId: session.userId } })
  if (!property) return { error: 'Logement introuvable.' }

  const card = await prisma.customCard.create({
    data: { propertyId, title, emoji },
  })

  revalidatePath(`/dashboard/logement/${propertyId}`)
  redirect(`/dashboard/logement/${propertyId}/custom/${card.id}`)
}

export async function updateCustomCard(_prev: { error?: string } | null, formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const cardId = formData.get('cardId') as string
  const title = (formData.get('title') as string)?.trim()
  const emoji = (formData.get('emoji') as string)?.trim() || null

  if (!title) return { error: 'Un titre est requis.' }

  const card = await prisma.customCard.findFirst({
    where: { id: cardId, property: { ownerId: session.userId } },
  })
  if (!card) return { error: 'Carte introuvable.' }

  await prisma.customCard.update({ where: { id: cardId }, data: { title, emoji } })
  revalidatePath(`/dashboard/logement/${card.propertyId}`)
  return { error: undefined }
}

export async function deleteCustomCard(cardId: string) {
  const session = await getSession()
  if (!session) return

  const card = await prisma.customCard.findFirst({
    where: { id: cardId, property: { ownerId: session.userId } },
  })
  if (!card) return

  await prisma.customCard.delete({ where: { id: cardId } })
  revalidatePath(`/dashboard/logement/${card.propertyId}`)
  redirect(`/dashboard/logement/${card.propertyId}`)
}

export async function toggleCustomCard(cardId: string, enabled: boolean) {
  const session = await getSession()
  if (!session) return

  await prisma.customCard.updateMany({
    where: { id: cardId, property: { ownerId: session.userId } },
    data: { enabled },
  })

  const card = await prisma.customCard.findFirst({ where: { id: cardId } })
  if (card) revalidatePath(`/dashboard/logement/${card.propertyId}`)
}

export async function createCustomCardItem(_prev: { error?: string } | null, formData: FormData) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const customCardId = formData.get('customCardId') as string
  const title = (formData.get('title') as string)?.trim()
  const content = (formData.get('content') as string)?.trim() || null

  if (!title) return { error: 'Un titre est requis.' }

  const card = await prisma.customCard.findFirst({
    where: { id: customCardId, property: { ownerId: session.userId } },
  })
  if (!card) return { error: 'Carte introuvable.' }

  const count = await prisma.customCardItem.count({ where: { customCardId } })
  await prisma.customCardItem.create({ data: { customCardId, title, content, order: count } })

  revalidatePath(`/dashboard/logement/${card.propertyId}/custom/${customCardId}`)
  return { error: undefined }
}

export async function deleteCustomCardItem(itemId: string) {
  const session = await getSession()
  if (!session) return

  const item = await prisma.customCardItem.findFirst({
    where: { id: itemId },
    include: { customCard: true },
  })
  if (!item) return

  const card = await prisma.customCard.findFirst({
    where: { id: item.customCardId, property: { ownerId: session.userId } },
  })
  if (!card) return

  await prisma.customCardItem.delete({ where: { id: itemId } })
  revalidatePath(`/dashboard/logement/${card.propertyId}/custom/${item.customCardId}`)
}
