import type { Agent } from '@/lib/moki-data'
import { cn } from '@/lib/utils'
import { AgentAvatar } from './shared'

export function AgentStatusCard({ agent }: { agent: Agent }) {
  const Icon = agent.icon
  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-[1.5rem] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        agent.bg,
      )}
    >
      <div className="flex items-start justify-between">
        <AgentAvatar id={agent.id} size="md" className="bg-white/70 ring-2 ring-white transition-transform group-hover:scale-110" />
        <span className="flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 font-rounded text-xs text-plum">
          <span className="relative flex size-2">
            <span className={cn('absolute inline-flex size-full animate-ping rounded-full opacity-60', agent.dot)} />
            <span className={cn('relative inline-flex size-2 rounded-full', agent.dot)} />
          </span>
          Working
        </span>
      </div>
      <h3 className="mt-4 flex items-center gap-2 font-serif text-xl text-plum">
        {agent.name}
        <Icon className="size-4 text-plum/60" aria-hidden="true" />
      </h3>
      <p className="font-rounded text-sm text-plum-soft">
        {agent.nickname} · {agent.role}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-plum/80">{agent.status}</p>
      <p className="mt-4 border-t border-plum/10 pt-3 font-rounded text-xs text-plum-soft">
        {agent.tasksToday} tasks handled today
      </p>
    </div>
  )
}
