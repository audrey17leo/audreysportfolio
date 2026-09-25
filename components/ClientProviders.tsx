'use client'
import CustomCursor from './CustomCursor'
import Loader from './Loader'
import SmoothScroll from './SmoothScroll'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <CustomCursor />
      {children}
    </>
  )
}
