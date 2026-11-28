import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-plum px-6 py-20 text-center sm:py-28">
          <div aria-hidden="true" className="clay-sphere absolute -left-10 -top-10 size-40 opacity-90" style={{ ['--clay' as string]: '#dcd2ff' }} />
          <div aria-hidden="true" className="clay-ring absolute -bottom-12 -right-8 size-44 opacity-90" style={{ ['--clay' as string]: '#ffe7a3' }} />
          <h2 className="relative mx-auto max-w-2xl text-balance font-serif text-4xl font-medium leading-tight text-ivory sm:text-5xl lg:text-6xl">
            Ready to make life a little easier?
          </h2>
          <Link
            href="/app"
            className="group relative mt-10 inline-flex items-center gap-2 rounded-full bg-butter px-8 py-4 text-base font-semibold text-plum transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffdf85]"
          >
            Get started with Moki
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
