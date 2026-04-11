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
    icon: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
    title: 'Check-in digital',
    desc: 'Instructions, codes et accès accessibles 24h/24 depuis le téléphone du locataire.',
    highlight: false,
  },
  {
    icon: 'M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01',
    title: 'Wi-Fi instantané',
    desc: 'Réseau et mot de passe visibles d\'un coup d\'œil, avec bouton copier intégré.',
    highlight: false,
  },
  {
    icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2',
    title: 'Règlement clair',
    desc: 'Les règles du logement, toujours à portée. Moins de litiges, plus de sérénité.',
    highlight: false,
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z',
    title: 'Bons plans locaux',
    desc: 'Restaurants, transports, activités. Offrez une vraie expérience de quartier.',
    highlight: true,
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <span className="text-[16px] font-bold tracking-[0.06em] text-white">lily</span>
        <Link
          href="/auth/login"
          className="text-white/50 hover:text-white transition-colors duration-150 text-sm font-medium"
        >
          Se connecter
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-0">
        <div className="max-w-4xl">
          <h1 className="text-[58px] md:text-[88px] lg:text-[104px] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-8">
            La page parfaite<br />
            pour vos<br />
            <span className="text-accent">locataires.</span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/40 max-w-md mb-10 leading-relaxed">
            Wi-Fi, check-in, règlement. Tout ce dont vos locataires ont besoin, en un seul lien.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-white/[0.06] transition-all duration-150"
            >
              Créer mon espace
            </Link>
            <Link
              href="#comment"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-medium transition-colors duration-150"
            >
              En savoir plus
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Visual strip */}
        <div className="mt-16 -mx-6 md:-mx-12 flex gap-2 overflow-hidden h-[200px] md:h-[260px]">
          {[
            { bg: 'bg-[#0F1A15]', border: 'border-emerald-500/20', label: 'Check-in', color: 'text-emerald-400' },
            { bg: 'bg-[#0D1520]', border: 'border-blue-500/20',    label: 'Wi-Fi',    color: 'text-blue-400'    },
            { bg: 'bg-[#1A1500]', border: 'border-amber-500/20',   label: 'Check-out',color: 'text-amber-400'   },
            { bg: 'bg-[#12001A]', border: 'border-violet-500/20',  label: 'Contact',  color: 'text-violet-400'  },
            { bg: 'bg-[#1A0A10]', border: 'border-rose-500/20',    label: 'Bons plans',color:'text-rose-400'    },
            { bg: 'bg-[#001A1A]', border: 'border-cyan-500/20',    label: 'Transport',color: 'text-cyan-400'    },
          ].map((c) => (
            <div key={c.label} className={`flex-1 min-w-[120px] ${c.bg} border-t ${c.border} flex flex-col justify-end p-5`}>
              <p className={`text-xs font-semibold uppercase tracking-widest ${c.color}`}>{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features list + visual ── */}
      <section id="comment" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left */}
          <div className="space-y-12">
            {featureItems.map((f) => (
              <div key={f.num} className="border-t border-white/[0.07] pt-8">
                <p className="text-[11px] font-bold text-white/20 tracking-[0.2em] mb-3">{f.num}</p>
                <h3 className="text-[22px] font-bold text-white mb-2.5 tracking-tight">{f.title}</h3>
                <p className="text-white/35 text-[15px] leading-relaxed mb-4">{f.desc}</p>
                <Link href="/auth/register" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors font-medium">
                  Commencer
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Right — app preview */}
          <div className="md:sticky md:top-24">
            <div className="bg-[#0F0F15] border border-white/[0.07] rounded-3xl overflow-hidden">
              {/* Phone-style header */}
              <div className="px-6 pt-6 pb-4 border-b border-white/[0.05]">
                <p className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em] mb-1">Votre séjour</p>
                <p className="text-[18px] font-bold text-white">Studio Marais, Paris</p>
              </div>
              {/* Check-in preview */}
              <div className="mx-4 mt-4 bg-[#0F1A15] border border-emerald-500/20 rounded-2xl overflow-hidden">
                <div className="px-4 pt-3 pb-2.5 border-b border-emerald-500/10 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-emerald-500/15 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400/70">Check-in</span>
                  <span className="ml-auto text-[10px] text-white/25">À partir de 15h00</span>
                </div>
                <div className="px-4 py-4">
                  <p className="text-[9px] font-semibold text-emerald-500/40 uppercase tracking-[0.18em] mb-1.5">Code d'accès</p>
                  <p className="text-white text-[28px] font-bold font-mono tracking-[0.22em]">4821</p>
                </div>
              </div>
              {/* WiFi preview */}
              <div className="mx-4 mt-3 bg-[#0D1520] border border-blue-500/20 rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[12px] font-semibold">Freebox-Studio</p>
                  <p className="text-white/30 text-[11px] font-mono truncate">mot2passeSecure!</p>
                </div>
              </div>
              {/* Grid cards preview */}
              <div className="grid grid-cols-2 gap-2 m-4 mt-3">
                {[
                  { bg: 'bg-[#1A1500]', border: 'border-amber-500/20', color: 'text-amber-400/60', label: 'Check-out' },
                  { bg: 'bg-[#1A1A00]', border: 'border-yellow-500/20', color: 'text-yellow-400/60', label: 'Règlement' },
                ].map((c) => (
                  <div key={c.label} className={`${c.bg} border ${c.border} rounded-xl px-3 py-3`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${c.color}`}>{c.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Split section ── */}
      <section className="relative z-10 grid md:grid-cols-2 min-h-[500px]">
        {/* Left — dark with text */}
        <div className="bg-base border-t border-white/[0.06] px-8 md:px-16 py-20 md:py-28 flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[52px] font-extrabold text-white leading-[1.0] tracking-tight mb-6">
            Votre logement.<br />
            Vos règles.
          </h2>
          <p className="text-white/35 text-[15px] leading-relaxed mb-10 max-w-xs">
            Configurez chaque carte en quelques minutes. Activez, désactivez, modifiez à tout moment.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all duration-150"
            >
              Commencer
            </Link>
            <Link href="/auth/login" className="text-white/35 hover:text-white/60 text-sm font-medium transition-colors">
              Se connecter →
            </Link>
          </div>
        </div>

        {/* Right — card grid visual */}
        <div className="bg-[#08080A] border-t border-white/[0.06] grid grid-cols-2 gap-px p-px">
          {[
            { bg: 'bg-[#0F1A15]', label: 'Check-in',   color: 'text-emerald-400/50' },
            { bg: 'bg-[#0D1520]', label: 'Wi-Fi',       color: 'text-blue-400/50'    },
            { bg: 'bg-[#1A1500]', label: 'Check-out',   color: 'text-amber-400/50'   },
            { bg: 'bg-[#12001A]', label: 'Contact',     color: 'text-violet-400/50'  },
          ].map((c) => (
            <div key={c.label} className={`${c.bg} flex flex-col justify-end p-6 md:p-8 min-h-[180px]`}>
              <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${c.color}`}>{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cards grid ── */}
      <section className="relative z-10 bg-[#08080A] border-t border-white/[0.06] px-6 md:px-12 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-[36px] md:text-[52px] font-extrabold text-white tracking-tight leading-[1.05] mb-4">
              Une expérience<br />complète
            </h2>
            <p className="text-white/35 text-[15px] max-w-sm leading-relaxed">
              Chaque carte répond à un besoin précis de vos locataires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((c) => (
              <div
                key={c.title}
                className={`border rounded-2xl p-7 flex flex-col gap-5 ${
                  c.highlight
                    ? 'bg-accent border-accent/40'
                    : 'bg-[#0F0F15] border-white/[0.07] hover:border-white/[0.12] transition-colors duration-150'
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={c.highlight ? 'text-white/70' : 'text-white/30'}>
                  <path d={c.icon} />
                </svg>
                <div>
                  <p className={`text-[15px] font-bold mb-1.5 ${c.highlight ? 'text-white' : 'text-white'}`}>{c.title}</p>
                  <p className={`text-[13px] leading-relaxed ${c.highlight ? 'text-white/70' : 'text-white/30'}`}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.05] px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-[14px] font-bold tracking-[0.06em] text-white/30">lily</span>
          <p className="text-white/20 text-xs">© 2026 Lily</p>
        </div>
      </footer>

    </main>
  )
}
