import { agents } from '@/lib/moki-data'
import { MokiMark } from '@/components/moki-logo'
import { Reveal } from './reveal'

export function TeamSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-10 px-5 py-24 lg:px-8 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.08] tracking-tight text-plum sm:text-5xl lg:text-6xl">
            Your to-do list deserves a <span className="italic text-[#8f78e8]">team.</span>
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-plum-soft">
            Tell Moki what you need. It quietly hands each part to the right specialist — one researches, one
            plans, one organises, one writes — then brings it all back to you, ready to approve.
          </p>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="flex flex-col items-center gap-8 rounded-[2.5rem] bg-white/60 px-6 py-12 sm:px-10">
            <div className="flex items-center gap-3 rounded-full bg-plum py-2 pl-2 pr-5 text-ivory">
              <MokiMark className="size-9" />
              <span className="font-medium">{'“Help me prep for Friday’s pitch”'}</span>
            </div>
            <div aria-hidden="true" className="-my-4 flex flex-col items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-plum/20" />
              ))}
            </div>
            <ul className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {agents.map((a) => {
                const Icon = a.icon
                return (
                  <li
                    key={a.id}
                    className={`flex flex-col items-center gap-2 rounded-3xl ${a.bg} px-3 py-5 text-center transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-white/80">
                      <Icon className="size-4 text-plum" aria-hidden="true" />
                    </span>
                    <span className="font-serif text-lg leading-none text-plum">{a.nickname}</span>
                    <span className="font-rounded text-xs text-plum-soft">{a.name.replace(' Agent', '')}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
