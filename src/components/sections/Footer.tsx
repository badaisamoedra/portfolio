"use client";

import Image from "next/image";
import { NAV_LINKS, PERSONAL } from "@/lib/constants";

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-[#0B0B0B] text-white" aria-label="Footer">
      {/* ── Top bar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-b border-white/08">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/brand_assets/logo_white_clean_space.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
              {/* <span className="font-black text-sm tracking-[0.12em] uppercase text-white">
                {PERSONAL.name}
              </span> */}
            </div>
            <p className="text-xs text-white/45 leading-[1.85] max-w-[240px]">
              Architect, engineer, and system thinker based in Jakarta.
I build scalable systems, clear APIs, and products that actually make sense in production.
            </p>
            <p className="flex items-center gap-1.5 text-xs text-white/45">
              <span className="text-[#EF2B24]">●</span>
              {PERSONAL.email}
            </p>
          </div>

          {/* Nav col */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className="text-xs text-white/55 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-[#EF2B24] tracking-wide"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability col */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
              Let&apos;s Work Together
            </h3>
            <p className="text-xs text-white/45 leading-[1.85]">
              Open to freelance projects, full-time roles, and technical consulting.
              Reach out — I respond within 24 hours.
            </p>
            <a
              href="mailto:badaipunyasolusi@gmail.com"
              className="inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-[#EF2B24] text-white text-xs font-bold tracking-[0.14em] uppercase transition-[transform,opacity] duration-200 hover:opacity-90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0B]"
            >
              Talk to Me
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar — copyright ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30 tracking-wide">
            © 2026 <span className="text-white/50 font-semibold">{PERSONAL.name}</span>. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20 tracking-wide">
            Built with <span className="text-white/35">Next.js</span> · <span className="text-white/35">Tailwind CSS</span> · <span className="text-white/35">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
