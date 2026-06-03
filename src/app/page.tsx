import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BottomCTA } from "@/components/sections/BottomCTA";
import { Footer } from "@/components/sections/Footer";
import { prisma } from "@/lib/prisma";

// Statically rendered, but re-generated every 5 minutes so the live waitlist
// count stays fresh without a DB hit on every visitor.
export const revalidate = 300;

/** Real waitlist size. Resilient: an unreachable DB (e.g. at build) → 0. */
async function getWaitlistCount(): Promise<number> {
  try {
    return await prisma.waitlistSignup.count();
  } catch (err) {
    console.error("[home] waitlist count failed:", err);
    return 0;
  }
}

export default async function Home() {
  const waitlistCount = await getWaitlistCount();

  return (
    <>
      <NavBar />
      <main>
        <HeroSection waitlistCount={waitlistCount} />
        <FeaturesSection />
        <HowItWorksSection />
        <SocialProofSection waitlistCount={waitlistCount} />
        <PricingSection />
        <BottomCTA />
      </main>
      <Footer />
    </>
  );
}
