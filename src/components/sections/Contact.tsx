"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone, GitFork, AtSign, Link, Globe, Send, CheckCircle2 } from "lucide-react";

// ── Data ────────────────────────────────────────────────────────
const INFO_ITEMS = [
  { icon: MapPin,  label: "Jakarta, Indonesia" },
  { icon: Mail,    label: "badaipunyasolusi@gmail.com" },
  // { icon: Phone,   label: "+62 812 3456 7890" },
  // { icon: GitFork, label: "github.com/badai" },
] as const;

const SOCIAL_LINKS = [
  { icon: GitFork, href: "#", label: "GitHub" },
  // { icon: AtSign,  href: "#", label: "Twitter / X" },
  { icon: Link,    href: "#", label: "LinkedIn" },
  // { icon: Globe,   href: "#", label: "Website" },
] as const;

// ── Left panel ───────────────────────────────────────────────────
function ContactInfo() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="bg-white px-8 md:px-12 py-10 md:py-14 flex flex-col justify-center"
      style={{ boxShadow: "0 4px 24px rgba(11,11,11,0.06), 0 1px 4px rgba(239,43,36,0.04)" }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          className="text-2xl md:text-3xl font-black tracking-[0.06em] text-[#0B0B0B] uppercase mb-3"
          style={{ fontFamily: "var(--font-poiret)" }}
        >
          Contact Address
        </h2>
        <div className="flex flex-col gap-1 mb-10">
          <div className="w-20 h-[2px] bg-[#0B0B0B]" />
          <div className="w-14 h-[2px] bg-[#0B0B0B]" />
        </div>
      </motion.div>

      {/* Info items */}
      <div className="flex flex-col gap-5 mb-10">
        {INFO_ITEMS.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -16 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 flex-shrink-0 border border-[#0B0B0B]/20 flex items-center justify-center group transition-[background-color,border-color] duration-200 hover:border-[#EF2B24] hover:bg-[#EF2B24]/5">
              <Icon size={16} strokeWidth={1.6} className="text-[#0B0B0B] group-hover:text-[#EF2B24] transition-colors duration-200" />
            </div>
            <span className="text-sm text-[#0B0B0B]/70 leading-snug">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Social icons row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 12 }}
        transition={{ duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2"
      >
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-9 h-9 border border-[#0B0B0B]/20 flex items-center justify-center text-[#0B0B0B]/60 hover:bg-[#0B0B0B] hover:text-white hover:border-[#0B0B0B] active:scale-[0.94] transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2"
          >
            <Icon size={14} strokeWidth={1.7} />
          </a>
        ))}
      </motion.div>
    </div>
  );
}

// ── Right panel — form ───────────────────────────────────────────
function ContactForm() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [fields, setFields]   = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div
      ref={ref}
      className="px-8 md:px-12 py-10 md:py-14 flex flex-col justify-center"
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full"
      >
        {sent ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <CheckCircle2 size={48} strokeWidth={1.3} className="text-[#3BB44A]" />
            <h3 className="text-xl font-black text-[#0B0B0B] uppercase tracking-wide"
              style={{ fontFamily: "var(--font-poiret)" }}>
              Message Sent!
            </h3>
            <p className="text-sm text-[#0B0B0B]/60">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
            <button type="button"
              onClick={() => { setSent(false); setFields({ name: "", email: "", subject: "", message: "" }); }}
              className="text-xs font-bold tracking-[0.14em] uppercase text-[#EF2B24] underline underline-offset-4 mt-2">
              Send another
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="name" value={fields.name} onChange={handleChange} required placeholder="Name"
                className="w-full bg-white border border-[#0B0B0B]/12 px-4 py-3 text-sm text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 outline-none focus:border-[#EF2B24] transition-[border-color] duration-200" />
              <input type="email" name="email" value={fields.email} onChange={handleChange} required placeholder="Email"
                className="w-full bg-white border border-[#0B0B0B]/12 px-4 py-3 text-sm text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 outline-none focus:border-[#EF2B24] transition-[border-color] duration-200" />
            </div>
            <input type="text" name="subject" value={fields.subject} onChange={handleChange} required placeholder="Subject"
              className="w-full bg-white border border-[#0B0B0B]/12 px-4 py-3 text-sm text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 outline-none focus:border-[#EF2B24] transition-[border-color] duration-200" />
            <textarea name="message" value={fields.message} onChange={handleChange} required placeholder="Message" rows={8}
              className="w-full bg-white border border-[#0B0B0B]/12 px-4 py-3 text-sm text-[#0B0B0B] placeholder:text-[#0B0B0B]/35 outline-none focus:border-[#EF2B24] transition-[border-color] duration-200 resize-none" />
            <div>
              <button type="submit" disabled={loading}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0B0B0B] text-white text-xs font-bold tracking-[0.2em] uppercase transition-[background-color,transform] duration-200 hover:bg-[#EF2B24] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF2B24] focus-visible:ring-offset-2 disabled:opacity-60">
                {loading
                  ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Send size={13} strokeWidth={2.2} />}
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </>
        )}
      </motion.form>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-[#F5F5F5]" aria-label="Contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 2-column grid — constrained to max-w-6xl like all other sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
