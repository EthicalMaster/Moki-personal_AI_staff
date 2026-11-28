import { MokiLogo } from '@/components/moki-logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
        <MokiLogo />
        <p className="font-rounded text-sm text-plum-soft">Made with care for people with full plates. © 2026 Moki.</p>
      </div>
    </footer>
  )
}
