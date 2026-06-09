"use client";

import { m } from "framer-motion";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";

interface Perk {
  title: string;
  body: string;
}

// Present-tense benefits now that Finby is live — what you actually get, not
// pre-launch promises.
const PERKS: Perk[] = [
  {
    title: "Just chat",
    body: "Tell Finby what you spent in plain words. It logs it, categorises it, and tracks your budget — no forms, no spreadsheets.",
  },
  {
    title: "No bank linking",
    body: "Nothing to connect, nothing to expose. You stay in control of exactly what Finby knows.",
  },
  {
    title: "Every currency",
    body: "Earn or spend across more than one currency? Finby keeps up without the mental math.",
  },
  {
    title: "Private by default",
    body: "Your financial data is encrypted and never sold. Full stop.",
  },
];

export function SocialProofSection() {
  const { container, item } = useStaggerVariants();

  return (
    <section className="py-24" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="section-shell text-center">
        <Reveal>
          <p
            className="mx-auto max-w-2xl font-black"
            style={{
              fontSize: "clamp(1.85rem, 5vw, 2.75rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.12,
              color: "var(--color-text-primary)",
            }}
          >
            Money management that finally feels human.
          </p>
          <p className="mx-auto mt-4 max-w-md text-base" style={{ color: "var(--color-text-secondary)" }}>
            No dashboards to learn. No bank logins. Just a conversation about your money.
          </p>
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
