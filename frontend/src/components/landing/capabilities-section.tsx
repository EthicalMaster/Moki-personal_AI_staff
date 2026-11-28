import Image from 'next/image'
import { Reveal } from './reveal'

const capabilities = [
  {
    title: 'Research',
    body: 'Forty tabs become one clear, sourced brief.',
    image: '/images/agent-research.png',
    tone: 'bg-lavender',
  },
  {
    title: 'Plan',
    body: 'A realistic week, with your focus time protected.',
    image: '/images/agent-planner.png',
    tone: 'bg-butter',
  },
  {
    title: 'Organise',
    body: 'Big goals, broken into small steps you can finish.',
    image: '/images/agent-task.png',
    tone: 'bg-mint',
  },
]

export function CapabilitiesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-10 px-5 pb-24 lg:px-8 lg:pb-36">
      <Reveal className="max-w-2xl">
        <h2 className="text-balance font-serif text-4xl font-medium leading-[1.08] tracking-tight text-plum sm:text-5xl lg:text-6xl">
          One assistant. <span className="italic text-[#c45a3c]">Many hands.</span>
        </h2>
      </Reveal>

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {capabilities.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 120}>
            <div className="group">
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] ${c.tone}`}>
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="scale-110 object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.18] group-hover:rotate-2"
                />
              </div>
              <h3 className="mt-6 font-serif text-3xl text-plum">{c.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-plum-soft">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
