"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

// LazyMotion wraps the entire app and loads the `domAnimation` feature bundle.
// `strict` makes the full `motion.*` API throw — we always use `m.*` instead,
// keeping the animation bundle small.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
