'use client'
import CustomCursor from './CustomCursor'
import IntroVideo from './IntroVideo'
import SmoothScroll from './SmoothScroll'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <IntroVideo />
      <CustomCursor />
      {children}
    </>
  )
}
