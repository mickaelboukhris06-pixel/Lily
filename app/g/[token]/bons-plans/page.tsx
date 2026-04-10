import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { TipsData } from '@/lib/cards'
import { GuestShell, Card } from '../components/GuestShell'

export default async function BonsPlansPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<TipsData>(property, 'tips')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Bons plans"
      title="Bons plans"
      subtitle="Les meilleures adresses du quartier."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z"
    >
      <Card>
        <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{data.recommendations}</p>
      </Card>
    </GuestShell>
  )
}
