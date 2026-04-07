"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

const EASE_OUT = [0.16, 1, 0.3, 1]     as const;
const EASE_SPR = [0.34, 1.56, 0.64, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE_OUT },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_SPR } },
};

// ── Floating badge variants ──────────────────────────────────────
type Badge = {
  position: string;
  animate: { y: number[] };
  duration: number;
  delay: number;
  bg: string;
  content: React.ReactNode;
};

const BADGES: Badge[] = [
  {
    // 10 o'clock — top left
    position: "absolute -left-2 md:-left-8 top-[20%]",
    animate: { y: [0, -8, 0] },
    duration: 3.5,
    delay: 0,
    bg: "bg-white",
    content: (
      <>
        <span className="text-[#2F56A6] text-base leading-none">●</span>
        <div>
          <div className="text-[10px] text-[#0B0B0B]/45 font-normal">Languages</div>
          <div className="font-semibold text-xs text-[#0B0B0B]">Js · Go · Python · Java · PHP</div>
        </div>
      </>
    ),
  },
  {
    // 12 o'clock — top center
    position: "absolute top-[-18px] left-1/2 -translate-x-1/2 whitespace-nowrap",
    animate: { y: [0, -6, 0] },
    duration: 4.2,
    delay: 0.4,
    bg: "bg-white",
    content: (
      <>
        <span className="text-[#3BB44A] text-base leading-none">●</span>
        <div>
          <div className="text-[10px] text-[#0B0B0B]/45 font-normal">Design</div>
          <div className="font-semibold text-xs text-[#0B0B0B]">Figma · Adobe Ilustrator</div>
        </div>
      </>
    ),
  },
  {
    // 2 o'clock — top right
    position: "absolute -right-2 md:-right-14 top-[8%]",
    animate: { y: [0, -7, 0] },
    duration: 3.8,
    delay: 0.8,
    bg: "bg-white",
    content: (
      <>
        <span className="text-[#EF2B24] text-base leading-none">●</span>
        <div>
          <div className="text-[10px] text-[#0B0B0B]/45 font-normal">Cloud</div>
          <div className="font-semibold text-xs text-[#0B0B0B]">AWS · Azure · GCP</div>
        </div>
      </>
    ),
  },
  {
    // 5 o'clock — bottom right
    position: "absolute -right-2 md:-right-12 bottom-[18%]",
    animate: { y: [0, 10, 0] },
    duration: 4,
    delay: 1,
    // bg: "bg-[#0B0B0B]",
    bg: "bg-white",
    content: (
      <>
        <span className="text-[#F5B21B] text-base leading-none">●</span>
        <div>
          <div className="text-[10px] text-[#0B0B0B]/50 font-normal">Experience</div>
          <div className="font-semibold text-xs text-[#0B0B0B]">EM</div>
        </div>
      </>
    ),
  },
  {
    // 7 o'clock — bottom left
    position: "absolute -left-2 md:-left-2 bottom-[18%]",
    animate: { y: [0, 8, 0] },
    duration: 3.6,
    delay: 1.4,
    bg: "bg-white",
    content: (
      <>
        <span className="text-[#F5B21B] text-base leading-none">●</span>
        <div>
          <div className="text-[10px] text-[#0B0B0B]/45 font-normal">Ai</div>
          <div className="font-semibold text-xs text-[#0B0B0B]">Claude · Gpt</div>
        </div>
      </>
    ),
  },
] as const;

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Grid background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,11,11,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,11,11,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          backgroundColor: "#FFFFFF",
        }}
      />

      {/* ── Radial gradient mask — fades grid at edges + center glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,255,255,0.85) 0%, transparent 80%),
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(239,43,36,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(118,183,187,0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Floating decorative blobs ── */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-[12%] right-[8%] w-64 h-64 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #EF2B24 0%, transparent 70%)" }}
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute bottom-[20%] left-[5%] w-48 h-48 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #76B7BB 0%, transparent 70%)" }}
      />

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Headline */}
            <motion.h1
              variants={fadeUp} custom={1} initial="hidden" animate="show"
              className="text-4xl md:text-5xl xl:text-6xl font-normal text-[#0B0B0B] leading-[1.1]"
              style={{ fontFamily: "var(--font-poiret)", letterSpacing: "0.01em" }}
            >
              <span className="block">I build systems</span>
              <span className="block text-[#EF2B24]">that actually work.</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={fadeUp} custom={2} initial="hidden" animate="show"
              className="flex items-center gap-2 text-sm font-medium text-[#0B0B0B]/55 tracking-widest uppercase"
            >
              <span className="text-[#F5B21B] text-sm leading-none">●</span>
              {PERSONAL.role}
            </motion.p>

            {/* Sub-tagline */}
            <motion.p
              variants={fadeUp} custom={3} initial="hidden" animate="show"
              className="text-base md:text-lg text-[#0B0B0B]/65 max-w-md leading-[1.8]"
            >
              {PERSONAL.subTagline}
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="show"
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3 border border-[#0B0B0B] text-[#0B0B0B] font-semibold bg-transparent transition-[background-color,color,transform] duration-200 hover:bg-[#0B0B0B] hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2"
                style={{ borderRadius: "5px" }}
              >
                Contact Me
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp} custom={5} initial="hidden" animate="show"
              className="flex items-center gap-8 pt-4 border-t border-[#0B0B0B]/08"
            >
              {[
                { value: "13+", label: "Years Experience", accent: "#EF2B24" },
                { value: "30+", label: "Projects Shipped",  accent: "#F5B21B" },
                { value: "23+", label: "Happy Clients",     accent: "#3BB44A" },
              ].map(({ value, label, accent }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span
                    className="text-2xl font-black"
                    style={{ fontFamily: "var(--font-montserrat)", color: accent, letterSpacing: "-0.03em" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-[#0B0B0B]/50 font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile image ── */}
          <motion.div
            variants={scaleIn} initial="hidden" animate="show"
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            {/* Dashed ring — tightly wraps the circle photo */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto w-[294px] h-[294px] md:w-[376px] md:h-[376px] rounded-full border border-dashed border-[#EF2B24]/25"
              style={{ animation: "spin 40s linear infinite" }}
            />

            {/* Glow */}
            <div
              aria-hidden
              className="absolute inset-0 m-auto w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full"
              style={{ background: "radial-gradient(ellipse at center, rgba(239,43,36,0.07) 0%, transparent 70%)" }}
            />

            {/* Profile photo — circle */}
            <div
              className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full overflow-hidden z-10"
              style={{ boxShadow: "0 20px 50px rgba(239,43,36,0.12), 0 4px 14px rgba(11,11,11,0.1)" }}
            >
              <Image
                src="/brand_assets/pp_me.jpeg"
                alt={`${PERSONAL.name} — ${PERSONAL.role}`}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 280px, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/25 via-transparent to-transparent" />

              {/* Location chip */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#0B0B0B]">
                  <span className="text-[#EF2B24]">●</span>
                  {PERSONAL.location}
                </span>
              </div>
            </div>

            {/* ── 5 floating badges around the circle ── */}
            {BADGES.map((badge, i) => (
              <motion.div
                key={i}
                animate={badge.animate}
                transition={{ duration: badge.duration, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                className={`absolute ${badge.position} ${badge.bg} flex items-center gap-2.5 px-4 py-2.5 rounded-2xl z-20`}
                style={{
                  boxShadow: badge.bg === "bg-[#0B0B0B]"
                    ? "0 8px 24px rgba(11,11,11,0.2)"
                    : "0 6px 20px rgba(11,11,11,0.09), 0 1px 4px rgba(239,43,36,0.05)",
                }}
              >
                {badge.content}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#0B0B0B]/35 hover:text-[#EF2B24] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2 rounded"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={2} />
        </motion.div>
      </motion.button>
    </section>
  );
}
