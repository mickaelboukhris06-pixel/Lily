import Link from 'next/link'

const features = [
  {
    label: 'Wi-Fi',
    desc: 'Réseau et mot de passe accessibles en un tap.',
    icon: <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />,
  },
  {
    label: 'Check-in',
    desc: "Instructions d'arrivée, codes et accès.",
    icon: <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />,
  },
  {
    label: 'Check-out',
    desc: 'Procédure de départ claire et guidée.',
    icon: <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8" />,
  },
  {
    label: 'Règlement',
    desc: 'Les règles du logement, toujours à portée.',
    icon: <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><path d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" /></>,
  },
  {
    label: 'Contact',
    desc: 'Coordonnées du propriétaire en direct.',
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.92 4.12h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 11.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />,
  },
  {
    label: 'Transport',
    desc: 'Comment rejoindre le logement facilement.',
    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
  },
  {
    label: 'Bons plans',
    desc: 'Les meilleures adresses du quartier.',
    icon: <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" />,
  },
]

const steps = [
  { num: '01', title: 'Créez votre logement', desc: 'Ajoutez le nom et la description de votre bien en quelques secondes.' },
  { num: '02', title: 'Configurez vos cartes', desc: 'Wi-Fi, check-in, règlement… chaque information dans sa carte dédiée.' },
  { num: '03', title: 'Partagez le lien', desc: 'Générez un lien unique et envoyez-le à vos locataires avant leur arrivée.' },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base overflow-hidden">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden>
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.07)_0%,transparent_65%)]" />
      </div>

      {/* ── Nav ──────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="text-[15px] font-semibold tracking-[0.07em] text-white">lily</span>
        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="text-white/40 hover:text-white/70 transition-colors duration-150 text-sm px-4 py-2 rounded-lg"
          >
            Connexion
          </Link>
          <Link
            href="/auth/register"
            className="bg-accent text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.22)]"
          >
            Commencer
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/[0.08] border border-accent/[0.18] rounded-full px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-accent text-xs font-medium tracking-wide">Pour les hôtes Airbnb & Booking</span>
        </div>

        <h1 className="text-[52px] md:text-[72px] font-bold text-white leading-[1.06] tracking-tight mb-7">
          Tout ce dont vos<br />
          <span className="text-accent">locataires ont besoin</span>
        </h1>

        <p className="text-[17px] text-white/45 max-w-lg mx-auto mb-12 leading-relaxed">
          Une page d'accueil personnalisée pour votre logement.<br className="hidden sm:block" />
          Wi-Fi, check-in, règlement — tout en un seul lien.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/register"
            className="bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_28px_rgba(121,113,255,0.22)] hover:shadow-[0_0_36px_rgba(121,113,255,0.32)] text-[15px]"
          >
            Créer mon espace — c'est gratuit
          </Link>
          <Link
            href="/auth/login"
            className="bg-white/[0.05] border border-white/[0.08] text-white/60 font-semibold px-8 py-3.5 rounded-xl hover:bg-white/[0.08] hover:text-white/80 transition-all duration-200 text-[15px]"
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-3">Fonctionnalités</p>
          <h2 className="text-[28px] font-bold text-white tracking-tight">7 cartes, tout est couvert</h2>
          <p className="text-white/35 mt-3 text-[15px]">Activez uniquement celles dont vous avez besoin.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f) => (
            <div
              key={f.label}
              className="bg-surface border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-surface-hi transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/[0.1] border border-accent/[0.15] flex items-center justify-center mb-4 text-accent group-hover:bg-accent/[0.15] transition-colors duration-200">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </div>
              <p className="font-semibold text-white text-sm mb-1.5">{f.label}</p>
              <p className="text-white/30 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-28">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-3">Comment ça marche</p>
          <h2 className="text-[28px] font-bold text-white tracking-tight">En 3 étapes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {steps.map((s) => (
            <div key={s.num} className="bg-surface border border-white/[0.07] rounded-2xl p-8">
              <div className="w-8 h-8 rounded-lg bg-accent/[0.1] border border-accent/[0.15] flex items-center justify-center mb-7">
                <span className="text-accent text-[11px] font-bold tracking-widest">{s.num}</span>
              </div>
              <h3 className="text-[17px] font-semibold text-white mb-2.5">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-28">
        <div className="relative bg-surface border border-accent/[0.18] rounded-3xl p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(121,113,255,0.07)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight mb-4 leading-tight">
              Prêt à simplifier<br />l'expérience locataire ?
            </h2>
            <p className="text-white/35 mb-10 text-[15px]">Vos locataires vous remercieront.</p>
            <Link
              href="/auth/register"
              className="bg-accent text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_28px_rgba(121,113,255,0.25)] hover:shadow-[0_0_40px_rgba(121,113,255,0.35)] text-[15px] inline-block"
            >
              Créer mon espace — c'est gratuit
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-10">
        <p className="text-center text-white/18 text-sm">© 2026 Lily. Tous droits réservés.</p>
      </footer>

    </main>
  )
}
