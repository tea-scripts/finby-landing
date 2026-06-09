import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Finby collects, uses, and protects your information.",
};

const LAST_UPDATED = "June 9, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h2>
      <div
        className="space-y-2 text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {children}
      </div>
    </section>
  );
}

const ink = { color: "var(--color-text-primary)" };
const accent = { color: "var(--color-accent)" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <Link href="/" className="inline-flex" aria-label="Finby home">
        <Logo />
      </Link>

      <h1
        className="mt-8 font-extrabold"
        style={{ fontSize: "clamp(1.85rem, 4vw, 2.375rem)", letterSpacing: "-0.03em", ...ink }}
      >
        Privacy Policy
      </h1>
      <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-8 space-y-7">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Finby (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a conversational personal-finance app. This
          policy explains what we collect, how we use it, and the choices you have. By using Finby
          you agree to this policy.
        </p>

        <Section title="Information we collect">
          <p>
            <span style={ink}>Account information</span> — your name, email address, and a securely
            hashed password when you sign up.
          </p>
          <p>
            <span style={ink}>Financial information you provide</span> — the transactions, budgets,
            accounts, and investment holdings you log, including amounts, categories, merchants,
            notes, and dates. We do not connect to your bank; you decide what to enter.
          </p>
          <p>
            <span style={ink}>Chat content</span> — the messages you send to the Finby assistant so
            it can respond and log entries on your behalf.
          </p>
          <p>
            <span style={ink}>Usage &amp; device data</span> — basic analytics (pages viewed,
            features used), and, if you enable them, push-notification tokens.
          </p>
          <p>
            <span style={ink}>Payment information</span> — handled by our payment processors. We
            store your subscription tier and status, never your full card details.
          </p>
        </Section>

        <Section title="How we use your information">
          <p>
            To provide the app — log and display your finances, run budgets and analytics, and let
            the assistant answer your questions.
          </p>
          <p>To manage your account, subscription, and security.</p>
          <p>To send essential emails (verification, password reset, billing, expiry reminders).</p>
          <p>To understand and improve the product, and act on the feedback you submit.</p>
          <p>
            We process your data on the basis of contract performance (to provide the service you
            signed up for) and legitimate interest (security, fraud prevention, and product
            improvement).
          </p>
        </Section>

        <Section title="Service providers we share with">
          <p>
            We share only what each provider needs to function. We do not sell your personal
            information as defined under the CCPA. Our providers include:
          </p>
          <p>
            <span style={ink}>AI processing</span> — chat messages are processed by our AI provider
            (Anthropic) to generate responses. They do not train on your data.
          </p>
          <p>
            <span style={ink}>Payments</span> — Stripe, Paystack, and Lemon Squeezy process
            subscriptions.
          </p>
          <p>
            <span style={ink}>Email</span> — Resend delivers our transactional emails.
          </p>
          <p>
            <span style={ink}>Analytics</span> — PostHog helps us understand product usage. Our
            analytics run cookieless — no analytics cookies or browser storage are set.
          </p>
          <p>
            <span style={ink}>Hosting &amp; infrastructure</span> — our cloud hosting and database
            providers store the app and your data.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            We use only essential storage needed to keep you signed in and run the app. We do not use
            advertising cookies, and our analytics are cookieless, so no consent banner is required
            for tracking.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            We keep your information while your account is active. You can delete your data by
            closing your account; we remove or anonymize it except where we must retain records for
            legal, tax, or fraud-prevention reasons.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We protect your data with encryption in transit, hashed passwords, scoped access, and
            workspace isolation. No system is perfectly secure, but we work to safeguard your
            information.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            You can access, correct, export, or delete your data, and opt out of non-essential
            emails. Depending on where you live, you may have additional rights under laws such as
            GDPR or CCPA. To exercise any of these, contact us below.
          </p>
        </Section>

        <Section title="Children">
          <p>
            Finby is not intended for anyone under 16, and we do not knowingly collect their data.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy as the product evolves. We&apos;ll revise the date above and,
            for material changes, notify you in the app or by email.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about your privacy? Email us at{" "}
            <a href="mailto:support@finby.app" className="hover:underline" style={accent}>
              support@finby.app
            </a>
            .
          </p>
        </Section>
      </div>

      <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--color-border)" }}>
        <Link href="/" className="text-sm hover:underline" style={accent}>
          ← Back to Finby
        </Link>
      </div>
    </main>
  );
}
