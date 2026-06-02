"use client";

import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  { quote: "Finally a finance app I actually open every day.", name: "Aisha", location: "Manila" },
  { quote: "I earn in USD and spend in pesos. Budgy just gets it.", name: "Marco", location: "Remote" },
  { quote: "Set my grocery budget in 10 seconds. Done.", name: "David", location: "Lagos" },
  { quote: "The portfolio insights alone are worth the upgrade.", name: "Priya", location: "Singapore" },
];

export function SocialProofSection() {
  const { container, item } = useStaggerVariants();

  return (
    <section className="py-24" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="section-shell text-center">
        <Reveal>
          <p
            className="font-black"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 3.5rem)",
              letterSpacing: "-0.04em",
              color: "var(--color-accent)",
            }}
          >
            <AnimatedCounter value={247} suffix="+" />
          </p>
          <p className="mt-2 text-base" style={{ color: "var(--color-text-secondary)" }}>
            people have already joined the waitlist
          </p>
        </Reveal>

        <m.div
          className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TESTIMONIALS.map((t) => (
            <m.figure
              key={t.name}
              variants={item}
              className="rounded-2xl p-6 text-left"
              style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
            >
              <blockquote className="text-base" style={{ color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>
                — {t.name}, {t.location}
              </figcaption>
            </m.figure>
          ))}
        </m.div>
      </div>
    </section>
  );
}
