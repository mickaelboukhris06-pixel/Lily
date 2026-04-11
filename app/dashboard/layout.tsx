import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/app/auth/actions'
import { InstallButton } from './components/InstallButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  return (
    <div className="min-h-screen bg-black relative">
      {/* Top-left halo */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-[900px] h-[700px] z-0"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(160,148,255,0.30) 0%, rgba(100,160,255,0.12) 35%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <header className="relative z-20 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="text-[14px] font-bold tracking-[0.07em] text-white">
            lily
          </Link>
          <div className="flex items-center gap-5">
            {session.user.role === 'master' && (
              <Link
                href="/dashboard/invitations"
                className="text-white/30 hover:text-white/60 text-xs transition-colors duration-150 hidden sm:flex items-center gap-1.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Invitations
              </Link>
            )}
            <span className="text-white/30 text-xs hidden sm:block">{session.user.name}</span>
            <form action={logout}>
              <button
                type="submit"
                className="text-white/25 hover:text-white/60 text-xs transition-colors duration-150 flex items-center gap-1.5"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                Déconnexion
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">{children}</main>
      <InstallButton />
    </div>
  )
}
