@AGENTS.md

# CLAUDE.md — Frontend Website Rules

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

---

## Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` or PostCSS — no CDN)
- **Fonts**: Google Fonts via `next/font/google` — NEVER use Inter, Roboto, Arial, or system fonts
- **Images**: `next/image` — NEVER use raw `<img>` tags
- **Icons**: `lucide-react` unless specified otherwise
- **Animation**: Framer Motion for interactions; CSS-only for simple reveals
- **No CDN imports** — everything via npm package

---

## Reference Images

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (`https://placehold.co/WIDTHxHEIGHT`). Do not improve or add to the design.
- If no reference image: design from scratch with high craft using the brand system below.
- Screenshot output, compare against reference, fix mismatches, re-screenshot. Minimum 2 comparison rounds. Stop only when no visible differences remain or user says so.

---

## Brand System

### Color Palette

```ts
// tailwind.config.ts or CSS variables
colors: {
  red:    '#EF2B24', // Primary — CTA, statement, hook
  yellow: '#F5B21B', // Insight, highlight, clarity
  green:  '#3BB44A', // Success, system stability
  blue:   '#2F56A6', // Technical, architecture, depth
  teal:   '#76B7BB', // Background accent, calm, support
  black:  '#0B0B0B', // Base neutral
  white:  '#FFFFFF',
  grey:   '#F5F5F5', // Light background
}
```

**NEVER use default Tailwind blue/indigo/purple as primary.**
Always reference the palette above. Use CSS variables so themes are consistent.

### Color Dominance Rule (70-20-10)

| Share | Role    | Values                          |
| ----- | ------- | ------------------------------- |
| 70%   | Neutral | `#FFFFFF`, `#0B0B0B`, `#F5F5F5` |
| 20%   | Primary | `#EF2B24`                       |
| 10%   | Accent  | Pick ONE per page/section       |

**Never combine all 5 brand colors at once.** One accent per section.

### Context-Based Color Assignment

| Context              | Color               |
| -------------------- | ------------------- |
| Strong opinion / CTA | 🔴 Red `#EF2B24`    |
| Insight / highlight  | 🟡 Yellow `#F5B21B` |
| Technical deep dive  | 🔵 Blue `#2F56A6`   |
| Proven / success     | 🟢 Green `#3BB44A`  |
| Calm explanation     | 🔵 Teal `#76B7BB`   |

### Brand Feel

> "Structured Playfulness" — bukan corporate kaku, bukan startup ramai. Clean, smart, slightly playful via color dots. Tetap engineer vibe.

### Signature Element — Colored Dot System (●)

Gunakan colored dot sebagai elemen khas visual:

- **Bullet point** → `● ` dengan warna sesuai konteks
- **Separator** → `● ● ●`
- **Highlight accent** → dot sebelum kata kunci penting
- **Section marker** → dot besar sebagai visual anchor

---

## Typography Rules

- NEVER pair the same font family for heading and body.
- Heading: Display / Serif yang berkarakter (e.g., Playfair Display, DM Serif Display, Syne, Instrument Serif).
- Body: Clean sans yang readable (e.g., DM Sans, Plus Jakarta Sans, Geist).
- Large headings: `letter-spacing: -0.03em`, `font-weight: 800`.
- Body: `line-height: 1.7`.
- Font loaded via `next/font/google` — no `@import` from CSS.

---

## Visual & Interaction Standards

### Shadows

Never flat `shadow-md`. Use layered, color-tinted shadows:

```css
box-shadow:
  0 4px 16px rgba(239, 43, 36, 0.08),
  0 1px 4px rgba(11, 11, 11, 0.06);
```

### Gradients & Texture

- Layer multiple radial gradients for depth.
- Add subtle SVG noise grain for texture (premium feel).
- Never flat solid backgrounds on hero/feature sections.

### Animations

- Only animate `transform` and `opacity`. **NEVER `transition-all`**.
- Use spring-style easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Staggered reveals on page load for key sections.
- Framer Motion for complex interactions; CSS keyframes for decorative motion.

### Interactive States

Every clickable element **must** have:

- `hover:` — color shift or scale
- `focus-visible:` — visible ring using brand red
- `active:` — subtle press feel (`scale-[0.97]`)

No exceptions.

### Images

- Always wrap in `next/image` with explicit `width` and `height` (or `fill` layout).
- Add gradient overlay: `bg-gradient-to-t from-black/60` on image containers.
- Optional color treatment layer with `mix-blend-multiply` for brand consistency.

### Depth / Layering

Surfaces must use a clear layering system:

- **Base** — background (`#F5F5F5` or `#0B0B0B`)
- **Elevated** — cards, panels (subtle shadow)
- **Floating** — modals, tooltips, dropdowns (stronger shadow + backdrop-blur)

---

## File & Folder Conventions (Next.js App Router)

```
app/
  layout.tsx          ← root layout, font definitions, global providers
  page.tsx            ← homepage
  (sections)/         ← collocated section components if needed
components/
  ui/                 ← reusable primitives (Button, Badge, Dot, etc.)
  sections/           ← Hero, About, Services, CTA, Footer, etc.
lib/
  constants.ts        ← brand colors, config
  utils.ts
public/
  brand_assets/       ← logo, icons, images (check here before designing)
```

---

## Brand Assets

- **Always check `public/brand_assets/`** before designing.
- If a logo is present → use it. Never placeholder a logo.
- If color guide is present → use exact values, do not invent.
- Logo colors: Red `#EF2B24`, Yellow `#F5B21B`, Green `#3BB44A`, Blue `#2F56A6`, Teal `#76B7BB`.

---

## Anti-Generic Guardrails

- ❌ No default Tailwind `indigo-500`, `blue-600`, `purple-*` as primary
- ❌ No flat `shadow-md`
- ❌ No `transition-all`
- ❌ No same font for heading + body
- ❌ No raw `<img>` tag
- ❌ No all 5 brand colors in one section
- ❌ No "corporate kaku" or "startup ramai" feel
- ✅ Custom CSS variables for all brand colors
- ✅ Intentional spacing tokens — not random Tailwind steps
- ✅ Colored dot (●) as signature element where contextually appropriate
- ✅ Mobile-first responsive layout
- ✅ Every interactive element has hover + focus-visible + active state

---

## Hard Rules

- Do not add sections or features not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not import fonts via CSS `@import` — always use `next/font/google`
- Do not use raw `<img>` — always `next/image`
