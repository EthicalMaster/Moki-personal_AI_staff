'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { weekSchedule } from '@/lib/moki-data'
import { Card, CardTitle, PageHeader } from '../shared'
import { ScheduleTimeline } from '../schedule-timeline'

export function ScheduleView() {
  const [selected, setSelected] = useState(4)
  const day = weekSchedule[selected]

  return (
    <div>
      <PageHeader
        eyebrow="My Schedule"
        title="A week with room to breathe."
        description="Sunny builds your days around focus, not just meetings."
      />

      <div role="tablist" aria-label="Choose a day" className="mb-6 grid grid-cols-5 gap-2 sm:gap-3">
        {weekSchedule.map((d, i) => (
          <button
            key={d.day}
            type="button"
            role="tab"
            aria-selected={selected === i}
            onClick={() => setSelected(i)}
            className={cn(
              'flex flex-col items-center rounded-3xl border px-2 py-4 transition-all hover:-translate-y-0.5',
              selected === i ? 'border-plum bg-plum text-ivory shadow-lift' : 'border-border bg-white text-plum',
            )}
          >
            <span className="font-rounded text-sm opacity-75">{d.day}</span>
            <span className="font-serif text-3xl">{d.date}</span>
            <span className="mt-1 flex gap-1" aria-label={`${d.events.length} events`}>
              {d.events.slice(0, 4).map((e) => (
                <span key={e.id} className={cn('size-1.5 rounded-full', selected === i ? 'bg-butter' : 'bg-plum/30')} />
              ))}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardTitle>
            {day.day}, Nov {day.date}
          </CardTitle>
          <ScheduleTimeline events={day.events} />
        </Card>
        <Card className="bg-butter">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/80">
            <ShieldCheck className="size-6 text-plum" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-serif text-2xl text-plum">Focus time protected</h2>
          <p className="mt-2 text-plum/80">
            Sunny declined two meeting requests that clashed with your 2–4 PM deep-work block and suggested Friday instead.
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/70 p-3">
              <dt className="font-rounded text-xs text-plum-soft">Focus this week</dt>
              <dd className="font-serif text-2xl text-plum">9.5 hrs</dd>
            </div>
            <div className="rounded-2xl bg-white/70 p-3">
              <dt className="font-rounded text-xs text-plum-soft">Meetings</dt>
              <dd className="font-serif text-2xl text-plum">6</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
