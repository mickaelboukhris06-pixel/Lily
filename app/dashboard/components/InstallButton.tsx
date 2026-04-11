'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallButton() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showIOSHint, setShowIOSHint] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)
    setIsIOS(ios)

    const handler = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (isInstalled || dismissed) return null
  if (!prompt && !isIOS) return null

  async function handleInstall() {
    if (isIOS) {
      setShowIOSHint(true)
      return
    }
    if (!prompt) return
    await prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setIsInstalled(true)
    setPrompt(null)
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-sm">
        <div className="bg-[#0C0C14] border border-white/[0.12] px-4 py-3 flex items-center gap-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          <div className="w-9 h-9 overflow-hidden flex-shrink-0 bg-[#EDE8E1] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon.svg" alt="Lily" className="w-7 h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold leading-tight">Installer l'app</p>
            <p className="text-white/35 text-[11px] mt-0.5">Accédez à votre espace en un tap</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleInstall}
              className="bg-accent text-white text-[11px] font-semibold px-3 py-1.5 hover:bg-[#8880ff] transition-colors"
            >
              Installer
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/25 hover:text-white/50 transition-colors p-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* iOS modal */}
      {showIOSHint && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-5 pb-8" onClick={() => setShowIOSHint(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative bg-[#0C0C14] border border-white/[0.12] p-6 w-full max-w-sm shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            <h3 className="text-white font-semibold text-[15px] mb-4">Installer l'app</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <p className="text-white/60 text-sm">
                  Appuyez sur le bouton <span className="text-white font-medium">Partager</span>
                  {' '}<svg className="inline w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                  {' '}dans Safari
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <p className="text-white/60 text-sm">Faites défiler et appuyez sur <span className="text-white font-medium">« Sur l'écran d'accueil »</span></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <p className="text-white/60 text-sm">Appuyez sur <span className="text-white font-medium">Ajouter</span></p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSHint(false)}
              className="w-full mt-5 bg-white/[0.06] text-white/60 text-sm font-medium py-2.5 hover:bg-white/[0.09] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  )
}
