import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomCardEditor } from './CustomCardEditor'

export default async function CustomCardPage({ params }: { params: Promise<{ id: string; cardId: string }> }) {
  const { id, cardId } = await params
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const card = await prisma.customCard.findFirst({
    where: { id: cardId, property: { id, ownerId: session.userId } },
    include: { items: { orderBy: { order: 'asc' } } },
  })
  if (!card) notFound()

  return <CustomCardEditor card={card} propertyId={id} />
}
