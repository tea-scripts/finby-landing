import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Finby.",
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

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <Link href="/" className="inline-flex" aria-label="Finby home">
        <Logo />
      </Link>

      <h1
        className="mt-8 font-extrabold"
        style={{ fontSize: "clamp(1.85rem, 4vw, 2.375rem)", letterSpacing: "-0.03em", ...ink }}
      >
        Terms of Service
      </h1>
      <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-8 space-y-7">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Finby (&ldquo;Finby&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), a conversational personal-finance app. By creating an
          account or using Finby, you agree to these Terms. If you don&apos;t agree, don&apos;t use
          the app.
        </p>

        <Section title="1. Eligibility">
          <p>
            You must be at least 16 years old to use Finby. By using it, you confirm you meet this
            requirement and can form a binding agreement with us.
          </p>
        </Section>

        <Section title="2. Your account">
          <p>
            Provide accurate information, keep your password secure, and don&apos;t share your
            account. You&apos;re responsible for activity under your account. Tell us promptly if you
            suspect unauthorized access.
          </p>
        </Section>

        <Section title="3. The service">
          <p>
            Finby helps you log and understand your finances through conversation — you enter your
            own transactions, budgets, accounts, and holdings. Finby is not a bank, broker, or money
            transmitter, does not connect to or move money in your financial accounts, and does not
            execute trades.
          </p>
        </Section>

        <Section title="4. Not financial advice">
          <p>
            Finby is an informational tool, not a financial, investment, tax, or legal adviser.
            Anything Finby (including its AI assistant) tells you is for general information only and
            is not professional advice. Decisions you make are your own; consult a qualified
            professional before acting. Investing carries risk, including loss of principal.
          </p>
        </Section>

        <Section title="5. AI assistant">
          <p>
            Finby uses AI to interpret your messages and respond. AI can be inaccurate or incomplete
            — always review what it logs and don&apos;t rely on it as your sole source of truth for
            financial decisions.
          </p>
        </Section>

        <Section title="6. Subscriptions &amp; billing">
          <p>
            Paid plans are billed in advance on a recurring basis through our payment processors and
            renew automatically until cancelled. Upgrades take effect immediately and are prorated;
            downgrades take effect at the end of your current billing period.
          </p>
          <p>
            You can cancel anytime; your plan stays active until the end of the paid period. Except
            where required by law, payments are non-refundable. We may change prices with reasonable
            notice, effective on your next billing cycle.
          </p>
          <p>
            Cancelling stops future renewals but keeps your account; if you close your account, your
            data is then retained or deleted as described in the Data retention section of our
            Privacy Policy.
          </p>
        </Section>

        <Section title="7. Acceptable use">
          <p>
            Don&apos;t use Finby for anything unlawful, don&apos;t attempt to break, overload,
            reverse-engineer, or gain unauthorized access to it, and don&apos;t scrape or misuse the
            service or other users&apos; data.
          </p>
          <p>
            Don&apos;t attempt to manipulate or deceive the AI assistant into producing false or
            fraudulent financial records, or use it to generate misleading information.
          </p>
        </Section>

        <Section title="8. Your content">
          <p>
            You own the data you enter. You grant us a limited licence to store and process it solely
            to operate the service for you, as described in our Privacy Policy. You can export or
            delete your data by managing or closing your account.
          </p>
        </Section>

        <Section title="9. Intellectual property">
          <p>
            Finby, its software, design, and branding belong to us. These Terms don&apos;t transfer
            any of our intellectual property to you.
          </p>
        </Section>

        <Section title="10. Termination">
          <p>
            You may stop using Finby and close your account at any time. We may suspend or terminate
            access if you breach these Terms or to protect the service or other users. On
            termination, your right to use Finby ends; sections that by nature should survive (e.g.
            disclaimers, liability limits) continue to apply.
          </p>
        </Section>

        <Section title="11. Disclaimers">
          <p>
            Finby is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
            of any kind. We don&apos;t guarantee the app will be uninterrupted, error-free, or that
            any information or AI output is accurate or complete.
          </p>
        </Section>

        <Section title="12. Limitation of liability">
          <p>
            To the maximum extent permitted by law, Finby is not liable for indirect, incidental, or
            consequential damages, or for financial losses arising from your use of (or reliance on)
            the app. Our total liability is limited to the amount you paid us in the 12 months before
            the claim.
          </p>
        </Section>

        <Section title="13. Changes to these Terms">
          <p>
            We may update these Terms as the product evolves. We&apos;ll revise the date above and,
            for material changes, notify you in the app or by email. Continued use after changes
            means you accept them.
          </p>
        </Section>

        <Section title="14. Governing law">
          <p>
            These Terms are governed by the laws of the jurisdiction in which Finby operates, without
            regard to its conflict-of-law rules.
          </p>
        </Section>

        <Section title="15. Contact">
          <p>
            Questions about these Terms? Email us at{" "}
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
