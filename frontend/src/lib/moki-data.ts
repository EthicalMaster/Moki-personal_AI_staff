import type { LucideIcon } from 'lucide-react'
import { CalendarHeart, ListChecks, MessageCircleHeart, Telescope } from 'lucide-react'

export type AgentId = 'research' | 'planner' | 'task' | 'communication'

export type Agent = {
  id: AgentId
  name: string
  nickname: string
  role: string
  personality: string
  description: string
  icon: LucideIcon
  image: string
  bg: string
  softBg: string
  ring: string
  dot: string
  status: string
  tasksToday: number
  skills: string[]
}

export const agents: Agent[] = [
  {
    id: 'research',
    name: 'Research Agent',
    nickname: 'Scout',
    role: 'The curious one',
    personality: 'Endlessly curious, cites every source, never skims.',
    description:
      'Digs through articles, papers and reviews, then hands you a tidy brief with the parts that actually matter.',
    icon: Telescope,
    image: '/images/agent-research.png',
    bg: 'bg-lavender',
    softBg: 'bg-lavender/40',
    ring: 'ring-lavender-deep',
    dot: 'bg-[#8f78e8]',
    status: 'Reading 6 sources on remote-work trends',
    tasksToday: 4,
    skills: ['Web research', 'Summaries', 'Comparisons', 'Fact-checking'],
  },
  {
    id: 'planner',
    name: 'Planner Agent',
    nickname: 'Sunny',
    role: 'The calm strategist',
    personality: 'Unflappable, protects your focus time like a bodyguard.',
    description:
      'Turns a messy week into a realistic plan, finds pockets of focus time and guards them from meeting creep.',
    icon: CalendarHeart,
    image: '/images/agent-planner.png',
    bg: 'bg-butter',
    softBg: 'bg-butter/50',
    ring: 'ring-[#f2cf63]',
    dot: 'bg-[#e0a91f]',
    status: 'Rebalancing Thursday to fit your gym session',
    tasksToday: 3,
    skills: ['Weekly plans', 'Time blocking', 'Deadlines', 'Routines'],
  },
  {
    id: 'task',
    name: 'Task Agent',
    nickname: 'Pip',
    role: 'The tidy finisher',
    personality: 'Loves a crossed-off list a little too much.',
    description:
      'Breaks big goals into small, doable steps, sorts them by priority and nudges you before things slip.',
    icon: ListChecks,
    image: '/images/agent-task.png',
    bg: 'bg-mint',
    softBg: 'bg-mint/50',
    ring: 'ring-[#93d1b0]',
    dot: 'bg-[#3fa172]',
    status: 'Splitting “Launch portfolio” into 5 steps',
    tasksToday: 7,
    skills: ['Prioritising', 'Checklists', 'Reminders', 'Follow-ups'],
  },
  {
    id: 'communication',
    name: 'Communication Agent',
    nickname: 'Echo',
    role: 'The warm wordsmith',
    personality: 'Polite, punchy and never sends a reply-all by accident.',
    description:
      'Drafts emails, messages and notes in your voice, from gentle follow-ups to confident pitches.',
    icon: MessageCircleHeart,
    image: '/images/agent-communication.png',
    bg: 'bg-peach',
    softBg: 'bg-peach/50',
    ring: 'ring-[#f5a68f]',
    dot: 'bg-[#e0704f]',
    status: 'Drafting a follow-up to Priya about the proposal',
    tasksToday: 2,
    skills: ['Email drafts', 'Tone matching', 'Summaries', 'Replies'],
  },
]

export const agentById = (id: AgentId) => agents.find((a) => a.id === id)!

export type Priority = 'high' | 'medium' | 'low'

export type Task = {
  id: string
  title: string
  note?: string
  priority: Priority
  due: string
  agent: AgentId
  done: boolean
}

export const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Finish pitch deck for Friday’s demo',
    note: 'Slides 6–9 still need data from Scout’s brief',
    priority: 'high',
    due: 'Today, 5:00 PM',
    agent: 'task',
    done: false,
  },
  {
    id: 't2',
    title: 'Reply to Priya about the proposal',
    note: 'Echo drafted a reply, ready for your review',
    priority: 'high',
    due: 'Today, 2:00 PM',
    agent: 'communication',
    done: false,
  },
  {
    id: 't3',
    title: 'Compare three project-management tools',
    note: 'Notion, Linear and Asana — pricing and team fit',
    priority: 'medium',
    due: 'Tomorrow',
    agent: 'research',
    done: false,
  },
  {
    id: 't4',
    title: 'Book dentist appointment',
    priority: 'low',
    due: 'Fri, Nov 29',
    agent: 'planner',
    done: false,
  },
  {
    id: 't5',
    title: 'Send weekly update to the team',
    priority: 'medium',
    due: 'Today, 10:00 AM',
    agent: 'communication',
    done: true,
  },
  {
    id: 't6',
    title: 'Plan meals for the week',
    priority: 'low',
    due: 'Yesterday',
    agent: 'planner',
    done: true,
  },
  {
    id: 't7',
    title: 'Renew passport application',
    note: 'Photos are ready, form is half filled',
    priority: 'medium',
    due: 'Mon, Dec 2',
    agent: 'task',
    done: false,
  },
]

export type ScheduleEvent = {
  id: string
  time: string
  end: string
  title: string
  place: string
  tone: 'lavender' | 'butter' | 'mint' | 'peach' | 'blush'
}

export const schedule: ScheduleEvent[] = [
  { id: 's1', time: '9:00', end: '9:30', title: 'Morning planning with Moki', place: 'Focus', tone: 'lavender' },
  { id: 's2', time: '10:30', end: '11:15', title: 'Design review with Arjun', place: 'Google Meet', tone: 'peach' },
  { id: 's3', time: '12:30', end: '13:30', title: 'Lunch & a proper walk', place: 'Offline', tone: 'mint' },
  { id: 's4', time: '14:00', end: '16:00', title: 'Deep work: pitch deck', place: 'Protected by Sunny', tone: 'butter' },
  { id: 's5', time: '18:30', end: '19:30', title: 'Yoga class', place: 'Studio Lumen', tone: 'blush' },
]

export const weekSchedule: { day: string; date: string; events: ScheduleEvent[] }[] = [
  { day: 'Mon', date: '23', events: schedule.slice(0, 2) },
  { day: 'Tue', date: '24', events: [schedule[3], schedule[4]] },
  { day: 'Wed', date: '25', events: [schedule[1]] },
  { day: 'Thu', date: '26', events: [schedule[0], schedule[3]] },
  { day: 'Fri', date: '27', events: schedule },
]

export type Memory = {
  id: string
  category: 'Preferences' | 'People' | 'Goals' | 'Routines'
  text: string
  learned: string
}

export const memories: Memory[] = [
  { id: 'm1', category: 'Preferences', text: 'Prefers short, bullet-point summaries over long reports.', learned: '2 weeks ago' },
  { id: 'm2', category: 'Routines', text: 'Does deep work best between 2 PM and 4 PM.', learned: 'Last week' },
  { id: 'm3', category: 'People', text: 'Priya is the client lead for the Bloom proposal. Keep tone warm but direct.', learned: '3 days ago' },
  { id: 'm4', category: 'Goals', text: 'Wants to run a 10K by March — keep three runs a week on the calendar.', learned: 'Last month' },
  { id: 'm5', category: 'Preferences', text: 'No meetings before 9:30 AM, ever.', learned: '1 month ago' },
  { id: 'm6', category: 'People', text: 'Arjun is the design lead. Weekly review every Thursday.', learned: '2 weeks ago' },
]

export type ActivityItem = {
  id: string
  agent: AgentId
  text: string
  time: string
}

export const activity: ActivityItem[] = [
  { id: 'a1', agent: 'communication', text: 'Drafted a follow-up email to Priya about the Bloom proposal', time: '8 min ago' },
  { id: 'a2', agent: 'research', text: 'Summarised 6 articles on hybrid-work productivity into a 1-page brief', time: '24 min ago' },
  { id: 'a3', agent: 'planner', text: 'Moved your gym session to Thursday 7 AM to free up the afternoon', time: '1 hr ago' },
  { id: 'a4', agent: 'task', text: 'Broke “Launch portfolio site” into 5 smaller steps', time: '2 hrs ago' },
  { id: 'a5', agent: 'research', text: 'Found 3 flight options to Goa under ₹9,000 for the long weekend', time: 'Yesterday' },
  { id: 'a6', agent: 'communication', text: 'Sent the weekly update to your team channel', time: 'Yesterday' },
  { id: 'a7', agent: 'planner', text: 'Built your week plan with 4 protected focus blocks', time: 'Mon' },
]

export const suggestedPrompts = [
  'Plan my week',
  'Research something for me',
  'Organise my tasks',
  'Help me prepare for a presentation',
]

export type MockReply = {
  agents: AgentId[]
  text: string
  bullets?: string[]
}

export function getMockReply(prompt: string): MockReply {
  const p = prompt.toLowerCase()
  if (p.includes('week') || p.includes('plan') || p.includes('schedule')) {
    return {
      agents: ['planner', 'task'],
      text: 'Sunny and Pip put together a calmer week for you. Here’s the shape of it:',
      bullets: [
        'Mon – Deep work 2–4 PM on the pitch deck, light admin after',
        'Tue – Design review moved to 11 AM so your morning stays free',
        'Wed – Errand window at lunch: dentist booking + passport photos',
        'Thu – Demo rehearsal at 3 PM, gym moved to 7 AM',
        'Fri – Pitch demo, then a no-meeting afternoon to recover',
      ],
    }
  }
  if (p.includes('research') || p.includes('compare') || p.includes('find')) {
    return {
      agents: ['research'],
      text: 'Scout is on it. While I dig deeper, here’s a quick first pass on project-management tools for a small team:',
      bullets: [
        'Linear – fastest to use, best for product teams, from $8/user',
        'Notion – most flexible, great for docs + tasks together, from $10/user',
        'Asana – strongest for cross-team planning, from $10.99/user',
        'My pick for you: Notion, since you already keep notes there',
      ],
    }
  }
  if (p.includes('task') || p.includes('organis') || p.includes('organiz') || p.includes('todo')) {
    return {
      agents: ['task'],
      text: 'Pip sorted your list by what actually needs you today:',
      bullets: [
        'Do now: Reply to Priya (draft is ready — 2 min)',
        'Focus block: Finish pitch deck slides 6–9',
        'Delegate to Scout: Tool comparison, due tomorrow',
        'Batch on Wednesday: Dentist + passport renewal',
      ],
    }
  }
  if (p.includes('present') || p.includes('pitch') || p.includes('demo')) {
    return {
      agents: ['research', 'planner', 'communication'],
      text: 'Three of us teamed up for this one. Here’s your presentation prep plan:',
      bullets: [
        'Scout pulled 3 market stats to strengthen your problem slide',
        'Echo tightened your opening into a 20-second hook',
        'Sunny booked two 30-min rehearsal slots on Wed and Thu',
        'Bonus: a one-page cheat sheet with likely Q&A questions',
      ],
    }
  }
  if (p.includes('email') || p.includes('reply') || p.includes('message') || p.includes('write')) {
    return {
      agents: ['communication'],
      text: 'Echo drafted this in your voice:',
      bullets: [
        'Hi Priya — thanks for the thoughtful notes on the Bloom proposal.',
        'I’ve updated the timeline and folded in your budget suggestions.',
        'Could we lock in a quick call Thursday to finalise? Happy to work around you.',
      ],
    }
  }
  return {
    agents: ['task', 'planner'],
    text: 'Got it! I’ve added that to your list and Sunny found a 30-minute slot for it tomorrow at 11 AM. Want me to bring in Scout for some background research too?',
  }
}
