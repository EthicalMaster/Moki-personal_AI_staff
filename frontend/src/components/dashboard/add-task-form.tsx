'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { agents, type AgentId, type Priority } from '@/lib/moki-data'
import { useMoki } from './moki-store'

const priorities: { id: Priority; label: string; tone: string }[] = [
  { id: 'high', label: 'High', tone: 'bg-peach' },
  { id: 'medium', label: 'Medium', tone: 'bg-butter' },
  { id: 'low', label: 'Low', tone: 'bg-mint' },
]

const dueOptions = ['Today', 'Tomorrow', 'This week', 'Next week']

export function AddTaskForm({ onDone }: { onDone?: () => void }) {
  const { addTask } = useMoki()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [due, setDue] = useState('Today')
  const [agent, setAgent] = useState<AgentId>('task')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ title: title.trim(), priority, due, agent })
    setTitle('')
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="animate-pop-in rounded-[1.75rem] border border-border bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl text-plum">New task</h2>
        {onDone && (
          <button type="button" onClick={onDone} className="rounded-full p-1.5 hover:bg-muted" aria-label="Cancel">
            <X className="size-4" />
          </button>
        )}
      </div>

      <label htmlFor="task-title" className="sr-only">
        Task title
      </label>
      <input
        id="task-title"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Book flights for the Goa trip"
        className="mt-3 w-full rounded-2xl border border-input bg-ivory px-4 py-3 text-plum placeholder:text-plum-soft/70 focus:border-lavender-deep focus:outline-none focus:ring-4 focus:ring-lavender/50"
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <fieldset>
          <legend className="mb-2 font-rounded text-xs text-plum-soft">Priority</legend>
          <div className="flex gap-1.5">
            {priorities.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriority(p.id)}
                aria-pressed={priority === p.id}
                className={cn(
                  'flex-1 rounded-full px-2 py-1.5 text-sm font-medium text-plum transition-all',
                  priority === p.id ? `${p.tone} ring-2 ring-plum` : 'bg-muted hover:bg-muted/70',
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="task-due" className="mb-2 block font-rounded text-xs text-plum-soft">
            Due
          </label>
          <select
            id="task-due"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="w-full rounded-full border border-input bg-ivory px-3 py-1.5 text-sm text-plum focus:outline-none focus:ring-4 focus:ring-lavender/50"
          >
            {dueOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="task-agent" className="mb-2 block font-rounded text-xs text-plum-soft">
            Assign to
          </label>
          <select
            id="task-agent"
            value={agent}
            onChange={(e) => setAgent(e.target.value as AgentId)}
            className="w-full rounded-full border border-input bg-ivory px-3 py-1.5 text-sm text-plum focus:outline-none focus:ring-4 focus:ring-lavender/50"
          >
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nickname} · {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!title.trim()}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
      >
        <Plus className="size-4" aria-hidden="true" />
        Add task
      </button>
    </form>
  )
}
