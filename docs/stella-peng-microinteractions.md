# Stella Peng (ruocanpeng.com) — Style & Microinteraction Catalog

Reference: https://ruocanpeng.com/ (embedded on wallofportfolios.in)
Stack observed: **React + Vite + Tailwind + Framer Motion**, custom cursor, IntersectionObserver.

## Design tokens

| Token | Value | Use |
|---|---|---|
| Background | `#fafafa` (off-white) | page base |
| Foreground | `#2b2b2b` (near-black) | primary text |
| Muted text | `hsl(0 0% 60%)` | secondary/nav-inactive |
| Border | `hsl(0 0% ~90%)` at ~40% opacity (`border/40`) | hairline dividers |
| Accent — pink | `#FF0050` | highlights, active, hovers |
| Accent — purple | `#4B2E83` | secondary accent |
| Font | **Manrope** (300–700) | everything |
| Display weight | ~650, `letter-spacing: -0.07em` | big headlines (very tight) |

Aesthetic: extreme minimalism, huge whitespace, typography-forward, hairline borders, almost no imagery chrome. Content is gated behind scroll reveals.

## Microinteractions (from her framer-motion configs)

1. **Scroll reveal (the workhorse).** Elements start `{opacity:0, y:20}` → animate to `{opacity:1, y:0}` when scrolled into view (`whileInView`, `viewport once`). `transition: { duration: 0.5, ease: "easeOut" }`. Variants of ease used: `[.25,.1,.25,1]`, `[0,0,.2,1]`.

2. **Staggered children.** Containers use `staggerChildren: 0.04`, `delayChildren: 0.3` — list/grid items cascade in ~40ms apart. Manual per-item delays also seen: `0.1 / 0.15 / 0.2 / 0.25`.

3. **Headline flip-up reveal (signature).** Big headings animate `initial:{ y:"100%", rotateX:40 }` → `{ y:0, rotateX:0 }` — text rotates up into place from below with a 3D tilt. Paired with the ~650 weight, -0.07em tracking.

4. **Card hover — lift + tilt.** `whileHover:{ scale:1.03, rotate:0.8 }` — cards grow slightly and tip ~0.8° on hover. Snappy `duration ~0.25–0.3`.

5. **Small entrances.** Pop-in `{opacity:0, scale:0.92}`→`{...scale:1}`; sidewise `{opacity:0, x:-10}`; subtle `{opacity:0, y:4 or -8}` for nav/meta bits.

6. **Custom cursor.** Global `cursor:none`; a JS-tracked custom cursor follows the mouse (dot/ring), likely enlarging over interactive elements.

7. **Nav fade-in.** Nav items fade `{opacity:0}`→`{opacity:1}` on load, links go muted→foreground on hover.

## Durations & easing summary
- Default reveal: **0.5s easeOut**
- Quick UI (hover/tap): **0.25–0.3s**
- Signature ease curves: `easeOut`, `[.25,.1,.25,1]`, `[0,0,.2,1]`
- Stagger step: **0.04s**, group delay **0.3s**

## Mapping to Audrey's site (this branch)
Her stack already has framer-motion, Tailwind, and a CustomCursor — so this is a restyle, not a rebuild:
- Add **Manrope** as the primary font (next/font).
- Apply the token palette above (swap purple-tint base for `#fafafa`/`#2b2b2b`, add `#FF0050` accent).
- Rebuild section motion around reveals #1–#3, card hover #4, stagger #2.
- Keep her content; reword to fit the tighter, minimal layout.
