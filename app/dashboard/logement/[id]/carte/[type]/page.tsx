import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import { CARD_ORDER, type CardType } from '@/lib/cards'
import { CardEditorForm } from './CardEditorForm'

export default async function CardEditorPage({
  params,
}: {
  params: Promise<{ id: string; type: string }>
}) {
  const { id, type } = await params
  const session = await getSession()
  if (!session) redirect('/auth/login')

  if (!CARD_ORDER.includes(type as CardType)) notFound()

  const property = await prisma.property.findFirst({
    where: { id, ownerId: session.userId },
    include: { cards: { where: { type } } },
  })

  if (!property) notFound()

  const existingData = property.cards[0]?.data
    ? JSON.parse(property.cards[0].data)
    : {}

  return (
    <CardEditorForm
      propertyId={id}
      type={type as CardType}
      propertyName={property.name}
      existingData={existingData}
    />
  )
}
