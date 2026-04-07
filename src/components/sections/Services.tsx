"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Monitor,
  Code2,
  Server,
  Smartphone,
  Cloud,
  Lightbulb,
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────
// 70-20-10 for this section:
//   70% → dark grey bg (#3C3C3C) + white text
//   20% → brand red (#EF2B24) as the ONE section accent (icon color, hover)
//   10% → white/20 for subtle borders
const SERVICES = [
  {
    icon: Monitor,
    prefix: "WEB",
    bold: "DEVELOPMENT",
    suffix: "& UI",
    desc: "I build web applications that are not only fast and accessible, but structurally sound and visually intentional. From focused landing pages to complex SaaS platforms, every layer is designed to scale, stay maintainable, and feel right in use.",
  },
  {
    icon: Code2,
    prefix: "FULLSTACK",
    bold: "ENGINEERING",
    suffix: "",
    desc: "I take full ownership across the stack — from interface to infrastructure. Not just writing code, but shaping systems that are readable, resilient, and built to evolve without unnecessary complexity.",
  },
  {
    icon: Server,
    prefix: "API &",
    bold: "BACKEND",
    suffix: "DESIGN",
    desc: "I design backend systems and APIs with clarity and intent — focusing on structure, consistency, and long-term scalability. Built to handle real-world conditions, not just ideal scenarios.",
  },
  {
    icon: Smartphone,
    prefix: "MOBILE",
    bold: "APP",
    suffix: "DEVELOPMENT",
    desc: "I create cross-platform mobile applications with shared logic and consistent experience. The goal is not just to run on both platforms, but to feel coherent, reliable, and easy to maintain over time.",
  },
  {
    icon: Cloud,
    prefix: "CLOUD &",
    bold: "DEVOPS",
    suffix: "",
    desc: "I design and manage infrastructure that supports reliable delivery. From CI/CD pipelines to cloud architecture, the focus is on systems that are predictable, scalable, and cost-aware from day one.",
  },
  {
    icon: Lightbulb,
    prefix: "TECHNICAL",
    bold: "CONSULTING",
    suffix: "",
    desc: "I help teams think before they build. Through architecture reviews, system design, and technical direction, I focus on making decisions that reduce complexity and avoid expensive mistakes later.",
  },
] as const;

// ── Sub-components ───────────────────────────────────────────────

function SectionTitle() {
  return (
    <div className="flex flex-col items-center gap-3 mb-16">
      <h2
        className="text-3xl md:text-5xl font-black tracking-[0.12em] text-white uppercase"
        style={{ fontFamily: "var(--font-poiret)", letterSpacing: "-0.01em" }}
      >
        What I Do
      </h2>
      {/* Double line separator — white, matching reference */}
      <div className="flex flex-col items-center gap-1 mt-1">
        <div className="w-24 h-[2px] bg-white/70" />
        <div className="w-16 h-[2px] bg-white/70" />
      </div>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  prefix,
  bold,
  suffix,
  desc,
  index,
}: (typeof SERVICES)[number] & { index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 28 }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.12 + Math.floor(index / 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex items-start gap-5"
    >
      {/* Icon container — ONE accent: brand red */}
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg border border-white/15 transition-[background-color,border-color] duration-300 group-hover:border-[#EF2B24]/50 group-hover:bg-[#EF2B24]/10">
        <Icon
          size={26}
          strokeWidth={1.4}
          className="text-white/60 transition-colors duration-300 group-hover:text-[#EF2B24]"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2.5 pt-1">
        <h3 className="text-sm md:text-base tracking-[0.1em] text-white uppercase leading-snug">
          <span className="font-light opacity-80">{prefix} </span>
          <span className="font-black">{bold}</span>
          {suffix && <span className="font-light opacity-80"> {suffix}</span>}
        </h3>
        <p className="text-sm text-white/50 leading-[1.8] max-w-[320px]">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Main Section ────────────────────────────────────────────────
export default function Services() {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden"
      aria-label="Services"
      style={{ backgroundColor: "#3C3C3C" }}
    >
      {/* Subtle background texture via radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 0% 100%, rgba(239,43,36,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 100% 0%, rgba(118,183,187,0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle />

        {/* 3 × 2 grid — matching reference exactly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.bold} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
