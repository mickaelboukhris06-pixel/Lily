import Link from 'next/link'

const featureItems = [
  {
    num: '01',
    title: 'Arrivée sans stress',
    desc: 'Code d\'accès, instructions pas-à-pas et horaires. Vos locataires trouvent tout avant même d\'arriver.',
  },
  {
    num: '02',
    title: 'Wi-Fi en un tap',
    desc: 'Réseau et mot de passe visibles immédiatement. Plus besoin d\'appeler pour demander.',
  },
  {
    num: '03',
    title: 'Tout en un seul lien',
    desc: 'Check-out, règlement, bons plans, transport. Un lien unique par logement, partagé en quelques secondes.',
  },
]

const cards = [
  {
    title: 'Check-in digital',
    desc: 'Instructions, codes et accès accessibles 24h/24 depuis le téléphone du locataire.',
    highlight: false,
  },
  {
    title: 'Wi-Fi instantané',
    desc: 'Réseau et mot de passe visibles d\'un coup d\'œil, avec bouton copier intégré.',
    highlight: false,
  },
  {
    title: 'Règlement clair',
    desc: 'Les règles du logement, toujours à portée. Moins de litiges, plus de sérénité.',
    highlight: false,
  },
  {
    title: 'Bons plans locaux',
    desc: 'Restaurants, transports, activités. Offrez une vraie expérience de quartier.',
    highlight: true,
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <span className="text-[15px] font-bold tracking-[0.06em] text-white">lily</span>
        <Link
          href="/auth/login"
          className="text-white/60 hover:text-white transition-colors duration-150 text-sm font-medium"
        >
          Se connecter
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-0">
        <h1 className="text-[64px] md:text-[96px] lg:text-[112px] font-extrabold text-white leading-[0.92] tracking-[-0.03em] mb-8">
          La page parfaite<br />
          pour vos<br />
          locataires.
        </h1>
        <p className="text-[15px] md:text-[17px] text-white/40 max-w-sm mb-10 leading-relaxed">
          Wi-Fi, check-in, règlement. Tout ce dont vos locataires ont besoin, en un seul lien.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/auth/register"
            className="inline-flex items-center border border-white/30 text-white text-sm font-semibold px-6 py-3 hover:bg-white/[0.05] transition-all duration-150"
          >
            Créer mon espace
          </Link>
          <Link
            href="#fonctionnalites"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium transition-colors duration-150"
          >
            En savoir plus
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Visual strip */}
        <div className="mt-16 -mx-6 md:-mx-12 flex gap-px overflow-hidden">
          {['Check-in', 'Wi-Fi', 'Check-out', 'Règlement', 'Contact', 'Transport'].map((label) => (
            <div
              key={label}
              className="flex-1 min-w-[80px] bg-[#0A0A0A] border-t border-white/[0.06] flex flex-col justify-end px-4 md:px-6 py-6 md:py-8 h-[180px] md:h-[220px]"
            >
              <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="fonctionnalites" className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-start">

          {/* Left — numbered list */}
          <div className="space-y-0">
            {featureItems.map((f) => (
              <div key={f.num} className="border-t border-white/[0.08] py-10">
                <p className="text-[11px] font-bold text-white/20 tracking-[0.2em] mb-4">{f.num}</p>
                <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-3 tracking-tight leading-tight">{f.title}</h3>
                <p className="text-white/35 text-[14px] leading-relaxed mb-5">{f.desc}</p>
                <Link href="/auth/register" className="inline-flex items-center gap-1.5 text-[13px] text-white/30 hover:text-white/60 transition-colors font-semibold">
                  Commencer
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
            <div className="border-t border-white/[0.08]" />
          </div>

          {/* Right — app mockup */}
          <div className="md:sticky md:top-24">
            <div className="bg-[#0A0A0A] border border-white/[0.07] overflow-hidden">
              <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
                <p className="text-[9px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-1">Votre séjour</p>
                <p className="text-[17px] font-bold text-white">Studio Marais, Paris</p>
              </div>
              <div className="p-4 space-y-2">
                {/* Checkin */}
                <div className="border border-white/[0.07] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Check-in</p>
                    <p className="ml-auto text-[10px] text-white/20">À partir de 15h00</p>
                  </div>
                  <p className="text-[9px] font-semibold text-white/20 uppercase tracking-[0.18em] mb-1">Code d'accès</p>
                  <p className="text-white text-[32px] font-bold font-mono tracking-[0.25em] leading-none">4821</p>
                </div>
                {/* WiFi */}
                <div className="border border-white/[0.07] p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5">Wi-Fi</p>
                    <p className="text-white text-[13px] font-semibold">Freebox-Studio</p>
                    <p className="text-white/25 text-[11px] font-mono">mot2passeSecure!</p>
                  </div>
                </div>
                {/* Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {['Check-out', 'Règlement', 'Transport', 'Bons plans'].map((l) => (
                    <div key={l} className="border border-white/[0.07] px-3 py-3">
                      <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.15em]">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Split ── */}
      <section className="grid md:grid-cols-2">
        {/* Left */}
        <div className="bg-white px-8 md:px-16 py-20 md:py-28 flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[52px] font-extrabold text-black leading-[1.0] tracking-tight mb-6">
            Votre logement.<br />
            Vos règles.
          </h2>
          <p className="text-black/45 text-[15px] leading-relaxed mb-10 max-w-xs">
            Configurez chaque carte en quelques minutes. Modifiez à tout moment.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 border border-black/30 text-black text-sm font-semibold px-5 py-2.5 hover:bg-black/[0.05] transition-all duration-150"
            >
              Commencer
            </Link>
            <Link href="/auth/login" className="text-black/35 hover:text-black/60 text-sm font-semibold transition-colors">
              Se connecter →
            </Link>
          </div>
        </div>
        {/* Right — grid */}
        <div className="bg-black grid grid-cols-2 gap-px p-px border-l border-white/[0.06]">
          {['Check-in', 'Wi-Fi', 'Check-out', 'Contact'].map((l) => (
            <div key={l} className="bg-[#0A0A0A] flex flex-col justify-end px-8 py-10 min-h-[200px]">
              <p className="text-[11px] font-bold text-white/25 uppercase tracking-[0.2em]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cards ── */}
      <section className="bg-black border-t border-white/[0.06] px-6 md:px-12 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-20">
            <h2 className="text-[40px] md:text-[60px] font-extrabold text-white tracking-tight leading-[1.0] mb-4">
              Une expérience<br />complète
            </h2>
            <p className="text-white/30 text-[15px] max-w-xs leading-relaxed">
              Chaque carte répond à un besoin précis de vos locataires.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-white/[0.06]">
            {cards.map((c) => (
              <div
                key={c.title}
                className={`p-8 md:p-10 flex flex-col gap-4 ${c.highlight ? 'bg-accent' : 'bg-[#0A0A0A]'}`}
              >
                <div className={`w-8 h-8 border flex items-center justify-center ${c.highlight ? 'border-white/30' : 'border-white/[0.12]'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={c.highlight ? 'text-white/60' : 'text-white/30'}>
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <div>
                  <p className={`text-[16px] font-bold mb-2 ${c.highlight ? 'text-white' : 'text-white'}`}>{c.title}</p>
                  <p className={`text-[13px] leading-relaxed ${c.highlight ? 'text-white/70' : 'text-white/30'}`}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.06] px-6 md:px-12 py-8 bg-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-[14px] font-bold tracking-[0.06em] text-white/30">lily</span>
          <p className="text-white/15 text-xs">© 2026 Lily</p>
        </div>
      </footer>

    </main>
  )
}
