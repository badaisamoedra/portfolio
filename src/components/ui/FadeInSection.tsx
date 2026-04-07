"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Staggered fade-up reveal triggered when section enters viewport.
 * Wraps any children; each direct child staggers by `stagger` seconds.
 */
export default function FadeInSection({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual item that participates in a FadeInSection stagger.
 * Use as a child of FadeInSection or with your own parent variants.
 */
export function FadeItem({
  children,
  className,
  distance = 24,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
