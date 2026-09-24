'use client'
import { useRef, useState, useEffect } from 'react'

// --- intro speed knobs ---
// Play the early frames fast, then drop back to normal speed so the final
// two frames hold their natural length.
const FAST_RATE = 5      // how much faster the early frames play (1 = normal)
const TAIL_SECONDS = 1.6 // final stretch (≈ last two frames) kept at 1× speed

export default function IntroVideo() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading]   = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.setAttribute('muted', '')
    v.playbackRate = FAST_RATE

    // When we reach the tail, restore normal speed for the final frames.
    const hasRVFC = typeof v.requestVideoFrameCallback === 'function'
    const check = () => {
      if (v.duration && v.currentTime >= v.duration - TAIL_SECONDS) {
        if (v.playbackRate !== 1) v.playbackRate = 1
        return // done — no need to keep polling
      }
      if (hasRVFC) v.requestVideoFrameCallback(check)
    }
    if (hasRVFC) v.requestVideoFrameCallback(check)
    else v.addEventListener('timeupdate', check)

    const play = () => v.play().catch(() => {})
    play()
    v.addEventListener('canplay', play, { once: true })
    return () => {
      v.removeEventListener('canplay', play)
      v.removeEventListener('timeupdate', check)
    }
  }, [])

  const dismiss = () => {
    setFading(true)
    setTimeout(() => setVisible(false), 650)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: '#000',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.65s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <video
        ref={videoRef}
        src="/Intro_Video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        onError={dismiss}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      <button
        onClick={dismiss}
        style={{
          position: 'absolute',
          bottom: 32,
          right: 36,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: 'rgba(255,255,255,0.75)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          padding: '8px 20px',
          borderRadius: 999,
          cursor: 'none',
        }}
      >
        skip →
      </button>
    </div>
  )
}
