'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { MokiLogo } from '@/components/moki-logo'

const links = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="Moki home">
            <MokiLogo />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[15px] font-medium text-plum-soft transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-plum after:transition-all hover:text-plum hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/app"
            className="rounded-full px-4 py-2.5 text-[15px] font-medium text-plum transition-colors hover:bg-plum/5"
          >
            Sign In
          </Link>
          <Link
            href="/app"
            className="rounded-full bg-plum px-5 py-2.5 text-[15px] font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mx-4 animate-pop-in rounded-3xl border border-border bg-ivory p-5 shadow-lift md:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 font-serif text-2xl text-plum">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link href="/app" className="rounded-full border border-border px-4 py-3 text-center font-medium text-plum">
              Sign In
            </Link>
            <Link href="/app" className="rounded-full bg-plum px-4 py-3 text-center font-semibold text-ivory">
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
