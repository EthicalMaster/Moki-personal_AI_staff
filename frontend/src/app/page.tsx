import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { TeamSection } from '@/components/landing/team-section'
import { CapabilitiesSection } from '@/components/landing/capabilities-section'
import { CtaSection } from '@/components/landing/cta-section'
import { SiteFooter } from '@/components/landing/site-footer'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TeamSection />
        <CapabilitiesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
