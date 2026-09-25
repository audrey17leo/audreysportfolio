// Combined motion system:
//  · Stella Peng — composition/reveal cadence (opacity+y, flip-up headlines, stagger)
//  · Aditya Muralidhar — micro-animations (image clip-reveal, magnetic hover, smooth ease)
// See docs/stella-peng-microinteractions.md for the source catalog.
import type { Variants, Transition } from 'framer-motion'

// Aditya leans on material easing; Stella on a soft expo. We blend to a smooth expo-out.
export const stellaEase = [0.22, 1, 0.36, 1] as const
export const materialEase = [0.4, 0, 0.2, 1] as const

// #1 Scroll reveal — the workhorse: opacity 0 + y:24 → in view.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: stellaEase } },
}

// Smaller/subtler reveal for meta bits.
export const revealSm: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: stellaEase } },
}

// #2 Stagger container — children cascade.
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

// #3 Signature headline flip-up — lines rotate up from below.
export const flipUp: Variants = {
  hidden: { y: '100%', rotateX: 40, opacity: 0 },
  show: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 0.75, ease: stellaEase } },
}

// #4 Aditya image reveal — wipe up from bottom with a subtle settle.
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    transition: { duration: 1, ease: stellaEase },
  },
}

// #5 Card hover — subtle lift + tilt (Stella) tuned to Aditya's snap.
export const cardHover = { y: -6, scale: 1.02 }
export const cardHoverTransition: Transition = { duration: 0.4, ease: materialEase }

// Shared viewport config for whileInView reveals.
export const once = { once: true, margin: '-12% 0px' as const }
