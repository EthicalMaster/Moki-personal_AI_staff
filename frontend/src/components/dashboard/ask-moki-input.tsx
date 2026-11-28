'use client'

import { useState } from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { suggestedPrompts } from '@/lib/moki-data'

const chipTones = ['bg-lavender', 'bg-butter', 'bg-mint', 'bg-peach']

export function AskMokiInput({
  onSend,
  disabled,
  showSuggestions = true,
  autoFocus,
}: {
  onSend: (text: string) => void
  disabled?: boolean
  showSuggestions?: boolean
  autoFocus?: boolean
}) {
  const [value, setValue] = useState('')

  function send(text: string) {
    if (!text.trim() || disabled) return
    onSend(text)
    setValue('')
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(value)
        }}
        className="flex items-end gap-2 rounded-[1.75rem] border border-border bg-white p-2 pl-4 shadow-soft transition-shadow focus-within:shadow-lift focus-within:ring-4 focus-within:ring-lavender/50"
      >
        <Sparkles className="mb-3 size-5 shrink-0 text-[#8f78e8]" aria-hidden="true" />
        <label htmlFor="ask-moki" className="sr-only">
          Ask Moki
        </label>
        <textarea
          id="ask-moki"
          rows={1}
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              e.preventDefault()
              send(value)
            }
          }}
          placeholder="What can I take off your plate today?"
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent py-2.5 text-plum placeholder:text-plum-soft/70 focus:outline-none field-sizing-content"
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-plum text-ivory transition-all hover:scale-105 disabled:scale-100 disabled:opacity-30"
          aria-label="Send to Moki"
        >
          <ArrowUp className="size-5" />
        </button>
      </form>

      {showSuggestions && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Suggested prompts">
          {suggestedPrompts.map((p, i) => (
            <li key={p}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => send(p)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-plum transition-all hover:-translate-y-0.5 hover:shadow-soft disabled:opacity-50',
                  chipTones[i % chipTones.length],
                )}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
