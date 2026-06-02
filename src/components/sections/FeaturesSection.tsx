"use client";

import { m } from "framer-motion";
import { Bell, Brain, Globe, MessageSquare, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: MessageSquare,
    title: "Just say it",
    body: "Log any financial event in plain language. Amount, category, merchant — extracted automatically. No tapping through menus.",
  },
  {
    icon: Globe,
    title: "Multi-currency native",
    body: "Earning USD, spending PHP or NGN? Budgy tracks every currency at the live rate, frozen at the moment you spent it.",
  },
  {
    icon: Bell,
    title: "Live budget warnings",
    body: "Set a monthly limit per category. Budgy warns you at 75%, 90%, and when you're over — right in the conversation.",
  },
  {
    icon: TrendingUp,
    title: "Portfolio insights",
    body: "Track your stocks and ETFs manually. Get AI-powered hold, sell, or compound advice backed by live market data.",
  },
  {
    icon: Brain,
    title: "Knows your habits",
    body: "On Premium, Budgy builds a financial dossier over time and gives you advice that actually fits your life.",
  },
  {
    icon: Users,
    title: "Family plans",
    body: "Share a workspace with your partner or family. Shared visibility, individual budgets, one subscription.",
  },
];

export function FeaturesSection() {
  const { container, item } = useStaggerVariants();

  return (
    <section id="features" className="py-24">
      <div className="section-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Features</p>
          <h2
            className="mt-3 font-extrabold"
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.375rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
            }}
          >
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            Budgy replaces the entire stack of finance apps you&apos;ve been juggling.
          </p>
        </Reveal>

        <m.div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <m.article key={title} variants={item} className="card card-hover group h-full p-6">
              <m.span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--color-accent-glow)", color: "var(--color-accent)" }}
                whileHover={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={20} aria-hidden />
              </m.span>
              <h3 className="mt-5 text-base font-semibold" style={{ color: "var(--color-text-primary)" }}>
                {title}
              </h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
                {body}
              </p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
