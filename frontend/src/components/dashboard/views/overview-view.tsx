'use client'

import { useState } from 'react'
import { ArrowRight, CalendarDays, CheckCircle2, Hourglass, PartyPopper, Plus, TriangleAlert } from 'lucide-react'
import { agents, schedule } from '@/lib/moki-data'
import { useMoki } from '../moki-store'
import { AskMokiInput } from '../ask-moki-input'
import { Card, CardTitle, EmptyState } from '../shared'
import { TaskCard } from '../task-card'
import { AddTaskForm } from '../add-task-form'
import { AgentStatusCard } from '../agent-status-card'
import { ScheduleTimeline } from '../schedule-timeline'

function greeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function OverviewView() {
  const { tasks, setView, sendMessage } = useMoki()
  const [adding, setAdding] = useState(false)
  const [now] = useState(() => new Date())

  const done = tasks.filter((t) => t.done).length
  const pending = tasks.filter((t) => !t.done)
  const deadlines = pending.filter((t) => t.priority === 'high' || t.due.startsWith('Today')).length
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  const stats = [
    { label: 'Tasks completed', value: done, icon: CheckCircle2, tone: 'bg-lavender' },
    { label: 'Pending tasks', value: pending.length, icon: Hourglass, tone: 'bg-butter' },
    { label: 'Upcoming deadlines', value: deadlines, icon: TriangleAlert, tone: 'bg-peach' },
    { label: 'Events today', value: schedule.length, icon: CalendarDays, tone: 'bg-mint' },
  ]

  const dateLabel = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-[2rem] bg-lavender p-6 sm:p-8">
        <div aria-hidden="true" className="absolute -right-10 -top-10 size-48 rounded-full bg-blush/70" />
        <div aria-hidden="true" className="absolute -bottom-16 right-24 size-40 rounded-full bg-butter/70" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-rounded text-sm text-plum-soft" suppressHydrationWarning>
              {dateLabel} · {greeting(now.getHours())}, Aanya
            </p>
            <h1 className="mt-2 max-w-xl text-balance font-serif text-4xl font-medium leading-tight tracking-tight text-plum sm:text-5xl">
              Hey there! Ready to make today easier?
            </h1>
            <p className="mt-3 max-w-lg text-plum/75">
              Your crew has already cleared {done} {done === 1 ? 'thing' : 'things'} off your list. Here&apos;s what&apos;s
              left.
            </p>
          </div>
          <div className="w-full rounded-3xl bg-white/80 p-4 backdrop-blur sm:w-64">
            <div className="flex items-baseline justify-between">
              <span className="font-rounded text-sm text-plum-soft">Today&apos;s progress</span>
              <span className="font-serif text-2xl text-plum">{progress}%</span>
            </div>
            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-plum/10"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Tasks completed today"
            >
              <div className="h-full rounded-full bg-plum transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Daily overview">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <li key={label} className="group rounded-[1.5rem] border border-border bg-white p-4 shadow-soft transition-transform hover:-translate-y-0.5 sm:p-5">
            <span className={`flex size-10 items-center justify-center rounded-2xl ${tone} transition-transform group-hover:rotate-6`}>
              <Icon className="size-5 text-plum" aria-hidden="true" />
            </span>
            <p className="mt-4 font-serif text-4xl text-plum">{value}</p>
            <p className="font-rounded text-sm text-plum-soft">{label}</p>
          </li>
        ))}
      </ul>

      <Card className="bg-[#fffaf0]">
        <CardTitle>Ask Moki</CardTitle>
        <AskMokiInput
          onSend={(text) => {
            sendMessage(text)
            setView('chat')
          }}
        />
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardTitle
            action={
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAdding((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-sm font-medium text-plum transition-transform hover:-translate-y-0.5"
                >
                  <Plus className="size-4" aria-hidden="true" /> New
                </button>
                <button
                  type="button"
                  onClick={() => setView('tasks')}
                  className="inline-flex items-center gap-1 text-sm font-medium text-plum-soft hover:text-plum"
                >
                  All <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            }
          >
            Upcoming tasks
          </CardTitle>
          <div className="flex flex-col gap-3">
            {adding && <AddTaskForm onDone={() => setAdding(false)} />}
            {pending.length === 0 ? (
              <EmptyState
                icon={PartyPopper}
                tone="bg-mint"
                title="Your plate is clear!"
                body="Nothing pending. Pip is doing a little happy dance."
              />
            ) : (
              pending.slice(0, 4).map((t) => <TaskCard key={t.id} task={t} compact />)
            )}
          </div>
        </Card>

        <Card>
          <CardTitle
            action={
              <button
                type="button"
                onClick={() => setView('schedule')}
                className="inline-flex items-center gap-1 text-sm font-medium text-plum-soft hover:text-plum"
              >
                Week <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            }
          >
            Today&apos;s schedule
          </CardTitle>
          <ScheduleTimeline events={schedule} />
        </Card>
      </div>

      <section aria-labelledby="agent-activity">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="agent-activity" className="font-serif text-2xl text-plum">
            Agent activity
          </h2>
          <button
            type="button"
            onClick={() => setView('agents')}
            className="inline-flex items-center gap-1 text-sm font-medium text-plum-soft hover:text-plum"
          >
            Meet the crew <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((a) => (
            <li key={a.id}>
              <AgentStatusCard agent={a} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
