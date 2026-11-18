'use client'

import { useState, useEffect } from 'react'
import BookButton from './BookButton'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fafaf5]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(26,28,25,0.08)]'
          : 'bg-[#fafaf5]/80 backdrop-blur-xs'
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-8 lg:px-12 py-4 md:py-5 max-w-[1440px] mx-auto">

        {/* Logo */}
        <a href="#" className="text-lg md:text-xl lg:text-2xl font-headline italic text-primary shrink-0">
          The Alder Fold
        </a>

        {/* Desktop / iPad nav links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 font-headline font-medium tracking-tight">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm lg:text-base text-secondary hover:text-primary transition-colors duration-300 first:text-primary first:border-b-2 first:border-primary first:pb-0.5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* CTA — hidden on mobile, shown on md+ */}
          <BookButton className="hidden md:inline-block bg-primary text-on-primary px-5 lg:px-8 py-2.5 lg:py-3 rounded-lg font-label text-xs lg:text-sm uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-all duration-200">Book Your Stay</BookButton>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md hover:bg-surface-container transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-px bg-on-surface transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-on-surface transition-all duration-300 ${
                mobileOpen ? 'opacity-0 w-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-on-surface transition-all duration-300 ${
                mobileOpen ? '-rotate-45 translate-y-[-5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-surface-container-lowest border-t border-outline-variant/20 px-5 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-headline text-base text-secondary hover:text-primary py-3 border-b border-outline-variant/10 last:border-0 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div onClick={() => setMobileOpen(false)} className="contents">
            <BookButton className="mt-4 bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label text-sm uppercase tracking-widest text-center hover:bg-primary-container hover:text-on-surface transition-all">Book Your Stay</BookButton>
          </div>
        </div>
      </div>
    </nav>
  )
}
