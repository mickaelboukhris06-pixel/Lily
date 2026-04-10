import Link from 'next/link'

interface GuestShellProps {
  token: string
  accentClass: string
  iconPath: string | React.ReactNode
  badge: string
  title: string
  subtitle: string
  children: React.ReactNode
}

export function GuestShell({
  token,
  accentClass,
  iconPath,
  badge,
  title,
  subtitle,
  children,
}: GuestShellProps) {
  return (
    <main className="min-h-screen bg-base relative overflow-hidden">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-5 pt-8 pb-20">
        {/* Back */}
        <Link
          href={`/g/${token}`}
          className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/55 transition-colors duration-150 mb-10 group text-xs"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Retour
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 mb-5 text-xs font-semibold ${accentClass}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {typeof iconPath === 'string' ? <path d={iconPath} /> : iconPath}
            </svg>
            {badge}
          </div>
          <h1 className="text-[32px] font-bold text-white tracking-tight leading-tight">{title}</h1>
          <p className="text-white/35 mt-2 text-[15px]">{subtitle}</p>
        </div>

        {children}
      </div>
    </main>
  )
}

export function InfoBlock({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.18em] mb-2">{label}</p>
      <p className={`text-white text-2xl font-bold ${mono ? 'font-mono tracking-wider' : ''}`}>{value}</p>
    </div>
  )
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-white/[0.07] rounded-2xl p-7 ${className}`}>
      {children}
    </div>
  )
}

export function Divider() {
  return <div className="border-t border-white/[0.06]" />
}
