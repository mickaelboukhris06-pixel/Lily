'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { saveCard } from '@/app/dashboard/actions'
import { CARD_CONFIGS, type CardType } from '@/lib/cards'
import { PhotoUpload } from './PhotoUpload'

interface CardEditorFormProps {
  propertyId: string
  type: CardType
  propertyName: string
  existingData: Record<string, unknown>
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  type = 'text',
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor={name}>
        {label}
        {required && <span className="text-red-400/70 ml-1">*</span>}
        {!required && <span className="text-white/15 ml-1">(optionnel)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full bg-surface-hi border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150"
        placeholder={placeholder}
      />
    </div>
  )
}

function TextareaField({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  rows = 5,
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
  rows?: number
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/40 mb-2 tracking-wide" htmlFor={name}>
        {label}
        {required && <span className="text-red-400/70 ml-1">*</span>}
        {!required && <span className="text-white/15 ml-1">(optionnel)</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        className="w-full bg-surface-hi border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all duration-150 resize-none"
        placeholder={placeholder}
      />
    </div>
  )
}

function CardFields({ type, data }: { type: CardType; data: Record<string, unknown> }) {
  const s = (v: unknown) => typeof v === 'string' ? v : ''

  switch (type) {
    case 'wifi':
      return (
        <>
          <Field label="Nom du réseau (SSID)" name="ssid" defaultValue={s(data.ssid)} placeholder="MonWiFi" required />
          <Field label="Mot de passe" name="password" defaultValue={s(data.password)} placeholder="••••••••" required />
        </>
      )
    case 'checkin':
      return (
        <>
          <TextareaField label="Instructions d'arrivée" name="instructions" defaultValue={s(data.instructions)} placeholder="La clé se trouve dans la boîte à clés au-dessus de la porte." required />
          <Field label="Code d'accès" name="code" defaultValue={s(data.code)} placeholder="1234" />
          <Field label="Localisation de la clé" name="keyLocation" defaultValue={s(data.keyLocation)} placeholder="Boîte à clés, concierge…" />
          <Field label="Heure de check-in" name="checkInTime" defaultValue={s(data.checkInTime)} placeholder="À partir de 15h00" />
        </>
      )
    case 'checkout':
      return (
        <>
          <TextareaField label="Instructions de départ" name="instructions" defaultValue={s(data.instructions)} placeholder="Laissez les clés sur la table, fermez bien la porte." required />
          <Field label="Heure de check-out" name="checkOutTime" defaultValue={s(data.checkOutTime)} placeholder="Avant 11h00" />
        </>
      )
    case 'rules':
      return (
        <TextareaField label="Règles du logement" name="rules" defaultValue={s(data.rules)} rows={8}
          placeholder={"- Pas de bruit après 22h\n- Non fumeur\n- Pas d'animaux\n- Respectez les voisins"} required />
      )
    case 'contact':
      return (
        <>
          <Field label="Prénom / nom" name="name" defaultValue={s(data.name)} placeholder="Marie Dupont" required />
          <Field label="Téléphone" name="phone" defaultValue={s(data.phone)} placeholder="+33 6 12 34 56 78" type="tel" />
          <Field label="Email" name="email" defaultValue={s(data.email)} placeholder="marie@example.com" type="email" />
          <TextareaField label="Note" name="notes" defaultValue={s(data.notes)} placeholder="N'hésitez pas à m'appeler en cas de problème." rows={3} />
        </>
      )
    case 'transport':
      return (
        <TextareaField label="Comment accéder au logement" name="instructions" defaultValue={s(data.instructions)} rows={7}
          placeholder="Métro ligne 5, station Oberkampf (10 min à pied). Bus 56 arrêt Voltaire." required />
      )
    case 'tips':
      return (
        <TextareaField label="Recommandations locales" name="recommendations" defaultValue={s(data.recommendations)} rows={8}
          placeholder={"Café : Le Petit Zinc (50m)\nRestaurant : Chez Paul (rue de Charonne)\nBoulangerie : Du Pain et des Idées"} required />
      )
  }
}

export function CardEditorForm({ propertyId, type, propertyName, existingData }: CardEditorFormProps) {
  const config = CARD_CONFIGS[type]
  const boundSave = saveCard.bind(null, propertyId, type)
  const [state, action, pending] = useActionState(boundSave, null)
  const formId = `card-form-${propertyId}`
  const hasPhotos = type === 'checkin' || type === 'checkout'
  const existingPhotos = Array.isArray(existingData.photos) ? (existingData.photos as string[]) : []

  return (
    <div className="max-w-md">
      <Link
        href={`/dashboard/logement/${propertyId}`}
        className="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-8 group text-xs w-fit"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
        {propertyName}
      </Link>

      <div className="flex w-fit items-center gap-2 bg-accent/[0.08] border border-accent/[0.15] rounded-lg px-3 py-1.5 mb-5 text-accent">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d={config.iconPath} />
        </svg>
        <span className="text-xs font-semibold">{config.label}</span>
      </div>

      <h1 className="text-2xl font-bold text-white tracking-tight mb-1.5">Configurer {config.label}</h1>
      <p className="text-white/30 text-sm mb-8">{config.subtitle}</p>

      <div className="bg-surface border border-white/[0.07] rounded-2xl p-8 space-y-5">
        {/* The form — text fields only */}
        <form id={formId} action={action} className="space-y-5">
          <CardFields type={type} data={existingData} />

          {state?.error && (
            <div className="bg-red-500/[0.07] border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-xs">{state.error}</p>
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 bg-accent text-white font-semibold py-3 rounded-xl hover:bg-[#8880ff] transition-all duration-200 shadow-[0_0_20px_rgba(121,113,255,0.18)] hover:shadow-[0_0_28px_rgba(121,113,255,0.28)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none text-sm"
            >
              {pending ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <Link
              href={`/dashboard/logement/${propertyId}`}
              className="px-5 py-3 bg-white/[0.05] border border-white/[0.07] text-white/40 font-semibold rounded-xl hover:bg-white/[0.08] hover:text-white/60 transition-all duration-150 text-sm"
            >
              Annuler
            </Link>
          </div>
        </form>

        {/* PhotoUpload is OUTSIDE the <form> — avoids React server-action form interception */}
        {hasPhotos && (
          <PhotoUpload formId={formId} existing={existingPhotos} />
        )}
      </div>
    </div>
  )
}
