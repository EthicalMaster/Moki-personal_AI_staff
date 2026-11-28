'use client'

import { useState } from 'react'
import { ClipboardCheck, Plus, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMoki } from '../moki-store'
import { EmptyState, PageHeader } from '../shared'
import { TaskCard } from '../task-card'
import { AddTaskForm } from '../add-task-form'

const filters = [
  { id: 'open', label: 'To do' },
  { id: 'done', label: 'Done' },
  { id: 'all', label: 'All' },
] as const

type Filter = (typeof filters)[number]['id']

export function TasksView() {
  const { tasks, setView } = useMoki()
  const [filter, setFilter] = useState<Filter>('open')
  const [adding, setAdding] = useState(false)

  const visible = tasks.filter((t) => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done))
  const counts = {
    open: tasks.filter((t) => !t.done).length,
    done: tasks.filter((t) => t.done).length,
    all: tasks.length,
  }

  return (
    <div>
      <PageHeader
        eyebrow="My Tasks"
        title="Small steps, big relief."
        description="Pip keeps this list honest. Tick things off, add new ones, or hand them to an agent."
        action={
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="inline-flex items-center gap-2 self-start rounded-full bg-plum px-5 py-3 text-sm font-semibold text-ivory shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <Plus className="size-4" aria-hidden="true" /> Add task
          </button>
        }
      />

      <div role="tablist" aria-label="Filter tasks" className="mb-5 inline-flex gap-1 rounded-full border border-border bg-white p-1">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            type="button"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              filter === f.id ? 'bg-lavender text-plum' : 'text-plum-soft hover:text-plum',
            )}
          >
            {f.label}
            <span className="ml-1.5 font-rounded text-xs opacity-70">{counts[f.id]}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {adding && <AddTaskForm onDone={() => setAdding(false)} />}
        {visible.length === 0 ? (
          filter === 'done' ? (
            <EmptyState
              icon={Sparkles}
              tone="bg-butter"
              title="Nothing ticked off yet"
              body="Your first win of the day is just one checkbox away."
            />
          ) : (
            <EmptyState
              icon={ClipboardCheck}
              tone="bg-mint"
              title="All clear. Seriously."
              body="You’ve finished everything. Want Moki to plan something fun for the rest of the day?"
              action={
                <button
                  type="button"
                  onClick={() => setView('chat')}
                  className="rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-ivory"
                >
                  Ask Moki
                </button>
              }
            />
          )
        ) : (
          visible.map((t) => <TaskCard key={t.id} task={t} />)
        )}
      </div>
    </div>
  )
}
