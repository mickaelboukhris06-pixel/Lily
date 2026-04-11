'use client'

import { useState, useTransition } from 'react'
import { upload } from '@vercel/blob/client'
import { updateCoverPhoto } from '@/app/dashboard/actions'

export function CoverPhotoUpload({ propertyId, current }: { propertyId: string; current: string | null }) {
  const [preview, setPreview] = useState<string | null>(current)
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const busy = uploading || isPending

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setUploading(true)
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      })
      setPreview(blob.url)
      startTransition(() => { updateCoverPhoto(propertyId, blob.url) })
    } finally {
      setUploading(false)
    }
  }

  function remove() {
    setPreview(null)
    startTransition(() => { updateCoverPhoto(propertyId, null) })
  }

  return (
    <div className="bg-[#0C0C14] border border-white/[0.07] overflow-hidden mb-8">
      {preview ? (
        <div className="relative h-36 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Photo de couverture" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <label className={`inline-flex items-center gap-1.5 bg-black/50 border border-white/20 px-3 py-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors cursor-pointer ${busy ? 'opacity-40 pointer-events-none' : ''}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
              Changer
              <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
            </label>
            <button type="button" onClick={remove} disabled={busy}
              className="inline-flex items-center gap-1.5 bg-black/50 border border-red-500/30 px-3 py-1.5 text-red-400/80 hover:text-red-400 text-xs font-medium transition-colors disabled:opacity-40">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center gap-3 h-28 cursor-pointer group transition-colors ${busy ? 'opacity-40 pointer-events-none' : 'hover:bg-white/[0.02]'}`}>
          <div className="w-9 h-9 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.14] transition-colors">
            {busy ? (
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 group-hover:text-white/50 transition-colors">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            )}
          </div>
          <div className="text-center">
            <p className="text-white/40 text-xs font-medium group-hover:text-white/60 transition-colors">
              {busy ? 'Upload en cours…' : 'Ajouter une photo de couverture'}
            </p>
            <p className="text-white/15 text-[11px] mt-0.5">Photo de la ville, du quartier…</p>
          </div>
          <input type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
        </label>
      )}
    </div>
  )
}
