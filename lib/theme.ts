// Redesign tokens — Aditya Muralidhar's design language (palette + type),
// Stella Peng's composition, Audrey's purple accent.
// Flip ACCENT to '#dc2c58' to use Aditya's exact raspberry instead.

export const BG = '#fafafa'          // --background
export const FG = '#262626'          // --foreground
export const CARD = '#ffffff'        // --card
export const MUTED = '#737373'       // --muted-foreground
export const MUTED_LIGHT = '#a3a3a3' // lighter muted
export const HAIRLINE = '#d9d9d9'    // --border
export const SUBTLE = '#f0f0f0'      // --muted surface

export const ACCENT = '#4B2E83'      // Audrey's purple (primary accent)
export const ACCENT_SOFT = '#D4C5E8' // lavender
export const ADITYA_ACCENT = '#dc2c58' // raspberry (Aditya's own accent, kept for reference)

// Fonts (wired via CSS variables in app/layout.tsx)
export const FONT_DISPLAY = 'var(--font-display), "Space Grotesk", system-ui, sans-serif'
export const FONT_BODY = 'var(--font-body), Figtree, system-ui, sans-serif'
export const FONT_MONO = 'var(--font-mono), "JetBrains Mono", ui-monospace, monospace'
