import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { WifiData } from '@/lib/cards'
import { GuestShell, Card, Divider } from '../components/GuestShell'
import { CopyButton } from '../components/CopyButton'

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
      accentClass="bg-blue-500/[0.08] border border-blue-500/[0.18] text-blue-400"
      iconPath="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"
    >
      <Card className="space-y-6">
        <div>
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Nom du réseau</p>
          <p className="text-white text-xl font-bold">{data.ssid}</p>
        </div>
        <Divider />
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em]">Mot de passe</p>
            <CopyButton value={data.password} />
          </div>
          <p className="text-white text-2xl font-bold font-mono tracking-wider">{data.password}</p>
        </div>
      </Card>

      <div className="mt-3 bg-white/[0.03] border border-white/[0.05] px-5 py-4">
        <p className="text-white/30 text-xs leading-relaxed">
          Sélectionnez le réseau sur votre appareil et entrez le mot de passe ci-dessus.
        </p>
      </div>
    </GuestShell>
  )
}
