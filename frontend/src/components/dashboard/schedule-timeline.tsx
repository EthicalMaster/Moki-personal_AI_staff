import { cn } from '@/lib/utils'
import type { ScheduleEvent } from '@/lib/moki-data'

const toneClass: Record<ScheduleEvent['tone'], string> = {
  lavender: 'bg-lavender',
  butter: 'bg-butter',
  mint: 'bg-mint',
  peach: 'bg-peach',
  blush: 'bg-blush',
}

export function ScheduleTimeline({ events }: { events: ScheduleEvent[] }) {
  return (
    <ol className="relative flex flex-col gap-3">
      {events.map((e) => (
        <li key={e.id} className="flex gap-3">
          <span className="w-12 shrink-0 pt-3 text-right font-rounded text-sm text-plum-soft">{e.time}</span>
          <div
            className={cn(
              'flex-1 rounded-2xl px-4 py-3 transition-transform hover:translate-x-1',
              toneClass[e.tone],
            )}
          >
            <p className="font-medium text-plum">{e.title}</p>
            <p className="font-rounded text-xs text-plum-soft">
              {e.time}–{e.end} · {e.place}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export { toneClass }
