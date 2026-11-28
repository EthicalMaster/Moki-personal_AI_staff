'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { CalendarHeart, Check, ListChecks, Telescope } from 'lucide-react'

function useScrollParallax() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      el.style.setProperty('--scroll', String(Math.min(window.scrollY, 900)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onPointer = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      el.style.setProperty('--px', x.toFixed(3))
      el.style.setProperty('--py', y.toFixed(3))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointer)
      cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}

function layer(depth: number): React.CSSProperties {
  return {
    transform: `translate3d(calc(var(--px, 0) * ${depth * 14}px), calc(var(--scroll, 0) * ${-depth * 0.12}px + var(--py, 0) * ${depth * 10}px), 0)`,
    transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  }
}

export function HeroVisual() {
  const ref = useScrollParallax()

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[34rem] animate-fade-up"
      style={{ animationDelay: '300ms' }}
      role="img"
      aria-label="Moki surrounded by floating cards for its Research, Planning and Task agents"
    >
      <div style={layer(0.4)} className="absolute inset-[6%]">
        <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-plum/10" />
        <div className="absolute inset-[13%] rounded-full bg-lavender" />
        <div className="absolute inset-[13%] rounded-full bg-gradient-to-br from-white/50 via-transparent to-blush/60" />
      </div>

      <div style={layer(1.6)} className="absolute left-[2%] top-[8%]">
        <div className="clay-sphere size-16 animate-drift sm:size-20" style={{ ['--clay' as string]: '#ffe7a3' }} />
      </div>
      <div style={layer(2.2)} className="absolute bottom-[8%] right-[4%]">
        <div className="clay-ring size-20 animate-drift sm:size-24" style={{ ['--clay' as string]: '#ffc9b8', animationDelay: '-3s' }} />
      </div>
      <div style={layer(1.2)} className="absolute bottom-[14%] left-[6%]">
        <div className="clay-block size-12 rotate-12 animate-drift sm:size-14" style={{ ['--clay' as string]: '#c9ead8', animationDelay: '-5s' }} />
      </div>
      <div style={layer(2.6)} className="absolute right-[12%] top-[2%]">
        <div className="clay-sphere size-8 animate-drift" style={{ ['--clay' as string]: '#c9ead8', animationDelay: '-2s' }} />
      </div>
      <div style={layer(1.9)} className="absolute right-[2%] top-[46%]">
        <div className="clay-sphere size-6 animate-drift" style={{ ['--clay' as string]: '#dcd2ff', animationDelay: '-6s' }} />
      </div>

      <div style={layer(0.7)} className="absolute inset-[19%] overflow-hidden rounded-full">
        <Image
          src="/images/moki-mascot.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 340px, 60vw"
          className="scale-[1.85] object-cover mix-blend-multiply"
        />
      </div>

      <div style={layer(1.4)} className="absolute left-[-2%] top-[30%] sm:left-[-6%]">
        <div className="animate-card-in" style={{ animationDelay: '900ms' }}>
          <div className="flex animate-float items-center gap-3 rounded-2xl border border-white bg-white/90 py-2.5 pl-2.5 pr-4 shadow-lift backdrop-blur">
            <span className="flex size-9 items-center justify-center rounded-xl bg-lavender">
              <Telescope className="size-4 text-plum" aria-hidden="true" />
            </span>
            <div>
              <p className="font-rounded text-[11px] uppercase tracking-wider text-plum-soft">Research</p>
              <p className="text-sm font-semibold text-plum">6 sources, 1 tidy brief</p>
            </div>
          </div>
        </div>
      </div>

      <div style={layer(1.8)} className="absolute right-[-2%] top-[16%] sm:right-[-4%]">
        <div className="animate-card-in" style={{ animationDelay: '1150ms' }}>
          <div
            className="flex animate-float-slow items-center gap-3 rounded-2xl border border-white bg-white/90 py-2.5 pl-2.5 pr-4 shadow-lift backdrop-blur"
            style={{ animationDelay: '-2s' }}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-butter">
              <CalendarHeart className="size-4 text-plum" aria-hidden="true" />
            </span>
            <div>
              <p className="font-rounded text-[11px] uppercase tracking-wider text-plum-soft">Planning</p>
              <p className="text-sm font-semibold text-plum">Focus time: 2–4 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div style={layer(1.1)} className="absolute bottom-[10%] left-[22%]">
        <div className="animate-card-in" style={{ animationDelay: '1400ms' }}>
          <div
            className="flex animate-float items-center gap-3 rounded-2xl border border-white bg-white/90 py-2.5 pl-2.5 pr-4 shadow-lift backdrop-blur"
            style={{ animationDelay: '-4s' }}
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-mint">
              <ListChecks className="size-4 text-plum" aria-hidden="true" />
            </span>
            <div>
              <p className="font-rounded text-[11px] uppercase tracking-wider text-plum-soft">Tasks</p>
              <p className="flex items-center gap-1.5 text-sm font-semibold text-plum">
                <span className="flex size-4 items-center justify-center rounded-full bg-plum">
                  <Check className="size-2.5 text-ivory" strokeWidth={3} aria-hidden="true" />
                </span>
                Pitch deck, done
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
