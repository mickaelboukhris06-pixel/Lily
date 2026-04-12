import { prisma } from './db'
import { notFound } from 'next/navigation'
import type { CardType } from './cards'

export async function getGuestProperty(token: string) {
  const guestToken = await prisma.guestToken.findUnique({
    where: { token },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          description: true,
          coverPhoto: true,
          ownerId: true,
          createdAt: true,
          updatedAt: true,
          cards: {
            where: { enabled: true },
            orderBy: { order: 'asc' },
          },
          customCards: {
            where: { enabled: true },
            orderBy: { order: 'asc' },
            include: { items: { orderBy: { order: 'asc' } } },
          },
        },
      },
    },
  })

  if (!guestToken) notFound()
  return guestToken.property
}

export function getCardData<T>(
  property: { cards: { type: string; data: string }[] },
  type: CardType
): T | null {
  const card = property.cards.find((c) => c.type === type)
  if (!card) return null
  try {
    return JSON.parse(card.data) as T
  } catch {
    return null
  }
}
