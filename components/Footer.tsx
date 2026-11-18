const footerLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Sustainability', href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface-container font-body text-sm leading-relaxed border-t border-outline-variant/15">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-12 md:py-16 gap-8">

        {/* Brand + address */}
        <div className="flex flex-col gap-3 max-w-md text-center md:text-left">
          <div className="font-headline text-lg text-primary">The Alder Fold</div>
          <p className="text-secondary opacity-80 text-xs leading-relaxed">
            &copy; {year} The Alder Fold. A fictional concept site.
            <br />
            Orchard Lane, Thornby Green, Easterbridge, ZZ1 1ZZ.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-xs text-secondary opacity-70">
            <a href="tel:+441632960123" className="hover:opacity-100 transition-opacity">
              01632 960123
            </a>
            <span>&bull;</span>
            <a
              href="mailto:hello@alderfold.example"
              className="hover:opacity-100 transition-opacity"
            >
              hello@alderfold.example
            </a>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-secondary opacity-70 hover:opacity-100 underline decoration-outline-variant/30 transition-opacity text-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex gap-3">
          <a
            href="mailto:hello@alderfold.example"
            className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all"
            aria-label="Email us"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
          </a>
        </div>

      </div>
    </footer>
  )
}
