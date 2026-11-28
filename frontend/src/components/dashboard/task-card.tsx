'use client'

import { Check, Clock, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Priority, Task } from '@/lib/moki-data'
import { AgentPill } from './shared'
import { useMoki } from './moki-store'

const priorityStyles: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-peach text-plum' },
  medium: { label: 'Medium', className: 'bg-butter text-plum' },
  low: { label: 'Low', className: 'bg-mint text-plum' },
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const p = priorityStyles[priority]
  return <span className={cn('rounded-full px-2.5 py-1 font-rounded text-xs', p.className)}>{p.label} priority</span>
}

export function TaskCard({ task, compact = false }: { task: Task; compact?: boolean }) {
  const { toggleTask, removeTask } = useMoki()
  const checkboxId = `task-${task.id}`

  return (
    <div
      className={cn(
        'group flex items-start gap-4 rounded-3xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft',
        task.done && 'bg-[#fbf8f3]',
      )}
    >
      <div className="relative mt-0.5">
        <input
          id={checkboxId}
          type="checkbox"
          checked={task.done}
          onChange={() => toggleTask(task.id)}
          className="peer absolute inset-0 size-6 cursor-pointer opacity-0"
        />
        <span
          aria-hidden="true"
          className={cn(
            'flex size-6 items-center justify-center rounded-full border-2 transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-lavender',
            task.done ? 'scale-110 border-plum bg-plum' : 'border-plum/25 group-hover:border-plum/50',
          )}
        >
          <Check className={cn('size-3.5 text-ivory transition-transform', task.done ? 'scale-100' : 'scale-0')} strokeWidth={3} />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <label
          htmlFor={checkboxId}
          className={cn(
            'block cursor-pointer font-medium leading-snug text-plum transition-colors',
            task.done && 'text-plum-soft line-through decoration-plum/30',
          )}
        >
          {task.title}
        </label>
        {!compact && task.note && <p className="mt-1 text-sm text-plum-soft">{task.note}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <PriorityBadge priority={task.priority} />
          <span className="inline-flex items-center gap-1 font-rounded text-xs text-plum-soft">
            <Clock className="size-3.5" aria-hidden="true" />
            {task.due}
          </span>
          <AgentPill id={task.agent} />
        </div>
      </div>

      {!compact && (
        <button
          type="button"
          onClick={() => removeTask(task.id)}
          className="rounded-full p-2 text-plum-soft opacity-0 transition-all hover:bg-peach/50 hover:text-plum focus-visible:opacity-100 group-hover:opacity-100"
          aria-label={`Delete ${task.title}`}
        >
          <Trash2 className="size-4" />
        </button>
      )}
    </div>
  )
}
