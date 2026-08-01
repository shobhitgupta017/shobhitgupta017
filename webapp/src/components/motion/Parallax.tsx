"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Moves its children vertically as the section scrolls through the viewport.
 * `distance` is the total travel in pixels across the full scroll range.
 */
export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.4 });

  if (reduceMotion)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
