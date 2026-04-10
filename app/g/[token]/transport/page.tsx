import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { TransportData } from '@/lib/cards'
import { GuestShell, Card } from '../components/GuestShell'

export default async function TransportPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<TransportData>(property, 'transport')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Transport"
      title="Comment accéder"
      subtitle="Toutes les options pour rejoindre le logement."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"
    >
      <Card>
        <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{data.instructions}</p>
      </Card>
    </GuestShell>
  )
}
