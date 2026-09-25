# Redesign — Aditya × Ruocan (Stella Peng) combined

Branch: `redesign/stella-peng-style`

## Brief (from you)
> Use adityamuralidhar.in's design language, but Stella Peng's (ruocanpeng.com)
> composition/formatting, with Aditya's micro-animations & product presentation.
> Structure the works exactly like hers so new works are easy to add.

## What each reference contributed
- **Aditya Muralidhar** → design language + micro-animations + product presentation
  - Type: **Figtree** (body), **Space Grotesk** (display — stands in for his licensed
    "Stack Sans Headline", which can't be self-hosted here), **JetBrains Mono** (labels)
  - Palette: `#fafafa` bg · `#262626` text · `#737373` muted · `#d9d9d9` hairlines
  - **Lenis smooth scroll**, magnetic hover on CTAs/email, image clip-reveals, wide
    image-forward case-study presentation
- **Stella Peng (ruocan)** → composition/formatting
  - Minimal, whitespace-heavy layout; scroll-reveal cadence (`opacity + y`), flip-up
    headlines, `staggerChildren`; works list; case-study section flow

## Key decision — accent colour
You earlier chose **your purple `#4B2E83`** as the accent. Aditya's own accent is
raspberry `#dc2c58`. I kept **your purple** and used Aditya's neutral base everywhere
else. It's a single token — flip `ACCENT` in `lib/theme.ts` to `#dc2c58` (exported as
`ADITYA_ACCENT`) if you'd rather match him exactly.

## Where things live
- `lib/theme.ts` — colours + font tokens (single source of truth)
- `lib/stellaMotion.ts` — motion presets (reveal, flipUp, imageReveal, cardHover, stagger)
- `lib/useMagnetic.ts` — magnetic hover hook
- `components/SmoothScroll.tsx` — Lenis provider (in ClientProviders)
- `components/Reveal.tsx` — reusable scroll-reveal wrapper (used in the case-study page)
- Rebuilt: `Hero`, `Works`, `Navbar`, `Contact`, `DesignExperiments`, `app/works/[slug]/page.tsx`

## Adding a new work tomorrow
Add an entry to the `projects` array in `lib/projects.ts`. It automatically:
1. appears in the Works grid on the home page, and
2. generates a full case-study page at `/works/<slug>` (via `generateStaticParams`).
Fields map to the case-study sections: `h1`, `subtitleParagraph`, `year/scope/role`,
`problemSpace*`, `concept*`, `processSections[]`, `finalImages[]`, `reflection[]`,
optional `sourceCode`, and `sectionLabels` to rename any section.

## Notes / follow-ups
- `?nointro` skips the intro splash (added for fast previews).
- **About** and **Garden** got a light consistency pass (fonts inherit the new stack;
  base colour aligned to `#fafafa`; About H1 → Space Grotesk). They can be fully
  rebuilt to the new system if you want them to match the depth of home/works.
- Reduced-motion users get Lenis disabled automatically.
