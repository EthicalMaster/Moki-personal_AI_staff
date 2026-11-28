import { activity, agentById } from '@/lib/moki-data'
import { AgentAvatar, Card, PageHeader } from '../shared'

export function ActivityView() {
  return (
    <div>
      <PageHeader
        eyebrow="Activity"
        title="What your crew has been up to."
        description="A transparent log of everything Moki and the agents did on your behalf."
      />
      <Card>
        <ol className="relative">
          {activity.map((item, i) => {
            const agent = agentById(item.agent)
            return (
              <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
                {i < activity.length - 1 && (
                  <span aria-hidden="true" className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-border" />
                )}
                <AgentAvatar id={item.agent} />
                <div className="flex-1 rounded-2xl px-1 pt-1">
                  <p className="text-plum">
                    <span className="font-semibold">{agent.nickname}</span> {item.text.charAt(0).toLowerCase() + item.text.slice(1)}
                  </p>
                  <p className="mt-1 font-rounded text-xs text-plum-soft">
                    {agent.name} · {item.time}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </Card>
    </div>
  )
}
