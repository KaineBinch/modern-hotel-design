'use client'

import { useEffect, useRef } from 'react'

/** Drifts its content slightly as the page scrolls. Put it inside an overflow-hidden box. */
export default function Parallax({ children, speed = 0.08 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      el.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * speed}px, 0) scale(1.12)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [speed])

  return (
    <div ref={ref} className="absolute inset-0 will-change-transform" style={{ transform: 'scale(1.12)' }}>
      {children}
    </div>
  )
}
