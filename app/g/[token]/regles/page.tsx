import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { RulesData } from '@/lib/cards'
import { GuestShell, Card } from '../components/GuestShell'

export default async function ReglesPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<RulesData>(property, 'rules')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Règlement"
      title="Règlement"
      subtitle="Merci de respecter ces règles."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
    >
      <Card>
        <p className="text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{data.rules}</p>
      </Card>
    </GuestShell>
  )
}
