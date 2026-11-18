'use client'

import { useEffect, useRef, useState } from 'react'

/** Fades its children up as they scroll into view. Content stays visible without JS or with reduced motion. */
export default function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'visible' | 'hidden' | 'shown'>('visible')

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    setState('hidden')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const motion =
    state === 'hidden' ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${motion} ${className}`}>
      {children}
    </div>
  )
}
