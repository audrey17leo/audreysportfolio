// Style: ElevenLabs design language (DESIGN.md) — warm eggshell, whisper-weight
// Inter-300 headlines, 97% achromatic, violet/orange only inside product visuals.
// Layout & sizing: ruocanpeng (compact hero, 2-col cards, hover reveal).

export const BG = '#fdfcfc'            // eggshell canvas (never pure white)
export const FG = '#000000'            // ink — primary text
export const GRAPHITE = '#44403b'      // strong secondary text / labels
export const MUTED = '#777169'         // smoke — body / muted descriptions
export const MUTED_LIGHT = '#a59f97'   // ash — faint helper / caption
export const CARD = '#f5f3f1'          // warm taupe — card/section surface
export const MIST = '#f5f3f1'          // taupe alias
export const STONE = '#ebe8e4'         // stone — hairline / icon plate
export const HAIRLINE = '#ebe8e4'      // hairline border
export const BTN_BORDER = '#e5e5e5'    // button border (legacy support)

// UI accent is monochrome ink. Colour is decoration-only (product visuals).
export const ACCENT = '#000000'
export const ACCENT_SOFT = '#f5f3f1'
export const VIOLET = '#0447ff'        // product-visual spark ONLY (not UI)
export const ORANGE = '#ff4704'        // product-visual spark ONLY (not UI)

// Legacy aliases so existing imports keep resolving to the new palette.
export const GREEN = MUTED
export const HIGHLIGHT = MIST
export const FOREST = VIOLET
export const EMBER = ORANGE
export const TAG_GOLD = GRAPHITE

// Fonts — Inter everywhere (Waldenburg → Inter 300 for display), Geist Mono for micro-labels.
export const FONT_DISPLAY = 'var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif'
export const FONT_BODY = 'var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif'
export const FONT_MONO = 'var(--font-geist-mono), "Geist Mono", ui-monospace, monospace'
// Editorial serif (Newsreader) for case-study body — Anthropic-like literary serif.
export const FONT_SERIF = 'var(--font-serif), Newsreader, Georgia, "Times New Roman", serif'

// Radii — pills + generous card radii
export const R_BUTTON = 9999
export const R_CARD = 20
export const R_PILL = 9999
