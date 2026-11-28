'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { agents, type AgentId } from '@/lib/moki-data'
import { useMoki } from '../moki-store'
import { PageHeader } from '../shared'

const starterPrompts: Record<AgentId, string> = {
  research: 'Research and compare project-management tools for my team',
  planner: 'Plan my week around Friday’s pitch',
  task: 'Organise my tasks for today',
  communication: 'Write a reply to Priya about the proposal',
}

export function AgentsView() {
  const { setView, sendMessage } = useMoki()
  const [paused, setPaused] = useState<Record<AgentId, boolean>>({
    research: false,
    planner: false,
    task: false,
    communication: false,
  })

  return (
    <div>
      <PageHeader
        eyebrow="My Agents"
        title="Your crew, at your service."
        description="Each agent has its own strengths. Pause one any time, or give it a job directly."
      />
      <ul className="grid gap-5 md:grid-cols-2">
        {agents.map((a) => {
          const Icon = a.icon
          const isPaused = paused[a.id]
          return (
            <li
              key={a.id}
              className={cn(
                'group flex flex-col gap-5 rounded-[2rem] p-6 transition-all duration-300 hover:shadow-lift sm:flex-row',
                a.bg,
                isPaused && 'opacity-60 saturate-50',
              )}
            >
              <div className="relative size-32 shrink-0 self-center overflow-hidden rounded-3xl bg-white/50 sm:self-start">
                <Image
                  src={a.image}
                  alt={`${a.name} illustration`}
                  fill
                  sizes="128px"
                  className="scale-[1.7] object-cover mix-blend-multiply transition-transform duration-500 group-hover:rotate-3 group-hover:scale-[1.85]"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="flex items-center gap-2 font-serif text-2xl text-plum">
                      {a.nickname}
                      <Icon className="size-5 text-plum/60" aria-hidden="true" />
                    </h2>
                    <p className="font-rounded text-sm text-plum-soft">
                      {a.name} · {a.role}
                    </p>
                  </div>
                  <label className="flex cursor-pointer items-center gap-2">
                    <span className="sr-only">{isPaused ? `Resume ${a.nickname}` : `Pause ${a.nickname}`}</span>
                    <input
                      type="checkbox"
                      role="switch"
                      checked={!isPaused}
                      onChange={() => setPaused((p) => ({ ...p, [a.id]: !p[a.id] }))}
                      className="peer sr-only"
                    />
                    <span className="relative h-6 w-11 rounded-full bg-plum/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:bg-plum peer-checked:after:translate-x-5 peer-focus-visible:ring-4 peer-focus-visible:ring-white" />
                  </label>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-plum/80">{a.description}</p>
                <p className="mt-2 font-rounded text-sm italic text-plum-soft">
                  {'“'}
                  {a.personality}
                  {'”'}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${a.nickname} skills`}>
                  {a.skills.map((s) => (
                    <li key={s} className="rounded-full bg-white/70 px-2.5 py-1 font-rounded text-xs text-plum">
                      {s}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={isPaused}
                  onClick={() => {
                    sendMessage(starterPrompts[a.id])
                    setView('chat')
                  }}
                  className="mt-5 self-start rounded-full bg-plum px-4 py-2 text-sm font-semibold text-ivory transition-transform hover:-translate-y-0.5 disabled:opacity-40"
                >
                  {isPaused ? 'Paused' : `Give ${a.nickname} a job`}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
