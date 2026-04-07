"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeSection, setActive] = useState("hero");

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-[0_2px_20px_rgba(11,11,11,0.08)]"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2 rounded"
          aria-label="Go to top"
        >
          <Image
            src="/brand_assets/logo_color.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id      = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2 ${
                    isActive
                      ? "text-[#EF2B24]"
                      : "text-[#0B0B0B] hover:text-[#EF2B24]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EF2B24]"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="mailto:badaipunyasolusi@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#EF2B24] text-white text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2"
          style={{ boxShadow: "0 4px 16px rgba(239,43,36,0.25)" }}
        >
          {/* <span className="text-[#F5B21B]">●</span> */}
          Talk to Me
        </a>
        

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden p-2 rounded text-[#0B0B0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#F5F5F5]"
            style={{ boxShadow: "0 16px 48px rgba(11,11,11,0.1)" }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(({ label, href }, i) => {
                const id      = href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <button
                      onClick={() => handleNavClick(href)}
                      className={`w-full text-left px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        isActive
                          ? "text-[#EF2B24] bg-[#EF2B24]/5"
                          : "text-[#0B0B0B] hover:text-[#EF2B24] hover:bg-[#F5F5F5]"
                      }`}
                    >
                      {isActive && <span className="text-[#EF2B24] mr-2">●</span>}
                      {label}
                    </button>
                  </motion.li>
                );
              })}

              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.04 }}
                className="pt-3 border-t border-[#F5F5F5] mt-2"
              >
                <a
                  href="mailto:hello@badai.dev"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-[#EF2B24] text-white text-sm font-semibold rounded-full active:scale-[0.97]"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-[#F5B21B]">●</span>
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
