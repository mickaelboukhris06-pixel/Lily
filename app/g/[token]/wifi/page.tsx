import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { WifiData } from '@/lib/cards'
import { GuestShell, Card, InfoBlock, Divider } from '../components/GuestShell'

export default async function WifiPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<WifiData>(property, 'wifi')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Wi-Fi"
      title="Connexion Wi-Fi"
      subtitle="Connectez-vous en quelques secondes."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"
    >
      <Card className="space-y-7">
        <InfoBlock label="Nom du réseau" value={data.ssid} />
        <Divider />
        <InfoBlock label="Mot de passe" value={data.password} mono />
      </Card>

      <div className="mt-4 bg-accent/[0.06] border border-accent/[0.12] rounded-xl px-5 py-4">
        <p className="text-white/35 text-xs leading-relaxed">
          Le réseau apparaît automatiquement sur vos appareils. Sélectionnez-le et entrez le mot de passe ci-dessus.
        </p>
      </div>
    </GuestShell>
  )
}
