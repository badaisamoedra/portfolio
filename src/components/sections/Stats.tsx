"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Flag, Smile, Code2, Coffee } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────
// 70-20-10: 70% dark bg, 20% white text/numbers, 10% brand red accent (icons)
const STATS = [
  { icon: Flag,  value: 30,  suffix: "+",  labelBold: "PROJECT", labelLight: "COMPLETED" },
  { icon: Smile, value: 15,  suffix: "+",  labelBold: "HAPPY",   labelLight: "CLIENTS"   },
  { icon: Code2, value: 150, suffix: "K+", labelBold: "LINES",   labelLight: "OF CODE"   },
  { icon: Coffee,value: 11,  suffix: "K",  labelBold: "CUP",     labelLight: "OF COFFEE" },
] as const;

// ── Count-up hook ────────────────────────────────────────────────
function useCountUp(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration, triggered]);

  return count;
}

// ── Single stat item ─────────────────────────────────────────────
function StatItem({
  icon: Icon,
  value,
  suffix,
  labelBold,
  labelLight,
  triggered,
  index,
}: (typeof STATS)[number] & { triggered: boolean; index: number }) {
  const count = useCountUp(value, 1600, triggered);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: triggered ? 1 : 0, y: triggered ? 0 : 20 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4"
    >
      {/* Icon — brand red as section accent */}
      <Icon size={34} strokeWidth={1.3} className="text-[#EF2B24] flex-shrink-0" />

      {/* Number + label */}
      <div className="flex flex-col gap-0.5">
        <span
          className="text-3xl md:text-4xl font-black text-white leading-none"
          style={{ fontFamily: "var(--font-montserrat)", letterSpacing: "-0.02em" }}
        >
          {count}{suffix}
        </span>
        <p className="text-[10px] tracking-[0.18em] text-white/55 uppercase">
          <strong className="font-bold text-white/75">{labelBold}</strong>{" "}
          <span className="font-light">{labelLight}</span>
        </p>
      </div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────
export default function Stats() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Stats"
      className="py-14 relative overflow-hidden"
      style={{ backgroundColor: "#2E2E2E" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(239,43,36,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-24">
          {STATS.map((stat, i) => (
            <StatItem key={stat.labelBold} {...stat} triggered={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
