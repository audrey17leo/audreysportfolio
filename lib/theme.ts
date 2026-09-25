// Design language of ruocanpeng.com, applied to Audrey's own content:
// editorial SERIF headline (Exposure/New Spirit → Fraunces stand-in) + Manrope UI,
// warm neutral palette, restrained accents. Project imagery carries the colour.

export const BG = '#f6f5f2'            // warm off-white page
export const FG = '#1c1c1c'            // near-black text
export const CARD = '#ffffff'          // card surfaces
export const MIST = '#eeece7'          // secondary fills / pills
export const HAIRLINE = '#e6e3dd'      // borders / dividers
export const MUTED = '#8b8b86'         // secondary text (sublines)
export const MUTED_LIGHT = '#b4b2ac'   // tertiary / inactive nav

// Restrained accents — mostly monochrome; one warm tag colour like hers.
export const ACCENT = '#1c1c1c'        // links, active nav (monochrome)
export const TAG_GOLD = '#a9762f'      // occasional warm tag ("Circle Status")

// Legacy aliases so older component imports keep cascading cleanly.
export const GREEN = MUTED
export const HIGHLIGHT = MIST
export const FOREST = MUTED
export const EMBER = TAG_GOLD
export const ACCENT_SOFT = MIST

// Fonts — Fraunces (serif display) + Manrope (UI/body).
export const FONT_DISPLAY = 'var(--font-serif), Fraunces, ui-serif, Georgia, "Times New Roman", serif'
export const FONT_BODY = 'var(--font-manrope), Manrope, ui-sans-serif, system-ui, sans-serif'
export const FONT_MONO = 'var(--font-manrope), Manrope, ui-sans-serif, system-ui, sans-serif'

// Radii — her cards are gently rounded
export const R_BUTTON = 8
export const R_CARD = 10
export const R_PILL = 999
