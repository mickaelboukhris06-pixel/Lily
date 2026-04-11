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
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Top-left halo */}
      <div
        className="fixed top-0 left-0 w-[700px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 0% 0%, rgba(160,148,255,0.30) 0%, rgba(100,160,255,0.12) 35%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

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
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 mb-5 text-xs font-semibold ${accentClass}`}>
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
    <div className={`bg-[#0C0C14] border border-white/[0.09] p-7 ${className}`}>
      {children}
    </div>
  )
}

export function Divider() {
  return <div className="border-t border-white/[0.06]" />
}
