// Design system — Manrope, minimal neutral base with a hot-pink accent
// (the design language of ruocanpeng.com, applied to Audrey's own content).

export const BG = '#fafafa'            // page background
export const FG = '#2b2b2b'            // primary text
export const CARD = '#ffffff'          // card surfaces
export const MIST = '#f0f0f0'          // secondary fills
export const HAIRLINE = 'hsl(0 0% 88%)'// borders / dividers
export const MUTED = 'hsl(0 0% 45%)'   // secondary text
export const MUTED_LIGHT = 'hsl(0 0% 62%)' // tertiary / labels

// Accent — hot pink is the single functional accent.
export const ACCENT = '#FF0050'
export const ACCENT_SOFT = '#ffe3ee'

// Legacy token aliases (kept so components that imported these still cascade
// to the current palette without per-file edits).
export const GREEN = ACCENT            // status dots → accent
export const HIGHLIGHT = ACCENT_SOFT   // marker highlight → soft pink
export const FOREST = ACCENT
export const EMBER = ACCENT

// Fonts — everything is Manrope (display, body, and tracked labels).
export const FONT_DISPLAY = 'var(--font-manrope), Manrope, system-ui, sans-serif'
export const FONT_BODY = 'var(--font-manrope), Manrope, system-ui, sans-serif'
export const FONT_MONO = 'var(--font-manrope), Manrope, system-ui, sans-serif'

// Radii
export const R_BUTTON = 8
export const R_CARD = 14
export const R_PILL = 999
