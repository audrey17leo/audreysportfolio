'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'

// Reusable scroll reveal usable inside server components.
// Respects prefers-reduced-motion (renders visible, no animation).
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  style,
  id,
  className,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'figure' | 'li'
  style?: React.CSSProperties
  id?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    return <MotionTag id={id} className={className} style={style}>{children}</MotionTag>
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.7, ease: stellaEase, delay }}
      style={style}
    >
      {children}
    </MotionTag>
  )
}
