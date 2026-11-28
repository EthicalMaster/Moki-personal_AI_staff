'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { RotateCcw } from 'lucide-react'
import { agentById } from '@/lib/moki-data'
import { MokiMark } from '@/components/moki-logo'
import { useMoki } from '../moki-store'
import { AskMokiInput } from '../ask-moki-input'
import { AgentAvatar, AgentPill, PageHeader } from '../shared'

export function ChatView() {
  const { messages, thinking, sendMessage, clearChat } = useMoki()
  const endRef = useRef<HTMLDivElement>(null)
  const empty = messages.length === 0 && !thinking

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, thinking])

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col">
      <PageHeader
        eyebrow="Ask Moki"
        title="What’s on your mind?"
        action={
          !empty && (
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-plum hover:bg-muted"
            >
              <RotateCcw className="size-4" aria-hidden="true" /> New chat
            </button>
          )
        }
      />

      <div className="flex-1" aria-live="polite">
        {empty ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="relative size-48 overflow-hidden rounded-full bg-[#f7f1e5]">
              <Image src="/images/moki-mascot.png" alt="Moki mascot waving hello" fill sizes="192px" className="scale-[1.9] object-cover" />
            </div>
            <h2 className="mt-6 font-serif text-3xl text-plum">Hi, I&apos;m Moki.</h2>
            <p className="mt-2 max-w-md text-plum-soft">
              Tell me what you need and I&apos;ll bring in the right specialist. Try one of the ideas below to see the crew in action.
            </p>
          </div>
        ) : (
          <ol className="flex flex-col gap-5">
            {messages.map((m) =>
              m.role === 'user' ? (
                <li key={m.id} className="flex animate-pop-in justify-end">
                  <p className="max-w-[85%] rounded-[1.5rem] rounded-br-md bg-plum px-5 py-3 text-ivory sm:max-w-[70%]">{m.text}</p>
                </li>
              ) : (
                <li key={m.id} className="flex animate-pop-in gap-3">
                  <MokiMark className="mt-1 size-9 shrink-0" />
                  <div className="max-w-[90%] rounded-[1.5rem] rounded-tl-md border border-border bg-white px-5 py-4 shadow-soft sm:max-w-[75%]">
                    {m.agents && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {m.agents.map((a) => (
                          <AgentPill key={a} id={a} />
                        ))}
                      </div>
                    )}
                    <p className="leading-relaxed text-plum">{m.text}</p>
                    {m.bullets && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {m.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 rounded-xl bg-ivory px-3 py-2 text-sm text-plum">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#8f78e8]" aria-hidden="true" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" className="rounded-full bg-mint px-3 py-1.5 text-xs font-medium text-plum transition-transform hover:-translate-y-0.5">
                        Looks good
                      </button>
                      <button type="button" className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-plum transition-transform hover:-translate-y-0.5">
                        Tweak it
                      </button>
                    </div>
                  </div>
                </li>
              ),
            )}
            {thinking && (
              <li className="flex animate-pop-in gap-3">
                <MokiMark className="mt-1 size-9 shrink-0" />
                <div className="flex items-center gap-3 rounded-[1.5rem] rounded-tl-md border border-border bg-white px-5 py-3 shadow-soft">
                  <div className="flex -space-x-2">
                    {thinking.map((a) => (
                      <AgentAvatar key={a} id={a} size="sm" className="ring-2 ring-white" />
                    ))}
                  </div>
                  <span className="text-sm text-plum-soft">
                    {thinking.map((a) => agentById(a).nickname).join(' & ')} {thinking.length > 1 ? 'are' : 'is'} on it
                  </span>
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="size-1.5 animate-bounce rounded-full bg-plum/40" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </span>
                </div>
              </li>
            )}
          </ol>
        )}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-4 mt-8">
        <AskMokiInput onSend={sendMessage} disabled={!!thinking} showSuggestions={empty} autoFocus />
      </div>
    </div>
  )
}
