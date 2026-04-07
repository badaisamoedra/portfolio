"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Calendar, AlignJustify } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────
type BlogFilter =
  | "All"
  | "Web Dev"
  | "Architecture"
  | "DevOps"
  | "Career"
  | "Open Source"
  | "Tools";

interface Post {
  id: number;
  /** null → text-only card */
  image: string | null;
  /** true → show ONLY the image, no text block */
  imageOnly: boolean;
  titleParts: { text: string; bold: boolean }[];
  date: string;
  category: BlogFilter;
  excerpt: string;
}

// ── Data ────────────────────────────────────────────────────────
const FILTERS: BlogFilter[] = [
  "All",
  "Web Dev",
  "Architecture",
  "DevOps",
  "Career",
  "Open Source",
  "Tools",
];

const POSTS: Post[] = [
  {
    id: 1,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "BUILDING ", bold: false },
      { text: "SCALABLE", bold: true },
      { text: " APIS", bold: false },
      { text: " WITH GO", bold: true },
    ],
    date: "12 JAN 2024",
    category: "Architecture",
    excerpt:
      "Go's concurrency model and minimal footprint make it a natural fit for high-throughput API services. Here's what I learned after rewriting a Node.js monolith.",
  },
  {
    id: 2,
    image: "/brand_assets/post-01@2x.jpg",
    imageOnly: false,
    titleParts: [
      { text: "NEXT.JS ", bold: false },
      { text: "APP ROUTER", bold: true },
      { text: " IN", bold: false },
      { text: " DEPTH", bold: true },
    ],
    date: "05 MAR 2024",
    category: "Web Dev",
    excerpt:
      "Layouts, Server Components, streaming — the App Router changes how you think about React. A practical guide from real project experience.",
  },
  {
    id: 3,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "TYPESCRIPT", bold: true },
      { text: " TIPS FOR", bold: false },
      { text: " BETTER", bold: true },
      { text: " DX", bold: false },
    ],
    date: "20 FEB 2024",
    category: "Tools",
    excerpt:
      "Utility types, discriminated unions, and conditional types that will save you hours. Patterns I reach for on every project.",
  },
  {
    id: 4,
    image: "/brand_assets/post-02@2x.jpg",
    imageOnly: true,
    titleParts: [],
    date: "",
    category: "Web Dev",
    excerpt: "",
  },
  {
    id: 5,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "CI/CD", bold: true },
      { text: " PIPELINES", bold: false },
      { text: " THAT", bold: false },
      { text: " ACTUALLY", bold: true },
      { text: " WORK", bold: false },
    ],
    date: "18 APR 2024",
    category: "DevOps",
    excerpt:
      "Most CI pipelines are slow and fragile. Here's the setup I use to get sub-5-minute builds with caching, parallel jobs, and zero flakiness.",
  },
  {
    id: 6,
    image: "/brand_assets/post-03@2x.jpg",
    imageOnly: false,
    titleParts: [
      { text: "OPEN SOURCE", bold: true },
      { text: ":", bold: false },
      { text: " HOW TO", bold: false },
      { text: " START", bold: true },
    ],
    date: "02 MAY 2024",
    category: "Open Source",
    excerpt:
      "Contributing to open source is one of the best career moves you can make. Here's a beginner-friendly path that worked for me.",
  },
  {
    id: 7,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "MICRO-", bold: false },
      { text: "FRONTENDS", bold: true },
      { text: ": WHEN", bold: false },
      { text: " & WHY", bold: true },
    ],
    date: "14 JUN 2024",
    category: "Architecture",
    excerpt:
      "Micro-frontends solve real problems at scale, but they introduce just as many. A pragmatic breakdown of when the tradeoff is worth it.",
  },
  {
    id: 8,
    image: "/brand_assets/post-04@2x.jpg",
    imageOnly: true,
    titleParts: [],
    date: "",
    category: "Career",
    excerpt: "",
  },
  {
    id: 9,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "FROM", bold: false },
      { text: " ENGINEER", bold: true },
      { text: " TO", bold: false },
      { text: " TECH LEAD", bold: true },
    ],
    date: "30 JUL 2024",
    category: "Career",
    excerpt:
      "The skills that got you to senior won't get you to tech lead. Here are the mindset shifts that actually made a difference in my transition.",
  },
  {
    id: 10,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "MY", bold: false },
      { text: " DEV SETUP", bold: true },
      { text: " IN", bold: false },
      { text: " 2024", bold: true },
    ],
    date: "08 AUG 2024",
    category: "Tools",
    excerpt:
      "Terminal, editor, dotfiles, and the tools I actually use every day. No bloat, just the essentials that make me move faster.",
  },
  {
    id: 11,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "AWS FOR", bold: false },
      { text: " FRONTEND", bold: true },
      { text: " DEVS", bold: true },
    ],
    date: "22 SEP 2024",
    category: "DevOps",
    excerpt:
      "You don't need to become a DevOps engineer to deploy your app well. These five AWS services cover 90% of what you actually need.",
  },
  {
    id: 12,
    image: null,
    imageOnly: false,
    titleParts: [
      { text: "WRITING", bold: false },
      { text: " CLEAN", bold: true },
      { text: " CODE", bold: false },
      { text: " DAILY", bold: true },
    ],
    date: "10 OCT 2024",
    category: "Web Dev",
    excerpt:
      "Clean code isn't about perfection — it's about communication. The small habits I practice every day to keep codebases readable.",
  },
];

// ── Sub-components ───────────────────────────────────────────────

function SectionTitle() {
  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <h2
        className="text-3xl md:text-4xl font-black tracking-[0.08em] text-[#0B0B0B] uppercase"
        style={{ fontFamily: "var(--font-poiret)" }}
      >
        Helpful Writing
      </h2>
      <div className="flex flex-col items-center gap-1">
        <div className="w-24 h-[2px] bg-[#0B0B0B]" />
        <div className="w-16 h-[2px] bg-[#0B0B0B]" />
      </div>
    </div>
  );
}

// Filter bar — bordered container matching reference exactly
function FilterBar({
  active,
  onChange,
}: {
  active: BlogFilter;
  onChange: (f: BlogFilter) => void;
}) {
  return (
    <div className="border border-[#0B0B0B]/18 flex items-center mb-10 overflow-hidden">
      {/* Scrollable tab list */}
      <div className="flex-1 overflow-x-auto scrollbar-none">
        <ul className="flex items-center min-w-max">
          {FILTERS.map((f, i) => {
            const isActive = f === active;
            return (
              <li key={f}>
                <button
                  onClick={() => onChange(f)}
                  className={`px-5 py-3.5 text-xs font-medium tracking-[0.06em] whitespace-nowrap transition-[color,font-weight] duration-150 border-r border-[#0B0B0B]/10 active:opacity-70 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-[#EF2B24] ${
                    isActive
                      ? "text-[#EF2B24] font-bold"
                      : "text-[#0B0B0B]/60 hover:text-[#0B0B0B]"
                  } ${i === 0 ? "" : ""}`}
                >
                  {isActive && <span className="mr-1 text-[#EF2B24]">●</span>}
                  {f}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Hamburger icon — right end, bordered left */}
      <div className="border-l border-[#0B0B0B]/18 p-3.5 flex-shrink-0">
        <AlignJustify size={18} strokeWidth={1.5} className="text-[#0B0B0B]/60" />
      </div>
    </div>
  );
}

// Blog card — text-only variant
function TextCard({ post, delay }: { post: Post; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-4 border border-[#0B0B0B]/10 bg-white p-5 cursor-pointer group"
      style={{ boxShadow: "0 2px 8px rgba(11,11,11,0.04)" }}
    >
      {/* Title — mixed weight, uppercase */}
      <h3 className="text-sm leading-snug mb-3 tracking-wide group-hover:text-[#EF2B24] transition-colors duration-200">
        {post.titleParts.map((part, i) =>
          part.bold ? (
            <strong key={i} className="font-black">
              {part.text}
            </strong>
          ) : (
            <span key={i} className="font-light">
              {part.text}
            </span>
          )
        )}
      </h3>

      {/* Date */}
      <p className="flex items-center gap-1.5 text-[11px] text-[#0B0B0B]/50 mb-3 tracking-wide">
        <Calendar size={11} strokeWidth={1.8} />
        {post.date}
      </p>

      {/* Excerpt */}
      <p className="text-xs text-[#0B0B0B]/60 leading-[1.85] mb-4">{post.excerpt}</p>

      {/* Divider */}
      <div className="border-t border-[#0B0B0B]/08 pt-3">
        {/* Author row */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
            <Image
              src="/brand_assets/pp_me.jpeg"
              alt="Author"
              width={28}
              height={28}
              className="object-cover object-top w-full h-full"
            />
          </div>
          <div>
            <p className="text-[11px] text-[#0B0B0B] leading-tight">
              <span className="font-light">Badai </span>
              <strong className="font-black">Samoedra</strong>
            </p>
            <p className="text-[10px] text-[#0B0B0B]/50">
              On{" "}
              <strong className="font-bold text-[#0B0B0B]/70">{post.category}</strong>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Blog card — image at top + text below
function ImageTextCard({ post, delay }: { post: Post; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-4 border border-[#0B0B0B]/10 bg-white cursor-pointer group"
      style={{ boxShadow: "0 2px 8px rgba(11,11,11,0.04)" }}
    >
      {/* Cover image */}
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={post.image!}
          alt={post.titleParts.map((p) => p.text).join("")}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Text block */}
      <div className="p-5">
        <h3 className="text-sm leading-snug mb-3 tracking-wide group-hover:text-[#EF2B24] transition-colors duration-200">
          {post.titleParts.map((part, i) =>
            part.bold ? (
              <strong key={i} className="font-black">
                {part.text}
              </strong>
            ) : (
              <span key={i} className="font-light">
                {part.text}
              </span>
            )
          )}
        </h3>
        <p className="flex items-center gap-1.5 text-[11px] text-[#0B0B0B]/50 mb-3 tracking-wide">
          <Calendar size={11} strokeWidth={1.8} />
          {post.date}
        </p>
        <p className="text-xs text-[#0B0B0B]/60 leading-[1.85] mb-4">{post.excerpt}</p>
        <div className="border-t border-[#0B0B0B]/08 pt-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
              <Image
                src="/brand_assets/pp_me.jpeg"
                alt="Author"
                width={28}
                height={28}
                className="object-cover object-top w-full h-full"
              />
            </div>
            <div>
              <p className="text-[11px] text-[#0B0B0B] leading-tight">
                <span className="font-light">Badai </span>
                <strong className="font-black">Samoedra</strong>
              </p>
              <p className="text-[10px] text-[#0B0B0B]/50">
                On <strong className="font-bold text-[#0B0B0B]/70">{post.category}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Blog card — image only (visual break)
function ImageOnlyCard({ post, delay }: { post: Post; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-4 border border-[#0B0B0B]/10 overflow-hidden"
      style={{ boxShadow: "0 2px 8px rgba(11,11,11,0.04)" }}
    >
      <div className="relative w-full h-52">
        <Image
          src={post.image!}
          alt="Blog visual"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────
export default function Blog() {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("All");
  const headerRef    = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const filtered =
    activeFilter === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeFilter);

  return (
    <section id="blog" className="section-padding bg-[#F5F5F5]" aria-label="Blog">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Staggered header reveal */}
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

        {/* ── Masonry columns grid ── */}
        <div
          className="columns-1 sm:columns-2 lg:columns-4 gap-4"
        >
          {filtered.map((post, i) => {
            const delay = (i % 4) * 0.07;
            if (post.imageOnly) {
              return <ImageOnlyCard key={post.id} post={post} delay={delay} />;
            }
            if (post.image) {
              return <ImageTextCard key={post.id} post={post} delay={delay} />;
            }
            return <TextCard key={post.id} post={post} delay={delay} />;
          })}
        </div>
      </div>
    </section>
  );
}
