"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import {
  waitlistSchema,
  type WaitlistInput,
} from "@/lib/validations/waitlist.schema";
import type { WaitlistResponse } from "@/types";

type Status = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
  /** Distinguishes the hero and bottom-CTA instances for label association. */
  inputId?: string;
}

export function WaitlistForm({ inputId = "waitlist-email" }: WaitlistFormProps) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WaitlistInput>({
    resolver: zodResolver(waitlistSchema),
    mode: "onSubmit",
  });

  async function onSubmit(values: WaitlistInput): Promise<void> {
    setStatus("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as WaitlistResponse;

      if (!res.ok || !("success" in data)) {
        setServerError(
          "message" in data ? data.message : "Something went wrong. Try again.",
        );
        setStatus("error");
        return;
      }

      setAlreadySignedUp(data.alreadySignedUp);
      setStatus("success");
      reset();
    } catch {
      setServerError("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  const shake =
    status === "error" && !reduceMotion ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 };

  const inlineError = errors.email?.message ?? serverError;

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="status"
            className="flex items-center gap-3 rounded-xl px-4 py-4"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border-accent)",
            }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--color-success)" }}
            >
              <Check size={16} color="#06101f" strokeWidth={3} aria-hidden />
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {alreadySignedUp
                ? "You're already on the waitlist — see you soon! 🎉"
                : "You're on the list! Check your inbox to confirm. 🎉"}
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            animate={shake}
            transition={{ duration: 0.35 }}
            noValidate
            initial={false}
          >
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor={inputId} className="sr-only">
                Email address
              </label>
              <input
                id={inputId}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-label="Email address"
                aria-invalid={Boolean(inlineError)}
                disabled={status === "loading"}
                className="waitlist-input"
                {...register("email")}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Join the waitlist"
                className="btn-accent sm:w-auto"
              >
                {status === "loading" ? (
                  <Loader2 size={18} className="animate-spin" aria-hidden />
                ) : (
                  <>
                    Join waitlist
                    <ArrowRight size={16} aria-hidden />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {inlineError ? (
                <m.p
                  key="error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="mt-2 px-1 text-sm"
                  style={{ color: "var(--color-error)" }}
                >
                  {inlineError}
                </m.p>
              ) : null}
            </AnimatePresence>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
