import Reveal from './Reveal'
const amenities = [
  {
    icon: 'wifi',
    title: 'High-Speed WiFi',
    description: 'Free fibre throughout, to stream, work and connect.',
    bg: 'bg-surface-container-lowest',
  },
  {
    icon: 'restaurant',
    title: 'Superb Breakfast',
    description: 'Locally sourced full English, continental, vegan & gluten-free options.',
    bg: 'bg-surface-container',
  },
  {
    icon: 'local_parking',
    title: 'Free Parking',
    description: 'Secure on-site private parking for all guests — no reservation needed.',
    bg: 'bg-surface-container-lowest',
  },
  {
    icon: 'yard',
    title: 'Courtyard Access',
    description: 'Tranquil shared garden terrace with countryside views.',
    bg: 'bg-surface-container',
  },
  {
    icon: 'accessible',
    title: 'Accessible Rooms',
    description: 'Ground-floor rooms with facilities for disabled guests.',
    bg: 'bg-surface-container',
  },
  {
    icon: 'family_restroom',
    title: 'Family Rooms',
    description: 'Generous rooms to accommodate the whole family comfortably.',
    bg: 'bg-surface-container-lowest',
  },
  {
    icon: 'smoke_free',
    title: 'Non-Smoking',
    description: 'Fully non-smoking property with a designated outdoor area.',
    bg: 'bg-surface-container-lowest',
  },
  {
    icon: 'coffee',
    title: 'Tea & Coffee',
    description: 'Kettle, teas and coffee in every room — always.',
    bg: 'bg-surface-container',
  },
]

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-24 px-6 md:px-12 bg-surface overflow-hidden">
      <Reveal className="container mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl text-primary mb-4 tracking-tight">
              The Modern Comforts
            </h2>
            <p className="text-secondary leading-relaxed">
              We balance our historic charm with the essential amenities required for the
              modern traveller.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-headline text-tertiary">8</div>
              <div className="text-[10px] font-label uppercase tracking-widest text-outline">
                En-suite Rooms
              </div>
            </div>
            <div className="h-12 w-px bg-outline-variant/30" />
            <div className="text-right">
              <div className="text-2xl font-headline text-tertiary">Free</div>
              <div className="text-[10px] font-label uppercase tracking-widest text-outline">
                Fibre WiFi
              </div>
            </div>
          </div>
        </div>

        {/* Amenities grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map((item) => (
            <div
              key={item.title}
              className={`${item.bg} p-6 md:p-8 rounded-xl shadow-xs border border-outline-variant/10 flex flex-col items-center text-center`}
            >
              <span
                className="material-symbols-outlined text-primary text-4xl mb-4"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                {item.icon}
              </span>
              <h4 className="font-headline text-primary text-base md:text-lg mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-secondary leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </Reveal>
    </section>
  )
}
