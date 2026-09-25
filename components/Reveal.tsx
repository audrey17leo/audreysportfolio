'use client'
import { motion } from 'framer-motion'
import { stellaEase } from '@/lib/stellaMotion'

// Reusable scroll reveal (Aditya micro-animation) usable inside server components.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  style,
  id,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  as?: 'div' | 'section' | 'figure' | 'li'
  style?: React.CSSProperties
  id?: string
}) {
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      id={id}
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
