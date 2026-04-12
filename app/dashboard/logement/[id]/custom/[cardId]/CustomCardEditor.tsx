'use client'

import { useActionState, useTransition } from 'react'
import Link from 'next/link'
import {
  updateCustomCard,
  createCustomCardItem,
  deleteCustomCardItem,
  deleteCustomCard,
} from '@/app/dashboard/actions'

interface Item {
  id: string
  title: string
  content: string | null
  order: number
}

interface Card {
  id: string
  propertyId: string
  title: string
  emoji: string | null
  items: Item[]
}

export function CustomCardEditor({ card, propertyId }: { card: Card; propertyId: string }) {
  const [editState, editAction, editPending] = useActionState(updateCustomCard, null)
  const [addState, addAction, addPending] = useActionState(createCustomCardItem, null)
  const [, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Supprimer cette carte et tous ses éléments ?')) return
    startTransition(async () => { await deleteCustomCard(card.id) })
  }

  return (
    <div className="max-w-lg">
      <Link
        href={`/dashboard/logement/${propertyId}`}
        className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors duration-150 mb-8 group text-xs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
        Retour
      </Link>

      {/* Edit card title */}
      <div className="bg-[#0C0C14] border border-white/[0.09] p-6 mb-6">
        <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.18em] mb-4">Informations</p>
        <form action={editAction} className="space-y-4">
          <input type="hidden" name="cardId" value={card.id} />
          <div className="flex gap-3">
            <div className="w-20">
              <label className="block text-xs font-medium text-white/40 mb-2">Emoji</label>
              <input
                name="emoji"
                type="text"
                maxLength={2}
                defaultValue={card.emoji ?? ''}
                placeholder="🏠"
                className="w-full bg-[#111118] border border-white/[0.08] px-3 py-2.5 text-white text-center text-lg focus:outline-none focus:border-accent/60 transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-white/40 mb-2">Titre</label>
              <input
                name="title"
                type="text"
                required
                defaultValue={card.title}
                className="w-full bg-[#111118] border border-white/[0.08] px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all"
              />
            </div>
          </div>
          {editState?.error && <p className="text-red-400 text-xs">{editState.error}</p>}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={editPending}
              className="bg-accent text-white font-semibold px-5 py-2 hover:bg-[#8880ff] transition-all text-xs disabled:opacity-40"
            >
              {editPending ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-400/50 hover:text-red-400 text-xs transition-colors"
            >
              Supprimer la carte
            </button>
          </div>
        </form>
      </div>

      {/* Items list */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">
          {card.emoji && <span className="mr-1.5">{card.emoji}</span>}
          {card.title}
        </h2>
        <p className="text-white/25 text-xs mt-1">Éléments visibles par vos locataires.</p>
      </div>

      <div className="space-y-2 mb-6">
        {card.items.length === 0 && (
          <div className="border border-dashed border-white/[0.08] p-10 text-center">
            <p className="text-white/20 text-sm">Aucun élément. Ajoutez-en un ci-dessous.</p>
          </div>
        )}
        {card.items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>

      {/* Add item form */}
      <div className="bg-[#0C0C14] border border-white/[0.09] p-6">
        <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.18em] mb-4">Ajouter un élément</p>
        <form action={addAction} className="space-y-4">
          <input type="hidden" name="customCardId" value={card.id} />
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2">
              Titre <span className="text-red-400/70">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="Utiliser la lumière du salon"
              className="w-full bg-[#111118] border border-white/[0.08] px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2">
              Explication <span className="text-white/15">(optionnel)</span>
            </label>
            <textarea
              name="content"
              rows={3}
              placeholder="Appuyez sur le bouton carré à gauche de la porte…"
              className="w-full bg-[#111118] border border-white/[0.08] px-4 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-accent/60 transition-all resize-none"
            />
          </div>
          {addState?.error && <p className="text-red-400 text-xs">{addState.error}</p>}
          <button
            type="submit"
            disabled={addPending}
            className="w-full bg-white/[0.06] border border-white/[0.09] text-white/60 font-semibold py-2.5 hover:bg-white/[0.09] hover:text-white/80 transition-all text-sm disabled:opacity-40"
          >
            {addPending ? 'Ajout…' : '+ Ajouter'}
          </button>
        </form>
      </div>
    </div>
  )
}

function ItemRow({ item }: { item: Item }) {
  const [, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => { await deleteCustomCardItem(item.id) })
  }

  return (
    <div className="bg-[#0C0C14] border border-white/[0.07] px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-white">{item.title}</p>
          {item.content && (
            <p className="text-white/35 text-xs mt-1 leading-relaxed">{item.content}</p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-white/20 hover:text-red-400/70 transition-colors flex-shrink-0 mt-0.5"
          title="Supprimer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
