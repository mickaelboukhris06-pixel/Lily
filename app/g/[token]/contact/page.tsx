import { getGuestProperty, getCardData } from '@/lib/guest'
import { notFound } from 'next/navigation'
import type { ContactData } from '@/lib/cards'
import { GuestShell, Card, Divider } from '../components/GuestShell'

export default async function ContactPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const property = await getGuestProperty(token)
  const data = getCardData<ContactData>(property, 'contact')
  if (!data) notFound()

  return (
    <GuestShell
      token={token}
      badge="Contact"
      title="Contact"
      subtitle="Votre propriétaire est disponible."
      accentClass="bg-accent/[0.08] border border-accent/[0.15] text-accent"
      iconPath="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.12h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
    >
      <Card className="space-y-6">
        <div>
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Propriétaire</p>
          <p className="text-white text-xl font-bold">{data.name}</p>
        </div>

        {data.phone && (
          <>
            <Divider />
            <div>
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Téléphone</p>
              <a href={`tel:${data.phone}`} className="text-accent text-lg font-semibold hover:text-[#8880ff] transition-colors duration-150">
                {data.phone}
              </a>
            </div>
          </>
        )}

        {data.email && (
          <>
            <Divider />
            <div>
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Email</p>
              <a href={`mailto:${data.email}`} className="text-accent text-sm font-semibold hover:text-[#8880ff] transition-colors duration-150">
                {data.email}
              </a>
            </div>
          </>
        )}

        {data.notes && (
          <>
            <Divider />
            <div>
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">Note</p>
              <p className="text-white/55 text-sm leading-relaxed">{data.notes}</p>
            </div>
          </>
        )}
      </Card>
    </GuestShell>
  )
}
