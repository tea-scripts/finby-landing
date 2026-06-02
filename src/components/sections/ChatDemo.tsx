"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export interface ChatMessage {
  from: "user" | "budgy";
  text: string;
}

// Three exchanges, in play order.
export const CHAT_SCRIPT: ChatMessage[] = [
  { from: "user", text: "I spent $40 on shoes from Shein today 👟" },
  {
    from: "budgy",
    text: "Logged $40.00 under Shopping from Shein. That puts your shopping spend at $127 this month — 85% of your $150 budget, with 11 days left. ⚠️",
  },
  { from: "user", text: "What did I spend the most on this month?" },
  {
    from: "budgy",
    text: "Your top 3:\n1. Dining — $218 (29%)\n2. Shopping — $127 (17%)\n3. Transport — $94 (13%)\nWant me to set a dining limit for next month?",
  },
  { from: "user", text: "What's a good stock to buy right now?" },
  {
    from: "budgy",
    text: "For your $500/mo investing budget, VOO (S&P 500 ETF) at $487.20 is a strong long-term hold. Low cost, broad exposure. Want a breakdown? 📈",
  },
];

// Hardcoded demo data for the "Want a breakdown?" reveal (no backend).
const VOO_STATS = [
  { label: "Price", value: "$487.20" },
  { label: "1-yr return", value: "+24.8%", positive: true },
  { label: "Expense ratio", value: "0.03%" },
];
const VOO_SECTORS = [
  { label: "Tech", pct: 31, tint: "100%" },
  { label: "Financials", pct: 13, tint: "70%" },
  { label: "Healthcare", pct: 12, tint: "45%" },
  { label: "Other", pct: 44, tint: "22%" },
];

const SPRING = { type: "spring", stiffness: 320, damping: 26 } as const;

function bubbleStyle(isUser: boolean) {
  return isUser
    ? {
        backgroundColor: "var(--color-accent)",
        color: "#ffffff",
        borderBottomRightRadius: "0.35rem",
      }
    : {
        backgroundColor: "var(--color-surface-hover)",
        color: "var(--color-text-primary)",
        border: "1px solid var(--color-border)",
        borderBottomLeftRadius: "0.35rem",
      };
}

function Bubble({ message }: { message: ChatMessage }) {
  const isUser = message.from === "user";
  return (
    <m.div
      layout
      initial={{ opacity: 0, x: isUser ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={SPRING}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className="max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={bubbleStyle(isUser)}
      >
        {message.text}
      </div>
    </m.div>
  );
}

function TypingIndicator() {
  return (
    <m.div
      layout
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={SPRING}
      className="flex justify-start"
      aria-label="Budgy is typing"
    >
      <div
        className="flex items-center gap-1 rounded-2xl px-4 py-3.5"
        style={{
          backgroundColor: "var(--color-surface-hover)",
          border: "1px solid var(--color-border)",
          borderBottomLeftRadius: "0.35rem",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "var(--color-text-secondary)",
              animation: "typing-bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </m.div>
  );
}

function BreakdownBubble() {
  return (
    <m.div
      layout
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={SPRING}
      className="flex justify-start"
    >
      <div
        className="w-[88%] rounded-2xl px-4 py-3.5"
        style={{
          backgroundColor: "var(--color-surface-hover)",
          border: "1px solid var(--color-border-accent)",
          borderBottomLeftRadius: "0.35rem",
        }}
      >
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          VOO — Vanguard S&amp;P 500 ETF
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {VOO_STATS.map((s) => (
            <div key={s.label}>
              <p
                className="text-[11px]"
                style={{ color: "var(--color-text-muted)" }}
              >
                {s.label}
              </p>
              <p
                className="text-sm font-semibold"
                style={{
                  color: s.positive
                    ? "var(--color-success)"
                    : "var(--color-text-primary)",
                }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3.5">
          <p
            className="mb-1.5 text-[11px]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Sector spread
          </p>
          <div
            className="flex h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: "var(--color-bg)" }}
            role="img"
            aria-label="Sector spread: Tech 31%, Financials 13%, Healthcare 12%, Other 44%"
          >
            {VOO_SECTORS.map((sector) => (
              <m.span
                key={sector.label}
                initial={{ width: 0 }}
                animate={{ width: `${sector.pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                style={{
                  backgroundColor: `color-mix(in srgb, var(--color-accent) ${sector.tint}, var(--color-surface))`,
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {VOO_SECTORS.map((sector) => (
              <span
                key={sector.label}
                className="inline-flex items-center gap-1.5 text-[11px]"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--color-accent) ${sector.tint}, var(--color-surface))`,
                  }}
                  aria-hidden
                />
                {sector.label} {sector.pct}%
              </span>
            ))}
          </div>
        </div>

        <p
          className="mt-3.5 text-sm leading-relaxed"
          style={{ color: "var(--color-text-primary)" }}
        >
          At $500/mo, that&apos;s ~1 share — broad, low-cost exposure that compounds
          quietly. A solid core hold. 📈
        </p>
      </div>
    </m.div>
  );
}

// Timeline (ms): show msg, toggle typing, then reset+loop.
const TIMELINE: Array<{ at: number; count: number; typing: boolean }> = [
  { at: 800, count: 1, typing: false },
  { at: 1200, count: 1, typing: true },
  { at: 2400, count: 2, typing: false },
  { at: 3800, count: 3, typing: false },
  { at: 4200, count: 3, typing: true },
  { at: 5200, count: 4, typing: false },
  { at: 6600, count: 5, typing: false },
  { at: 7000, count: 5, typing: true },
  { at: 7900, count: 6, typing: false },
];
const RESET_AT = 10900;

type Phase = "playing" | "breakdown";

export function ChatDemo() {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [phase, setPhase] = useState<Phase>("playing");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(CHAT_SCRIPT.length);
      setTyping(false);
      return;
    }
    // "breakdown" pauses the auto-loop; the timeline only runs while playing.
    if (phase === "breakdown") return;

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    for (const step of TIMELINE) {
      timers.push(
        setTimeout(() => {
          setCount(step.count);
          setTyping(step.typing);
        }, step.at),
      );
    }
    timers.push(
      setTimeout(() => {
        setCount(0);
        setTyping(false);
        setCycle((c) => c + 1);
      }, RESET_AT),
    );
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion, phase, cycle]);

  const conversationComplete = count === CHAT_SCRIPT.length && !typing;
  const showChip = phase === "playing" && conversationComplete;

  const openBreakdown = () => setPhase("breakdown");
  const replay = () => {
    setPhase("playing");
    setCount(0);
    setTyping(false);
    setCycle((c) => c + 1);
  };

  return (
    <div
      className="mx-auto w-full max-w-md overflow-hidden rounded-3xl"
      style={{
        backgroundColor: "var(--color-bg)",
        border: "1px solid var(--color-border)",
        boxShadow: "0 30px 80px -40px var(--color-accent-glow)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <Logo />
        <span className="eyebrow" style={{ fontSize: "11px" }}>
          ✦ How it works
        </span>
      </div>

      <div className="flex min-h-[420px] flex-col justify-end gap-3 px-4 py-5">
        <AnimatePresence mode="popLayout" initial={false}>
          {CHAT_SCRIPT.slice(0, count).map((message, i) => (
            <Bubble key={i} message={message} />
          ))}
          {typing ? <TypingIndicator key="typing" /> : null}
          {phase === "breakdown" ? <BreakdownBubble key="breakdown" /> : null}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {showChip ? (
            <m.div
              key="chip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex justify-end"
            >
              <button
                type="button"
                onClick={openBreakdown}
                className="chat-action"
                aria-label="Show the VOO breakdown"
              >
                Want a breakdown? →
              </button>
            </m.div>
          ) : null}

          {phase === "breakdown" ? (
            <m.div
              key="replay"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.4 }}
              className="flex justify-center"
            >
              <button
                type="button"
                onClick={replay}
                className="chat-action inline-flex items-center gap-1.5"
                aria-label="Replay the conversation"
              >
                <RotateCcw size={13} aria-hidden />
                Replay
              </button>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
