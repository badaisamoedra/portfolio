"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, MoveRight, X } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────
type Filter =
  | "ALL PROJECTS"
  | "ENTERPRISE"
  | "BACKEND"
  | "MOBILE"
  | "DEVOPS"
  | "AUTOMATION";

interface Project {
  id:       number;
  src:      string;
  title:    string;
  category: Filter;
  categoryLabel: string;
  chip:     string | null;
  col:      string;
  row:      string;
  featured: boolean;
  desc:     string;
  longDesc: string[];
}

// ── Data ──────────────────────────────────────────────────────────
const FILTERS: Filter[] = [
  "ALL PROJECTS",
  "ENTERPRISE",
  "BACKEND",
  "MOBILE",
  "DEVOPS",
  "AUTOMATION",
];

const PROJECTS: Project[] = [
  {
    id: 1,
    src: "/brand_assets/payroll.jpg",
    title: "Payroll System Modernization",
    category: "ENTERPRISE",
    categoryLabel: "Enterprise System",
    chip: null,
    col: "1", row: "1 / span 2",
    featured: false,
    desc: "Built a payroll system designed to handle high-frequency employee data across distributed retail operations.",
    longDesc: [
      "Built a payroll system designed to handle high-frequency employee data across distributed retail operations. The focus was on accuracy, consistency, and long-term maintainability.",
      "The system was structured using Oracle with clear separation of concerns, ensuring payroll calculations remained reliable even as business rules evolved.",
      "As a result, payroll processing became more predictable, auditable, and easier to maintain — reducing operational friction for HR and finance teams.",
    ],
  },
  {
    id: 2,
    src: "/brand_assets/absen.jpg",
    title: "Retail Attendance Tracking System",
    category: "ENTERPRISE",
    categoryLabel: "Workforce Management",
    chip: "CASE STUDY",
    col: "2", row: "1",
    featured: false,
    desc: "Developed an employee attendance system to support daily operations across multiple store locations.",
    longDesc: [
      "Developed an employee attendance system to support daily operations across multiple store locations. The challenge was handling distributed inputs while maintaining consistent and reliable records.",
      "The system was built using Python, with emphasis on data validation and synchronization across different sources.",
      "This improved visibility into workforce activity and reduced manual reconciliation, making operations more efficient and less error-prone.",
    ],
  },
  {
    id: 3,
    src: "/brand_assets/logistic.jpg",
    title: "Logistics & Transportation Platform",
    category: "ENTERPRISE",
    categoryLabel: "Logistics System",
    chip: null,
    col: "3", row: "1 / span 2",
    featured: false,
    desc: "Led the development of a transportation system supporting logistics and rental operations.",
    longDesc: [
      "Led the development of a transportation system supporting logistics and rental operations. The system handled scheduling, allocation, and tracking across multiple moving parts.",
      "Designed the system to manage complex workflows while remaining adaptable to operational changes, ensuring both scalability and clarity in execution.",
      "The platform improved coordination across teams and enabled more efficient resource utilization, directly impacting operational performance.",
    ],
  },
  {
    id: 4,
    src: "/brand_assets/cross.jpg",
    title: "Multi-Service Integration Backend",
    category: "BACKEND",
    categoryLabel: "Backend Architecture",
    chip: null,
    col: "4", row: "1",
    featured: false,
    desc: "Designed a backend system to handle integrations across multiple internal and external services.",
    longDesc: [
      "Designed a backend system to handle integrations across multiple internal and external services. The main challenge was ensuring reliability in a highly interconnected environment.",
      "The architecture focused on modularity, clear boundaries, and controlled failure handling to prevent cascading issues.",
      "This resulted in a more resilient system where integrations became easier to manage, extend, and debug over time.",
    ],
  },
  {
    id: 5,
    src: "/brand_assets/workflow.jpg",
    title: "Engineering Workflow Automation",
    category: "AUTOMATION",
    categoryLabel: "Automation & AI",
    chip: null,
    col: "2", row: "2 / span 2",
    featured: false,
    desc: "Built an automation system to streamline repetitive tasks in the software development lifecycle.",
    longDesc: [
      "Built an automation system to streamline repetitive tasks in the software development lifecycle, including reporting, monitoring, and routine processes.",
      "Using workflow tools and AI integration, the system reduced manual overhead and improved consistency in execution.",
      "This allowed the engineering team to focus on higher-value problems, while routine processes became faster and more predictable.",
    ],
  },
  {
    id: 6,
    src: "/brand_assets/api.jpg",
    title: "Scalable API Platform",
    category: "BACKEND",
    categoryLabel: "API & Backend Design",
    chip: null,
    col: "4", row: "2 / span 2",
    featured: false,
    desc: "Designed and implemented a set of APIs to support growing product needs.",
    longDesc: [
      "Designed and implemented a set of APIs to support growing product needs, with focus on clarity, consistency, and scalability.",
      "The system emphasized clean contracts, predictable behavior, and maintainable structure rather than short-term speed.",
      "As usage increased, the APIs remained stable and extensible, reducing the need for frequent rework and enabling faster product iteration.",
    ],
  },
  {
    id: 7,
    src: "/brand_assets/react.jpg",
    title: "Cross-Platform Mobile Application",
    category: "MOBILE",
    categoryLabel: "Mobile Development",
    chip: "CASE STUDY",
    col: "1", row: "3",
    featured: false,
    desc: "Developed a cross-platform mobile application using a shared logic approach.",
    longDesc: [
      "Developed a cross-platform mobile application using a shared logic approach to ensure consistency across iOS and Android.",
      "The system was designed to minimize duplication while maintaining a coherent user experience and stable performance.",
      "This resulted in faster development cycles and easier maintenance, without sacrificing product quality.",
    ],
  },
  {
    id: 8,
    src: "/brand_assets/aws.jpg",
    title: "Cloud-Native Deployment Pipeline",
    category: "DEVOPS",
    categoryLabel: "DevOps & Infrastructure",
    chip: null,
    col: "3", row: "3",
    featured: false,
    desc: "Designed and implemented a CI/CD pipeline to improve deployment speed and reliability.",
    longDesc: [
      "Designed and implemented a CI/CD pipeline to improve deployment speed and reliability across multiple environments.",
      "The infrastructure was built with a focus on predictability, scalability, and cost-awareness, ensuring teams could ship confidently.",
      "This reduced deployment risks and improved overall system reliability, allowing faster iteration without compromising stability.",
    ],
  },
];

// ── Project Modal ─────────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(11,11,11,0.75)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-[background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close modal"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* ── Top: dark header — title + category ── */}
        <div className="px-8 pt-8 pb-6" style={{ backgroundColor: "#2E2E2E" }}>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#EF2B24] uppercase mb-3">
            #{project.categoryLabel.replace(/\s+/g, "")}
          </p>
          <h2
            className="text-2xl md:text-3xl text-white leading-snug"
            style={{ fontFamily: "var(--font-poiret)" }}
          >
            {project.title}
          </h2>
        </div>

        {/* ── Middle: project image ── */}
        {project.src && (
          <div className="relative w-full h-56 md:h-64 bg-[#1a1a1a]">
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 672px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2E2E2E]/60" />
          </div>
        )}

        {/* ── Bottom: dark section — long description ── */}
        <div className="px-8 py-8" style={{ backgroundColor: "#2E2E2E" }}>
          <div className="flex flex-col gap-4">
            {project.longDesc.map((para, i) => (
              <p key={i} className="text-sm text-white/65 leading-[1.85]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section title ─────────────────────────────────────────────────
function SectionTitle() {
  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <h2
        className="text-3xl md:text-4xl tracking-[0.08em] text-[#0B0B0B] uppercase"
        style={{ fontFamily: "var(--font-poiret)" }}
      >
        Awesome Works
      </h2>
      <div className="flex flex-col items-center gap-1">
        <div className="w-24 h-[2px] bg-[#0B0B0B]" />
        <div className="w-16 h-[2px] bg-[#0B0B0B]" />
      </div>
    </div>
  );
}

// ── Filter bar ────────────────────────────────────────────────────
function FilterBar({ active, onChange }: { active: Filter; onChange: (f: Filter) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {FILTERS.map((f) => {
        const isActive = f === active;
        return (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase border transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2 ${
              isActive
                ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                : "bg-white text-[#0B0B0B] border-[#0B0B0B]/20 hover:border-[#0B0B0B] hover:bg-[#0B0B0B] hover:text-white"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

// ── Image card ────────────────────────────────────────────────────
function ImageCard({
  project,
  dimmed,
  onOpen,
}: {
  project: Project;
  dimmed: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      className="group relative w-full h-full overflow-hidden bg-[#e8e8e8] cursor-pointer"
      style={{ transition: "opacity 0.3s ease", opacity: dimmed ? 0.25 : 1 }}
      onClick={() => !dimmed && onOpen(project)}
    >
      <Image
        src={project.src}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 25vw"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#0B0B0B]/0 group-hover:bg-[#0B0B0B]/70 transition-[background-color] duration-300 flex flex-col justify-end p-5">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 ease-out">
          <p className="text-[10px] font-bold tracking-[0.16em] text-[#EF2B24] uppercase mb-1">
            {project.categoryLabel}
          </p>
          <h3
            className="text-base text-white uppercase tracking-wide mb-3"
            style={{ fontFamily: "var(--font-poiret)" }}
          >
            {project.title}
          </h3>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-white border border-white/60 px-4 py-2 hover:bg-white hover:text-[#0B0B0B] active:scale-[0.97] transition-[background-color,color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View Project
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Category chip */}
      {project.chip && (
        <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity duration-200">
          <span className="px-3 py-1.5 bg-white text-[10px] font-bold tracking-[0.14em] uppercase text-[#0B0B0B]">
            {project.chip}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Featured card ─────────────────────────────────────────────────
function FeaturedCard({
  project,
  dimmed,
  onOpen,
}: {
  project: Project;
  dimmed: boolean;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-center p-7 cursor-pointer"
      style={{
        backgroundColor: "#0B0B0B",
        backgroundImage: "radial-gradient(ellipse at 80% 80%, rgba(239,43,36,0.12) 0%, transparent 60%)",
        opacity: dimmed ? 0.25 : 1,
        transition: "opacity 0.3s ease",
      }}
      onClick={() => !dimmed && onOpen(project)}
    >
      <MoveRight size={80} strokeWidth={0.6} className="absolute bottom-4 right-4 text-white/10" />
      <p className="text-[10px] font-bold tracking-[0.2em] text-[#EF2B24] uppercase mb-3">
        {project.categoryLabel}
      </p>
      <h3
        className="text-xl text-white uppercase tracking-wide mb-3 leading-snug"
        style={{ fontFamily: "var(--font-poiret)" }}
      >
        {project.title}
      </h3>
      <p className="text-sm text-white/55 leading-[1.75] mb-5 max-w-[220px]">{project.desc}</p>
      <button
        onClick={(e) => { e.stopPropagation(); onOpen(project); }}
        className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-white border border-white/30 px-5 py-2.5 w-fit hover:bg-white hover:text-[#0B0B0B] transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24]"
      >
        View Project
      </button>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────
export default function Works() {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL PROJECTS");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="works" className="section-padding bg-white" aria-label="Works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Staggered header + filter reveal */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}>
            <SectionTitle />
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </motion.div>
        </motion.div>

        {/* Desktop masonry */}
        <div
          className="hidden lg:grid gap-3"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "230px" }}
        >
          {PROJECTS.map((p) => {
            const dimmed = activeFilter !== "ALL PROJECTS" && p.category !== activeFilter;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ gridColumn: p.col, gridRow: p.row }}
              >
                {p.featured ? (
                  <FeaturedCard project={p} dimmed={dimmed} onOpen={setSelectedProject} />
                ) : (
                  <ImageCard project={p} dimmed={dimmed} onOpen={setSelectedProject} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {PROJECTS.filter(
              (p) => activeFilter === "ALL PROJECTS" || p.category === activeFilter
            ).map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-[260px]"
              >
                {p.featured ? (
                  <FeaturedCard project={p} dimmed={false} onOpen={setSelectedProject} />
                ) : (
                  <ImageCard project={p} dimmed={false} onOpen={setSelectedProject} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
