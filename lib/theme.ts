// Design system — Flim style reference (DESIGN.md).
// Monochrome near-black ink on warm light-gray canvas, sketchpad grid,
// tiny functional accents. No pure black, no drop shadows.

export const BG = '#f5f5f5'          // Canvas — page background
export const FG = '#141414'          // Ink — primary text (never #000)
export const CARD = '#ffffff'        // Paper — card surfaces
export const MIST = '#e9e9e9'        // Raised — secondary fills
export const HAIRLINE = '#d9d9d9'    // Hairline — grid lines, borders
export const MUTED = '#6f6f6f'       // secondary text
export const MUTED_LIGHT = '#9a9a9a' // tertiary / labels

// Functional accents (punctuation, not decoration)
export const HIGHLIGHT = '#fecc33'   // yellow marker-pen wash behind words
export const GREEN = '#30a81d'       // Signal green — status dot / small edges only
export const FOREST = '#21935b'      // deeper green
export const EMBER = '#ff8400'       // rare warm accent

// ACCENT stays ink so the system reads monochrome; accent "moments" use HIGHLIGHT/GREEN.
export const ACCENT = FG
export const ACCENT_SOFT = MIST

// Fonts (wired via CSS variables in app/layout.tsx)
// Swizzy → Schibsted Grotesk (500) · PP Neue Montreal Mono → JetBrains Mono · Arial body
export const FONT_DISPLAY = 'var(--font-display), "Schibsted Grotesk", system-ui, sans-serif'
export const FONT_BODY = 'Arial, system-ui, sans-serif'
export const FONT_MONO = 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace'

// Radii — three-tier Flim system
export const R_BUTTON = 8
export const R_CARD = 16
export const R_PILL = 160

// Sketchpad grid background (1px hairlines on canvas, ~40px cells)
export const GRID_BG =
  `linear-gradient(${HAIRLINE} 1px, transparent 1px), linear-gradient(90deg, ${HAIRLINE} 1px, transparent 1px)`
export const GRID_SIZE = '40px 40px'
