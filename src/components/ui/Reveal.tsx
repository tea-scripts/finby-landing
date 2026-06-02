"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

/** Single element that fades + rises into view once. */
export function Reveal({ children, delay = 0, y = 30, className, style }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/**
 * Container + item variants for staggered grids/lists. Honors reduced motion by
 * collapsing the offset and stagger to zero.
 */
export function useStaggerVariants(
  stagger = 0.08,
  y = 20,
): { container: Variants; item: Variants } {
  const reduceMotion = useReducedMotion();
  return {
    container: {
      hidden: {},
      show: {
        transition: { staggerChildren: reduceMotion ? 0 : stagger },
      },
    },
    item: reduceMotion
      ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, y },
          show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
        },
  };
}
