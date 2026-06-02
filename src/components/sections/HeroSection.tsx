"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ChatDemo } from "@/components/sections/ChatDemo";

interface Particle {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

// Deterministic particle field (seeded LCG → identical on server & client → no
// hydration mismatch). Pure CSS `float` animation handles the motion.
function buildParticles(count: number): Particle[] {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 2 + rand() * 2,
    delay: rand() * 5,
    duration: 4 + rand() * 4,
    opacity: 0.12 + rand() * 0.13,
  }));
}

const PARTICLES = buildParticles(25);
const LINE_ONE = ["Stop", "tracking."];
const LINE_TWO = ["Start", "talking."];
const AVATAR_TINTS = ["18%", "38%", "58%", "78%"];

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const headline: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
  };
  const word: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      };
  const avatars: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.2 } },
  };
  const avatar: Variants = reduceMotion
    ? { hidden: { opacity: 1, x: 0 }, show: { opacity: 1, x: 0 } }
    : { hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } };

  const fade = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay },
        };

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[640px] w-[860px] -translate-x-1/2"
        style={{
          background: "radial-gradient(closest-side, var(--color-accent-glow), transparent)",
        }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              backgroundColor: "var(--color-accent)",
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <m.span
          className="pill"
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.4 },
              })}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
            aria-hidden
          />
          Now accepting early access
        </m.span>

        <m.h1
          className="mt-7 font-black"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.06, letterSpacing: "-0.045em" }}
          variants={headline}
          initial="hidden"
          animate="show"
        >
          <span className="block" style={{ color: "var(--color-text-primary)" }}>
            {LINE_ONE.map((w) => (
              <m.span key={w} variants={word} className="inline-block">
                {w}&nbsp;
              </m.span>
            ))}
          </span>
          <span className="block" style={{ color: "var(--color-accent)" }}>
            {LINE_TWO.map((w) => (
              <m.span key={w} variants={word} className="inline-block">
                {w}&nbsp;
              </m.span>
            ))}
          </span>
        </m.h1>

        <m.p className="mt-5 text-base font-medium" style={{ color: "var(--color-text-muted)" }} {...fade(0.45)}>
          Your money. Your buddy.
        </m.p>

        <m.p
          className="mx-auto mt-4 max-w-xl text-base"
          style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}
          {...fade(0.45)}
        >
          Budgy is the AI finance companion that logs your expenses, tracks your
          budget, and gives you real advice — all through plain conversation. No
          forms. No dashboards. Just chat.
        </m.p>

        <m.div
          id="waitlist"
          className="mx-auto mt-8 max-w-md scroll-mt-28"
          {...(reduceMotion
            ? { initial: false as const }
            : {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.5, delay: 0.65 },
              })}
        >
          <WaitlistForm inputId="hero-waitlist-email" />
          <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Free to join · No spam · Ever
          </p>
        </m.div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <m.div className="flex -space-x-2.5" variants={avatars} initial="hidden" animate="show">
            {AVATAR_TINTS.map((tint, i) => (
              <m.span
                key={i}
                variants={avatar}
                className="h-8 w-8 rounded-full"
                style={{
                  backgroundColor: `color-mix(in srgb, var(--color-accent) ${tint}, var(--color-surface-hover))`,
                  border: "2px solid var(--color-bg)",
                }}
                aria-hidden
              />
            ))}
          </m.div>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            <AnimatedCounter value={247} className="font-semibold" /> people already
            on the waitlist
          </p>
        </div>
      </div>

      <div className="mt-16">
        <ChatDemo />
      </div>
    </section>
  );
}
