import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { NewPropertyForm } from './NewPropertyForm'

export default async function NewPropertyPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  // Free non-master users must pay before creating a property
  if (session.user.plan === 'free' && session.user.role !== 'master') {
    redirect('/api/stripe/upgrade')
  }

  return (
    <div className="max-w-md">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-8 group text-xs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
        Retour
      </Link>

      <h1 className="text-2xl font-bold text-white tracking-tight mb-1.5">Nouveau logement</h1>
      <p className="text-white/30 text-sm mb-8">Vous pourrez configurer les cartes ensuite.</p>

      <NewPropertyForm />
    </div>
  )
}
