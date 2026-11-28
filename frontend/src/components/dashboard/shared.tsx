import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { agentById, type AgentId } from '@/lib/moki-data'

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-rounded text-sm text-plum-soft">{eyebrow}</p>
        <h1 className="mt-1 text-balance font-serif text-4xl font-medium tracking-tight text-plum sm:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-pretty text-plum-soft">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('rounded-[1.75rem] border border-border bg-white p-5 shadow-soft sm:p-6', className)}>{children}</div>
}

export function CardTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-serif text-xl text-plum">{children}</h2>
      {action}
    </div>
  )
}

export function AgentAvatar({ id, size = 'md', className }: { id: AgentId; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const agent = agentById(id)
  const dims = { sm: 'size-7', md: 'size-10', lg: 'size-20' }[size]
  const px = { sm: 28, md: 40, lg: 80 }[size]
  return (
    <span className={cn('relative inline-block shrink-0 overflow-hidden rounded-full', agent.bg, dims, className)}>
      <Image src={agent.image} alt="" fill sizes={`${px}px`} className="scale-[1.7] object-cover mix-blend-multiply" />
    </span>
  )
}

export function AgentPill({ id }: { id: AgentId }) {
  const agent = agentById(id)
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-rounded text-xs text-plum', agent.bg)}>
      <span className={cn('size-1.5 rounded-full', agent.dot)} />
      {agent.nickname}
    </span>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  tone = 'bg-lavender',
  action,
}: {
  icon: LucideIcon
  title: string
  body: string
  tone?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center rounded-[1.75rem] border-2 border-dashed border-plum/10 px-6 py-12 text-center">
      <span className={cn('relative flex size-16 items-center justify-center rounded-3xl rotate-6', tone)}>
        <Icon className="size-7 -rotate-6 text-plum" aria-hidden="true" />
        <span className="absolute -right-2 -top-2 size-4 rounded-full bg-butter ring-4 ring-white" />
      </span>
      <h3 className="mt-5 font-serif text-2xl text-plum">{title}</h3>
      <p className="mt-1 max-w-sm text-plum-soft">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
