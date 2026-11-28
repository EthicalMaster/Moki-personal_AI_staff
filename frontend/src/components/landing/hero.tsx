import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroVisual } from './hero-visual'

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:grid-cols-[1fr_1fr] md:gap-6 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <div className="relative z-10 flex flex-col items-start">
          <p
            className="animate-fade-up font-rounded text-xs font-medium tracking-[0.28em] text-[#c45a3c]"
            style={{ animationDelay: '100ms' }}
          >
            YOUR PERSONAL AI WORKFORCE
          </p>
          <h1
            className="mt-5 animate-fade-up text-balance font-serif text-5xl font-medium leading-[1.02] tracking-tight text-plum sm:text-6xl md:text-[3.4rem] lg:text-6xl xl:text-7xl"
            style={{ animationDelay: '220ms' }}
          >
            Big plans? Leave the{' '}
            <span className="relative inline-block whitespace-nowrap italic">
              <span className="relative z-10">busywork</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-[-4px] bottom-[0.12em] z-0 h-[0.32em] -rotate-1 rounded-full bg-butter"
              />
            </span>{' '}
            to Moki.
          </h1>
          <p
            className="mt-6 max-w-md animate-fade-up text-pretty text-lg leading-relaxed text-plum-soft sm:text-xl"
            style={{ animationDelay: '360ms' }}
          >
            One assistant. A team of AI agents. More time for what matters.
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-3" style={{ animationDelay: '500ms' }}>
            <Link
              href="/app"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-plum px-7 py-4 text-base font-semibold text-ivory shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-14px_rgb(48_36_61/0.45)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              Meet Moki
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-plum underline decoration-plum/20 decoration-2 underline-offset-8 transition-all duration-300 hover:decoration-plum"
            >
              See how it works
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
