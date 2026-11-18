import Image from 'next/image'
import Reveal from './Reveal'

export default function HeritageSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-surface">
      <Reveal className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image — order 2 on mobile, order 1 on tablet+ */}
          <div className="order-2 md:order-1 relative">
            <div className="rounded-2xl overflow-hidden shadow-xs aspect-4/3 relative">
              <Image
                src="/assets/heritage.jpg"
                alt="A restored barn interior with exposed brick, oak beams and a long wooden table"
                fill
                className="object-cover"
              />
            </div>
            {/* Circular location badge */}
            <div className="absolute -top-6 -right-4 md:-right-10 w-36 h-36 md:w-44 md:h-44 bg-tertiary-fixed rounded-full flex items-center justify-center text-center p-5 border-4 border-surface shadow-lg">
              <p className="font-headline text-on-tertiary-fixed text-xs md:text-sm leading-snug">
                Ideally located in Thornby Green
              </p>
            </div>
          </div>

          {/* Text — order 1 on mobile, order 2 on tablet+ */}
          <div className="order-1 md:order-2">
            <h2 className="font-headline text-4xl text-primary mb-8 tracking-tight">
              Our Heritage
            </h2>
            <div className="space-y-6 text-secondary leading-relaxed">
              <p>
                Tucked away in the quiet countryside, The Alder Fold offers a tranquil escape
                while remaining well connected to the region&apos;s historic heart.
              </p>
              <p>
                Our redbrick sanctuary sits just 2 miles from the main road, providing easy access
                for travellers. We are 4 miles from the county showground and only 6 miles from
                the market town of Easterbridge, known for its old castle and weekly antique
                market.
              </p>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-outline-variant/20 mt-8">
              <div>
                <div className="text-3xl font-headline text-primary mb-1">2 mi</div>
                <div className="text-xs font-label uppercase tracking-widest text-outline">
                  From the main road
                </div>
              </div>
              <div>
                <div className="text-3xl font-headline text-primary mb-1">6 mi</div>
                <div className="text-xs font-label uppercase tracking-widest text-outline">
                  To Easterbridge
                </div>
              </div>
              <div>
                <div className="text-3xl font-headline text-primary mb-1">4 mi</div>
                <div className="text-xs font-label uppercase tracking-widest text-outline">
                  County Showground
                </div>
              </div>
              <div>
                <div className="text-3xl font-headline text-primary mb-1">8</div>
                <div className="text-xs font-label uppercase tracking-widest text-outline">
                  En-suite rooms
                </div>
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  )
}
