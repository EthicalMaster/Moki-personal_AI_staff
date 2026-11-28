'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { getMockReply, initialTasks, type AgentId, type Priority, type Task } from '@/lib/moki-data'

export type View = 'overview' | 'chat' | 'tasks' | 'schedule' | 'agents' | 'memory' | 'activity'

export type ChatMessage = {
  id: string
  role: 'user' | 'moki'
  text: string
  bullets?: string[]
  agents?: AgentId[]
}

type MokiState = {
  view: View
  setView: (v: View) => void
  tasks: Task[]
  toggleTask: (id: string) => void
  addTask: (input: { title: string; priority: Priority; due: string; agent: AgentId }) => void
  removeTask: (id: string) => void
  messages: ChatMessage[]
  thinking: AgentId[] | null
  sendMessage: (text: string) => void
  clearChat: () => void
}

const MokiContext = createContext<MokiState | null>(null)

export function MokiProvider({ children }: { children: React.ReactNode }) {
  const [view, setViewState] = useState<View>('overview')
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [thinking, setThinking] = useState<AgentId[] | null>(null)
  const idRef = useRef(0)
  const nextId = () => `id-${++idRef.current}`

  const setView = useCallback((v: View) => {
    setViewState(v)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }, [])

  const addTask: MokiState['addTask'] = useCallback((input) => {
    setTasks((prev) => [{ id: `t-${Date.now()}`, done: false, ...input }, ...prev])
  }, [])

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const reply = getMockReply(trimmed)
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', text: trimmed }])
    setThinking(reply.agents)
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'moki', text: reply.text, bullets: reply.bullets, agents: reply.agents },
      ])
      setThinking(null)
    }, 1400 + reply.agents.length * 300)
  }, [])

  const clearChat = useCallback(() => setMessages([]), [])

  const value = useMemo(
    () => ({ view, setView, tasks, toggleTask, addTask, removeTask, messages, thinking, sendMessage, clearChat }),
    [view, setView, tasks, toggleTask, addTask, removeTask, messages, thinking, sendMessage, clearChat],
  )

  return <MokiContext.Provider value={value}>{children}</MokiContext.Provider>
}

export function useMoki() {
  const ctx = useContext(MokiContext)
  if (!ctx) throw new Error('useMoki must be used inside MokiProvider')
  return ctx
}
