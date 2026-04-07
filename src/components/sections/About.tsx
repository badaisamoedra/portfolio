"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";

// ── Data ────────────────────────────────────────────────────────
const SKILLS = [
  { label: "System Architecture", pct: 92, accent: "#EF2B24" },
  { label: "Software Engineering",         pct: 80, accent: "#2F56A6" },
  { label: "Engineering Leadership",            pct: 85, accent: "#3BB44A" },
  // { label: "System Thinking",     pct: 95, accent: "#F5B21B" },
  // { label: "Automation & AI",     pct: 70, accent: "#0B0B0B" },
  { label: "Business Awareness",     pct: 97, accent: "#76B7BB" },
  // { label: "Aesthetic Sense",     pct: 78, accent: "#0B0B0B" },
];

const EDUCATION = [
  {
    period: "2007–2013",
    institution: "Universitas Gunadarma",
    title: "COMPUTER",
    titleBold: "SCIENCE",
    desc: "Studied computer science fundamentals, algorithms, software engineering, and distributed systems.",
  },
  {
    period: "2017",
    institution: "Astra",
    title: "DEVOPS",
    titleBold: "ENGINEERING (Course)",
    desc: `Intensive concepts such as Orchestration, Containerization, and Infrastructure-as-Code (IaC) while gaining expertise in 
          popular programming languages and tools like Java, Python, Linux, and Docker. Kubernetes, Terraform, Ansible, and more!.`,
  },
  {
    period: "2019",
    institution: "Astra",
    title: "CLOUD",
    titleBold: "ENGINEERING (Course)",
    desc: "Intensive cloud architecture program covering Azure services, infrastructure-as-code, and scalable system design.",
  },
  {
    period: "2022",
    institution: "Udemy",
    title: "NESTJS",
    titleBold: "DEVELOPMENT (Course)",
    desc: `NestJS is a Node.js back-end development framework built upon Express, leveraging the power of TypeScript.
            NestJS leverages the incredible popularity and robustness of JavaScript as a language and Node.js as a technology.`,
  },
  {
    period: "2023",
    institution: "Udemy",
    title: "RABBITMQ",
    titleBold: "DEV (Course)",
    desc: `RabbitMQ patterns like work queues, publish subscribe, RPC, dead letter exchanges (DLX), delayed scheduling etc.`,
  },
];

const EXPERIENCE = [
  {
    period: "2013–2015",
    company: "Alfamart",
    title: "BACKEND",
    titleBold: "ENGINEER",
    desc: `Built foundational systems for payroll and workforce operations in a high-scale retail environment. 
            Designed and developed a payroll system using Oracle, ensuring accuracy, consistency, and scalability across operational workflows
            Built an employee attendance system using Python, supporting daily operations across distributed retail stores
            Focused on data integrity, system reliability, and maintainability in a high-frequency transaction environment`,
  },
  {
    period: "2015–2021",
    company: "Astra",
    title: "SENIOR",
    titleBold: "ENGINEER",
    desc: `Led engineering execution across projects, balancing system design, team delivery, and business constraints.
            Managed engineering teams and ensured project delivery aligned with cost, quality, and timeline constraints
            Led the development of a transportation system for logistics and rental operations, handling complex workflows and integrations
            Acted as a technical decision maker, bridging business requirements with system architecture
            Improved development processes to ensure predictable delivery and maintainable systems`,
  },
  {
    period: "2022–Now",
    company: "Freelance",
    title: "PRINCIPAL",
    titleBold: "ENGINEER",
    desc: `Operating at the intersection of architecture, engineering strategy, and system-level decision making.
            Defined and drove system architecture and technical direction across multiple products
            Led high-impact engineering decisions with focus on scalability, reliability, and long-term sustainability
            Mentored engineers and shaped engineering practices to improve system quality and team effectiveness
            Worked closely with business stakeholders to ensure technology aligns with real operational needs`,
  },
];

// ── Sub-components ───────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 mb-14">
      <h2
        className="text-3xl md:text-4xl font-black tracking-[0.16em] text-[#0B0B0B] uppercase"
        style={{ fontFamily: "var(--font-poiret)" }}
      >
        {children}
      </h2>
      {/* Double line separator — matches reference exactly */}
      <div className="flex flex-col items-center gap-1">
        <div className="w-24 h-[2px] bg-[#0B0B0B]" />
        <div className="w-16 h-[2px] bg-[#0B0B0B]" />
      </div>
    </div>
  );
}

function MixedHeading({ light, bold }: { light: string; bold: string }) {
  return (
    <h3 className="text-xl md:text-2xl tracking-[0.14em] text-[#0B0B0B] uppercase mb-5">
      <span className="font-light">{light} </span>
      <span className="font-black">{bold}</span>
      <span className="font-light text-[#0B0B0B]/60">?</span>
    </h3>
  );
}

function ExpertHeading({ light, bold }: { light: string; bold: string }) {
  return (
    <h3 className="text-xl md:text-2xl tracking-[0.14em] text-[#0B0B0B] uppercase mb-5">
      <span className="font-light">{light} </span>
      <span className="font-black">{bold}</span>
    </h3>
  );
}

// Animated skill bar
function SkillBar({
  label,
  pct,
  accent,
  delay,
}: {
  label: string;
  pct: number;
  accent: string;
  delay: number;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-5 last:mb-0">
      <p className="text-xs font-semibold tracking-[0.14em] text-[#0B0B0B] uppercase mb-2">
        {label}
      </p>
      <div className="relative h-[3px] bg-[#0B0B0B]/12 rounded-full">
        {/* Filled bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: accent }}
        />
        {/* Percentage badge — floats at end of bar */}
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: inView ? `${pct}%` : 0, opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-[22px] -translate-x-full flex items-center justify-center px-2 py-0.5 text-[10px] font-bold text-white rounded"
          style={{ backgroundColor: accent }}
        >
          {pct}%
        </motion.div>
      </div>
    </div>
  );
}

// Timeline entry — matches reference layout: period+institution on left, title+desc on right
function TimelineEntry({
  period,
  sub,
  title,
  titleBold,
  desc,
  accentDot,
  delay,
}: {
  period: string;
  sub: string;
  title: string;
  titleBold: string;
  desc: string;
  accentDot: string;
  delay: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-[100px_1fr] gap-x-6 py-5 border-b border-[#0B0B0B]/08 last:border-0"
    >
      {/* Left: period + institution */}
      <div className="flex flex-col gap-0.5 pt-0.5">
        <span className="text-[11px] text-[#0B0B0B]/50 font-medium tracking-wide">{period}</span>
        <span className="text-[11px] font-bold text-[#0B0B0B] uppercase tracking-wide leading-tight">{sub}</span>
      </div>

      {/* Right: title + desc */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-light tracking-[0.08em] text-[#0B0B0B] uppercase">
          <span
            className="font-black"
            style={{ color: accentDot }}
          >
            {title}
          </span>
          {" "}{titleBold}
        </p>
        <p className="text-sm text-[#0B0B0B]/60 leading-[1.7]">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Main Section ────────────────────────────────────────────────
export default function About() {
  const topRef    = useRef<HTMLDivElement>(null);
  const topInView = useInView(topRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="section-padding bg-[#F5F5F5]"
      aria-label="About"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <SectionTitle>About Me</SectionTitle>

        {/* ── Top row: Who AM I + Expert IN ── */}
        <div
          ref={topRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12"
        >
          {/* Left: WHO AM I */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: topInView ? 1 : 0, x: topInView ? 0 : -24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MixedHeading light="WHO" bold="AM I" />
            <div className="space-y-4 text-[#0B0B0B]/65 text-sm leading-[1.85] mb-8">
              <p>
                I&apos;m an architect by thinking, an engineer by practice, and an aesthete by instinct.
                I don&apos;t just build systems — I shape how they behave, scale, and feel in the real world.
                My work sits at the intersection of structure and clarity, where logic drives decisions and design brings coherence.
              </p>
              <p>
                I care about systems that don&apos;t just function, but make sense — technically, operationally, and visually.
                Because in the end, a system is not just what it does, but how well it holds together.
              </p>
            </div>

            {/* Download CV — black rectangular button, matching reference */}
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#0B0B0B] text-white text-xs font-bold tracking-[0.18em] uppercase transition-[background-color,transform] duration-200 hover:bg-[#EF2B24] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2"
            >
              <Download size={14} strokeWidth={2.5} />
              Download My CV
            </a>
          </motion.div>

          {/* Right: EXPERT IN + skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: topInView ? 1 : 0, x: topInView ? 0 : 24 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ExpertHeading light="EXPERT" bold="IN" />
            <p className="text-sm text-[#0B0B0B]/60 leading-[1.8] mb-8">
              I approach systems the way I approach design — with structure, intention, and clarity.
              As an architect and engineer, I focus on building systems that work in the real world.
            </p>

            <div className="pt-4">
              {SKILLS.map((s, i) => (
                <SkillBar key={s.label} {...s} delay={0.2 + i * 0.1} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom row: Education + Experience cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Education card */}
          <div
            className="bg-white rounded-2xl px-8 py-8"
            style={{
              boxShadow: "0 4px 16px rgba(239,43,36,0.06), 0 1px 4px rgba(11,11,11,0.06)",
            }}
          >
            <h3 className="text-xl tracking-[0.14em] text-[#0B0B0B] uppercase mb-1">
              <span className="font-black text-[#EF2B24]">EDU</span>
              <span className="font-light">CATION</span>
            </h3>
            <div className="w-8 h-[2px] bg-[#EF2B24] mb-6" />

            {EDUCATION.map((e, i) => (
              <TimelineEntry
                key={e.period}
                period={e.period}
                sub={e.institution}
                title={e.title}
                titleBold={e.titleBold}
                desc={e.desc}
                accentDot="#EF2B24"
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>

          {/* Experience card */}
          <div
            className="bg-white rounded-2xl px-8 py-8"
            style={{
              boxShadow: "0 4px 16px rgba(47,86,166,0.07), 0 1px 4px rgba(11,11,11,0.06)",
            }}
          >
            <h3 className="text-xl tracking-[0.14em] text-[#0B0B0B] uppercase mb-1">
              <span className="font-black text-[#2F56A6]">EX</span>
              <span className="font-light">PERIENCE</span>
            </h3>
            <div className="w-8 h-[2px] bg-[#2F56A6] mb-6" />

            {EXPERIENCE.map((e, i) => (
              <TimelineEntry
                key={e.period}
                period={e.period}
                sub={e.company}
                title={e.title}
                titleBold={e.titleBold}
                desc={e.desc}
                accentDot="#2F56A6"
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
