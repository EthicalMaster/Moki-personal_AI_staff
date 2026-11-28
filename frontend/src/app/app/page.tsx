import type { Metadata } from 'next'
import { AppShell } from '@/components/dashboard/app-shell'

export const metadata: Metadata = {
  title: 'Dashboard – Moki',
  description: 'Your Moki workspace: tasks, schedule, agents and more.',
}

export default function DashboardPage() {
  return <AppShell />
}
