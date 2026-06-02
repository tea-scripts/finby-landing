import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Reveal } from "@/components/ui/Reveal";

export function BottomCTA() {
  return (
    <section className="py-24">
      <Reveal
        className="section-shell"
        style={{ maxWidth: "44rem" }}
      >
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border-accent)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-0 h-72 w-[120%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(closest-side, var(--color-accent-glow), transparent)",
            }}
          />
          <div className="relative">
            <h2
              className="mx-auto max-w-xl font-extrabold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.375rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                color: "var(--color-text-primary)",
              }}
            >
              Your money deserves a better conversation.
            </h2>
            <p
              className="mx-auto mt-4 max-w-md text-base"
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}
            >
              Join the waitlist — free forever, no credit card needed.
            </p>

            <div className="mx-auto mt-8 max-w-md">
              <WaitlistForm inputId="cta-waitlist-email" />
              <p
                className="mt-3 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                We&apos;ll notify you the moment Budgy is ready.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
