"use client";

import { m } from "framer-motion";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";

interface Step {
  n: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: "1",
    title: "Sign up & set your currency",
    body: "Create your account, pick your base currency, add the currencies you use day-to-day.",
  },
  {
    n: "2",
    title: "Start a conversation",
    body: "Tell Finby what you spent, earned, or want to track. It handles the rest — no forms, no navigation.",
  },
  {
    n: "3",
    title: "Let Finby advise you",
    body: "Ask anything — “Am I on track?” or “What stocks should I hold?” — and get a data-backed honest answer.",
  },
];

export function HowItWorksSection() {
  const { container, item } = useStaggerVariants();

  return (
    <section id="how-it-works" className="py-24">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <h2
            className="font-extrabold"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.375rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
            }}
          >
            Up and running in 60 seconds
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <m.div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden md:block"
            style={{
              height: "1px",
              transformOrigin: "left center",
              background:
                "linear-gradient(90deg, transparent, var(--color-border-accent), transparent)",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          />

          <m.ol
            className="grid gap-10 md:grid-cols-3 md:gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {STEPS.map((step) => (
              <m.li key={step.n} variants={item} className="relative">
                <span
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border-accent)",
                    color: "var(--color-accent)",
                  }}
                >
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </m.li>
            ))}
          </m.ol>
        </div>
      </div>
    </section>
  );
}
