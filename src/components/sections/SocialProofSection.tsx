"use client";

import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";
import { WAITLIST_DISPLAY_THRESHOLD } from "@/lib/site";

interface Perk {
  title: string;
  body: string;
}

// Honest, company-controlled promises for early members — not testimonials.
// Finby is pre-launch, so there are no real users to quote yet.
const PERKS: Perk[] = [
  { title: "First in line", body: "Early members get access before anyone else the day we launch." },
  { title: "Founding-member pricing", body: "Lock in a launch rate now — it won't go up on you later." },
  { title: "Shape what we build", body: "Your feedback steers the roadmap. Early voices count the most." },
  { title: "Privacy-first, always", body: "Your financial data is encrypted and never sold. Full stop." },
];

export function SocialProofSection({ waitlistCount }: { waitlistCount: number }) {
  const { container, item } = useStaggerVariants();
  const showCount = waitlistCount >= WAITLIST_DISPLAY_THRESHOLD;

  return (
    <section className="py-24" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="section-shell text-center">
        <Reveal>
          {showCount ? (
            <>
              <p
                className="font-black"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 3.5rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--color-accent)",
                }}
              >
                <AnimatedCounter value={waitlistCount} suffix="+" />
              </p>
              <p className="mt-2 text-base" style={{ color: "var(--color-text-secondary)" }}>
                people have already joined the waitlist
              </p>
            </>
          ) : (
            <>
              <p
                className="font-black"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 3rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--color-accent)",
                }}
              >
                Join the first wave
              </p>
              <p className="mt-2 text-base" style={{ color: "var(--color-text-secondary)" }}>
                Finby is pre-launch — here&apos;s what early members get.
              </p>
            </>
          )}
        </Reveal>

        <m.div
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PERKS.map((perk) => (
            <m.div
              key={perk.title}
              variants={item}
              className="rounded-2xl p-6 text-left"
              style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
            >
              <p className="text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                {perk.title}
              </p>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}
              >
                {perk.body}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
