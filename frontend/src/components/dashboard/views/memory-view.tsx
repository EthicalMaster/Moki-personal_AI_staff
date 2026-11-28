'use client'

import { useState } from 'react'
import { BrainCircuit, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memories as initialMemories, type Memory } from '@/lib/moki-data'
import { EmptyState, PageHeader } from '../shared'

const categoryTone: Record<Memory['category'], string> = {
  Preferences: 'bg-lavender',
  People: 'bg-peach',
  Goals: 'bg-mint',
  Routines: 'bg-butter',
}

const categories = ['All', 'Preferences', 'People', 'Goals', 'Routines'] as const

export function MemoryView() {
  const [items, setItems] = useState(initialMemories)
  const [cat, setCat] = useState<(typeof categories)[number]>('All')
  const visible = items.filter((m) => cat === 'All' || m.category === cat)

  return (
    <div>
      <PageHeader
        eyebrow="Memory"
        title="Things Moki knows about you."
        description="Moki learns as you go so you never repeat yourself. You can forget anything, anytime."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Memory categories">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all',
              cat === c ? 'border-plum bg-plum text-ivory' : 'border-border bg-white text-plum hover:bg-muted',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={BrainCircuit}
          title="A fresh slate"
          body="No memories here yet. Keep chatting and Moki will pick up on what matters to you."
        />
      ) : (
        <ul className="columns-1 gap-4 sm:columns-2 xl:columns-3">
          {visible.map((m) => (
            <li
              key={m.id}
              className="group relative mb-4 break-inside-avoid rounded-[1.5rem] border border-border bg-white p-5 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className={cn('rounded-full px-2.5 py-1 font-rounded text-xs text-plum', categoryTone[m.category])}>
                {m.category}
              </span>
              <p className="mt-3 font-serif text-lg leading-snug text-plum">{m.text}</p>
              <p className="mt-3 font-rounded text-xs text-plum-soft">Learned {m.learned}</p>
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== m.id))}
                className="absolute right-3 top-3 rounded-full p-1.5 text-plum-soft opacity-0 transition-opacity hover:bg-muted focus-visible:opacity-100 group-hover:opacity-100"
                aria-label="Forget this memory"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
