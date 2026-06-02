"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal, useStaggerVariants } from "@/components/ui/Reveal";

interface Plan {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    tagline: "Get started with one currency",
    features: ["1 currency", "3-month history", "20 chats/day", "Budget alerts"],
  },
  {
    name: "Pro",
    price: "$4.99",
    tagline: "For multi-currency earners",
    features: [
      "Unlimited currencies",
      "Full history",
      "Portfolio tracking",
      "Market insights",
      "Data export",
    ],
    featured: true,
  },
  {
    name: "Premium",
    price: "$9.99",
    tagline: "For those who want a true AI coach",
    features: [
      "Everything in Pro",
      "Full memory dossier",
      "Proactive AI coaching",
      "Predictive alerts",
      "Priority support",
    ],
  },
  {
    name: "Family",
    price: "$14.99",
    tagline: "For couples and families",
    features: [
      "Up to 5 members",
      "Shared workspace",
      "Per-member dossier",
      "All Premium features",
    ],
  },
];

export function PricingSection() {
  const { container, item } = useStaggerVariants();

  return (
    <section id="pricing" className="py-24">
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
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            Start free. Upgrade when Budgy earns it.
          </p>
        </Reveal>

        <m.div
          className="pricing-grid mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PLANS.map((plan) => (
            <m.div
              key={plan.name}
              variants={item}
              className={`card pricing-card relative flex h-full flex-col p-6 ${plan.featured ? "floating" : ""}`}
              style={plan.featured ? { borderColor: "var(--color-border-accent)" } : undefined}
            >
              {plan.featured ? (
                <span
                  className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: "var(--color-accent)", color: "#ffffff" }}
                >
                  Popular
                </span>
              ) : null}

              <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-secondary)" }}>
                {plan.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold" style={{ color: "var(--color-text-primary)" }}>
                  {plan.price}
                </span>
                <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  /mo
                </span>
              </div>

              <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {plan.tagline}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                aria-label={`Join the waitlist — ${plan.name} plan`}
                className={plan.featured ? "btn-accent mt-6" : "mt-6"}
                style={
                  plan.featured
                    ? undefined
                    : {
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "0.75rem",
                        padding: "0.75rem 1rem",
                        fontWeight: 600,
                        fontSize: "14px",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                      }
                }
              >
                Join waitlist →
              </a>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
