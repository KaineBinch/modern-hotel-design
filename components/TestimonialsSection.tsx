import Reveal from './Reveal'
const testimonials = [
  {
    quote:
      'A warm welcome and a breakfast worth getting up for. The room was spotless and the bed was wonderfully comfortable.',
    name: 'Alex',
    country: 'United Kingdom',
    initial: 'A',
    bg: 'bg-primary-fixed',
    text: 'text-on-primary-fixed',
  },
  {
    quote:
      'A personal touch throughout. Our host left a heater on, knowing it was a chilly evening. Lovely attention to detail.',
    name: 'Morgan',
    country: 'United Kingdom',
    initial: 'M',
    bg: 'bg-secondary-fixed',
    text: 'text-on-secondary-fixed',
  },
  {
    quote:
      'A charming B&B, clean, comfortable and a lovely breakfast. Ideal for short trips to the market town and the surrounding villages.',
    name: 'Sam',
    country: 'Australia',
    initial: 'S',
    bg: 'bg-tertiary-fixed',
    text: 'text-on-tertiary-fixed',
  },
  {
    quote:
      'Great location with easy access to the main road. Spotlessly clean, a good shower and an excellent breakfast.',
    name: 'Jordan',
    country: 'United Kingdom',
    initial: 'J',
    bg: 'bg-primary-fixed',
    text: 'text-on-primary-fixed',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 px-6 md:px-12 bg-surface-container">
      <Reveal className="container mx-auto">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <span className="material-symbols-outlined text-tertiary text-5xl opacity-30 block mb-4">
              format_quote
            </span>
            <h2 className="font-headline text-4xl text-primary tracking-tight">Guest Tales</h2>
            <p className="text-secondary mt-3 text-sm">
              Sample guest reviews for this concept site
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-surface p-8 md:p-10 rounded-2xl shadow-xs border border-outline-variant/10"
              >
                <p className="italic text-secondary text-base md:text-lg mb-6 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center ${t.text} font-bold text-sm shrink-0`}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-primary text-sm">{t.name}</div>
                    <div className="text-xs text-outline uppercase tracking-widest">
                      {t.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregate score */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl font-headline text-primary">8</div>
              <div className="text-xs font-label uppercase tracking-widest text-outline mt-1">
                En-suite Rooms
              </div>
            </div>
            <div>
              <div className="text-3xl font-headline text-primary">16:30</div>
              <div className="text-xs font-label uppercase tracking-widest text-outline mt-1">
                Check-In
              </div>
            </div>
            <div>
              <div className="text-3xl font-headline text-primary">10:30</div>
              <div className="text-xs font-label uppercase tracking-widest text-outline mt-1">
                Check-Out
              </div>
            </div>
            <div>
              <div className="text-3xl font-headline text-primary">Free</div>
              <div className="text-xs font-label uppercase tracking-widest text-outline mt-1">
                Parking
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  )
}
