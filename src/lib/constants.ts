// ─── Brand Colors ────────────────────────────────────────────
export const COLORS = {
  red:    "#EF2B24",
  yellow: "#F5B21B",
  green:  "#3BB44A",
  blue:   "#2F56A6",
  teal:   "#76B7BB",
  black:  "#0B0B0B",
  white:  "#FFFFFF",
  grey:   "#F5F5F5",
} as const;

// ─── Navigation Links ────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",      href: "#hero" },
  { label: "About",     href: "#about" },
  { label: "Services",  href: "#services" },
  { label: "Works",     href: "#works" },
  { label: "Blog",      href: "#blog" },
  { label: "Contact",   href: "#contact" },
] as const;

// ─── Personal Info ───────────────────────────────────────────
export const PERSONAL = {
  name:       "Badai Samoedra",
  role:       "Architect | Software Engineer | Aesthete",
  tagline:    "I build products that matter.",
  subTagline: "I build scalable systems that are not only reliable — but thoughtfully designed.",
  email:      "badaipunyasolusi@gmail.com",
  location:   "Jakarta, Indonesia",
  available:  true,
} as const;
