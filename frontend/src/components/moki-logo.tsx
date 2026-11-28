import { cn } from '@/lib/utils'

export function MokiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('size-9', className)}>
      <path d="M20 9c0-4 3-6 6-6-0.5 3.5-2.5 6-6 6Z" fill="#FFE7A3" stroke="#30243D" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M20 9c0-3-2.5-5-5-5 0.3 3 2 5 5 5Z" fill="#C9EAD8" stroke="#30243D" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="4" y="9" width="32" height="28" rx="14" fill="#DCD2FF" stroke="#30243D" strokeWidth="1.5" />
      <circle cx="15" cy="21" r="2" fill="#30243D" />
      <circle cx="25" cy="21" r="2" fill="#30243D" />
      <path d="M16.5 27c2 1.8 5 1.8 7 0" fill="none" stroke="#30243D" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10.5" cy="25.5" r="2" fill="#FFC9B8" />
      <circle cx="29.5" cy="25.5" r="2" fill="#FFC9B8" />
    </svg>
  )
}

export function MokiLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <MokiMark />
      <span className="font-serif text-2xl font-semibold tracking-tight text-plum">
        moki<span className="text-[#e0704f]">.</span>
      </span>
    </span>
  )
}
