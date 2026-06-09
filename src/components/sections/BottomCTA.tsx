import { Reveal } from "@/components/ui/Reveal";
import { appUrl } from "@/lib/site";

export function BottomCTA() {
  return (
    <section className="py-24">
      <Reveal className="section-shell" style={{ maxWidth: "44rem" }}>
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
              Free forever. No credit card. No bank linking.
            </p>

            <div className="mt-8">
              <a
                className="btn-accent"
                href={appUrl}
                style={{ padding: "1rem 1.75rem", fontSize: "16px" }}
              >
                Get started free
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
