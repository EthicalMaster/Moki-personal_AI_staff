'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Activity,
  Brain,
  CalendarDays,
  LayoutGrid,
  ListTodo,
  Menu,
  MessageCircle,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { MokiLogo } from '@/components/moki-logo'
import { agents } from '@/lib/moki-data'
import { MokiProvider, useMoki, type View } from './moki-store'
import { OverviewView } from './views/overview-view'
import { ChatView } from './views/chat-view'
import { TasksView } from './views/tasks-view'
import { ScheduleView } from './views/schedule-view'
import { AgentsView } from './views/agents-view'
import { MemoryView } from './views/memory-view'
import { ActivityView } from './views/activity-view'

const nav: { id: View; label: string; icon: LucideIcon; tone: string }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid, tone: 'bg-lavender' },
  { id: 'chat', label: 'Ask Moki', icon: MessageCircle, tone: 'bg-butter' },
  { id: 'tasks', label: 'My Tasks', icon: ListTodo, tone: 'bg-mint' },
  { id: 'schedule', label: 'My Schedule', icon: CalendarDays, tone: 'bg-peach' },
  { id: 'agents', label: 'My Agents', icon: Users, tone: 'bg-blush' },
  { id: 'memory', label: 'Memory', icon: Brain, tone: 'bg-lavender' },
  { id: 'activity', label: 'Activity', icon: Activity, tone: 'bg-butter' },
]

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { view, setView, tasks } = useMoki()
  const pending = tasks.filter((t) => !t.done).length

  return (
    <ul className="flex flex-col gap-1">
      {nav.map(({ id, label, icon: Icon, tone }) => {
        const active = view === id
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => {
                setView(id)
                onNavigate?.()
              }}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[15px] font-medium transition-all',
                active ? 'bg-white text-plum shadow-soft' : 'text-plum-soft hover:bg-white/60 hover:text-plum',
              )}
            >
              <span
                className={cn(
                  'flex size-8 items-center justify-center rounded-xl transition-transform group-hover:scale-110',
                  active ? tone : 'bg-plum/5',
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="flex-1">{label}</span>
              {id === 'tasks' && pending > 0 && (
                <span className="rounded-full bg-plum px-2 py-0.5 font-rounded text-xs text-ivory">{pending}</span>
              )}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function SidebarFooter() {
  return (
    <div className="mt-auto space-y-4">
      <div className="rounded-3xl bg-plum p-4 text-ivory">
        <p className="font-rounded text-xs uppercase tracking-widest text-butter">Crew status</p>
        <div className="mt-3 flex -space-x-2">
          {agents.map((a) => {
            const Icon = a.icon
            return (
              <span
                key={a.id}
                title={`${a.nickname} is active`}
                className={`flex size-9 items-center justify-center rounded-full ${a.bg} text-plum ring-2 ring-plum`}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-ivory/80">All four agents are on shift and working quietly.</p>
      </div>
      <div className="flex items-center gap-3 px-1">
        <span className="flex size-10 items-center justify-center rounded-full bg-peach font-serif text-lg text-plum">A</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-plum">Aanya Sharma</p>
          <p className="truncate font-rounded text-xs text-plum-soft">Moki Plus</p>
        </div>
      </div>
    </div>
  )
}

function CurrentView() {
  const { view } = useMoki()
  return (
    <div key={view} className="animate-pop-in">
      {view === 'overview' && <OverviewView />}
      {view === 'chat' && <ChatView />}
      {view === 'tasks' && <TasksView />}
      {view === 'schedule' && <ScheduleView />}
      {view === 'agents' && <AgentsView />}
      {view === 'memory' && <MemoryView />}
      {view === 'activity' && <ActivityView />}
    </div>
  )
}

function Shell() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-ivory lg:flex">
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-8 border-r border-sidebar-border bg-sidebar p-5 lg:flex">
        <Link href="/" aria-label="Back to Moki home" className="px-2 pt-1">
          <MokiLogo />
        </Link>
        <nav aria-label="Dashboard">
          <NavList />
        </nav>
        <SidebarFooter />
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-ivory/85 px-4 py-3 backdrop-blur-md lg:hidden">
        <Link href="/" aria-label="Back to Moki home">
          <MokiLogo />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white"
          aria-label="Open navigation"
          aria-expanded={mobileOpen}
          aria-controls="mobile-dashboard-nav"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button
            type="button"
            className="absolute inset-0 animate-in fade-in bg-plum/30"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="mobile-dashboard-nav"
            className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs animate-in slide-in-from-left flex-col gap-6 bg-sidebar p-5 shadow-lift"
          >
            <div className="flex items-center justify-between">
              <MokiLogo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-full bg-white"
                aria-label="Close navigation"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav aria-label="Dashboard mobile">
              <NavList onNavigate={() => setMobileOpen(false)} />
            </nav>
            <SidebarFooter />
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-6xl">
          <CurrentView />
        </div>
      </main>
    </div>
  )
}

export function AppShell() {
  return (
    <MokiProvider>
      <Shell />
    </MokiProvider>
  )
}
