'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'

interface Preview {
  objectUrl: string
  blobUrl: string | null
}

export function PhotoUpload({ existing = [], formId }: { existing?: string[]; formId: string }) {
  const [kept, setKept] = useState<string[]>(existing)
  const [previews, setPreviews] = useState<Preview[]>([])

  function removeKept(url: string) {
    setKept(k => k.filter(u => u !== url))
  }

  function removePreview(objectUrl: string) {
    setPreviews(prev => {
      const p = prev.find(x => x.objectUrl === objectUrl)
      if (p) URL.revokeObjectURL(p.objectUrl)
      return prev.filter(x => x.objectUrl !== objectUrl)
    })
  }

  async function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    e.target.value = ''

    const placeholders: Preview[] = files.map(f => ({
      objectUrl: URL.createObjectURL(f),
      blobUrl: null,
    }))
    setPreviews(prev => [...prev, ...placeholders])

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const objectUrl = placeholders[i].objectUrl
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        })
        setPreviews(prev =>
          prev.map(p => p.objectUrl === objectUrl ? { ...p, blobUrl: blob.url } : p)
        )
      } catch {
        setPreviews(prev => prev.filter(p => p.objectUrl !== objectUrl))
        URL.revokeObjectURL(objectUrl)
      }
    }
  }

  const uploading = previews.some(p => p.blobUrl === null)
  const uploadedUrls = previews.filter(p => p.blobUrl !== null).map(p => p.blobUrl as string)

  return (
    <div>
      {kept.map((url, i) => (
        <input key={`keep-${i}`} type="hidden" name="photo_keep" value={url} form={formId} />
      ))}
      {uploadedUrls.map((url, i) => (
        <input key={`new-${i}`} type="hidden" name="photos" value={url} form={formId} />
      ))}

      <p className="text-xs font-medium text-white/40 mb-2 tracking-wide">
        Photos <span className="text-white/15">(optionnel)</span>
      </p>

      {(kept.length > 0 || previews.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {kept.map((url, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/[0.08] flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeKept(url)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-white/80 hover:text-white">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
          {previews.map((p, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/[0.08] flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.objectUrl} alt="" className="w-full h-full object-cover" />
              {p.blobUrl === null ? (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
              ) : (
                <button type="button" onClick={() => removePreview(p.objectUrl)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-white/80 hover:text-white">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* input enfant direct du label — Chrome traite ça comme un clic direct sur l'input */}
      <label
        style={{ display: 'inline-flex', cursor: uploading ? 'not-allowed' : 'pointer' }}
        className={`items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm transition-all duration-150 select-none ${
          uploading ? 'text-white/30 pointer-events-none' : 'text-white/50 hover:text-white/70 hover:bg-white/[0.08]'
        }`}
      >
        {uploading ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Upload en cours…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            Ajouter des photos
          </>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onFilesChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  )
}
