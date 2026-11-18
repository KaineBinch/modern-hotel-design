import Image from 'next/image'
import BookButton from './BookButton'
import Reveal from './Reveal'
import { roomById } from '@/lib/rooms'

function Price({ id, className = '' }: { id: 'double' | 'family' | 'suite'; className?: string }) {
  return (
    <p className={`font-headline ${className}`}>
      <span className="text-xs font-label uppercase tracking-widest opacity-70">From </span>
      <span className="text-2xl">£{roomById(id).price}</span>
      <span className="text-sm opacity-70"> / night, breakfast included</span>
    </p>
  )
}

export default function RoomsSection() {
  return (
    <section id="rooms" className="py-24 px-6 md:px-12 bg-surface-container-low">
      <Reveal className="container mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline text-4xl text-primary mb-4 tracking-tight">
            Refined Rest
          </h2>
          <p className="text-secondary leading-relaxed">
            Each room is uniquely designed with pine furnishings and traditional touches to ensure
            a peaceful, memorable stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

          {/* Classic Double — wide card */}
          <div className="md:col-span-8 bg-surface rounded-2xl overflow-hidden group shadow-xs hover:shadow-xl transition-shadow duration-500">
            <div className="flex flex-col md:grid md:grid-cols-2 h-full">
              <div className="h-64 md:h-full overflow-hidden relative min-h-[256px]">
                <Image
                  src="/assets/room-double.jpg"
                  alt="The Classic Double, a pine-furnished bedroom with a double bed"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-headline text-2xl text-primary mb-3">The Classic Double</h3>
                <p className="text-secondary text-sm mb-6 leading-relaxed">
                  A cosy retreat featuring warm pine furnishings, perfect for couples seeking a
                  peaceful countryside escape.
                </p>
                <Price id="double" className="text-primary mb-5" />
                <ul className="space-y-2 mb-8 text-sm text-secondary">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    En-suite shower room
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Tea &amp; coffee facilities
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Courtyard garden access
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Free high-speed WiFi
                  </li>
                </ul>
                <BookButton room="double" className="text-tertiary font-label text-xs uppercase tracking-widest font-bold border-b-2 border-tertiary/20 pb-1 w-fit hover:border-tertiary transition-colors">Book This Room</BookButton>
              </div>
            </div>
          </div>

          {/* Family Studio */}
          <div className="md:col-span-4 bg-surface rounded-2xl overflow-hidden group shadow-xs hover:shadow-xl transition-shadow duration-500 flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/assets/room-family.jpg"
                alt="The Family Studio, a bright room with three single beds and a large window"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-headline text-xl text-primary mb-2">Family Studio</h3>
              <p className="text-secondary text-sm mb-6 leading-relaxed flex-1">
                Versatile space for up to three guests with direct access to the central
                courtyard, ideal for families.
              </p>
              <Price id="family" className="text-primary mb-5" />
              <BookButton room="family" className="text-tertiary font-label text-xs uppercase tracking-widest font-bold border-b-2 border-tertiary/20 pb-1 w-fit hover:border-tertiary transition-colors">Explore Room</BookButton>
            </div>
          </div>

          {/* Heritage Family Suite — full-width dark card */}
          <div className="md:col-span-12 bg-primary text-on-primary rounded-2xl overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-5 items-stretch">
              <div className="md:col-span-3 p-10 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 inline-block w-fit">
                  Signature Suite
                </span>
                <h3 className="font-headline text-3xl lg:text-4xl mb-6">
                  The Heritage Family Suite
                </h3>
                <p className="text-primary-fixed-dim/80 text-base lg:text-lg mb-8 max-w-xl leading-relaxed">
                  Our premier accommodation featuring soaring ceilings, original redbrick accents,
                  a tall feature window and wide oak floors. The ultimate countryside experience
                  with premium en-suite amenities.
                </p>
                <p className="font-headline text-primary-fixed-dim mb-6"><span className="text-xs font-label uppercase tracking-widest opacity-70">From </span><span className="text-3xl">£{roomById('suite').price}</span><span className="text-sm opacity-70"> / night, breakfast included</span></p>
                <BookButton room="suite" className="bg-surface text-primary px-8 md:px-10 py-4 rounded-lg font-label text-sm uppercase tracking-widest hover:opacity-90 transition-opacity inline-block w-fit">Book Heritage Suite</BookButton>
              </div>
              <div className="md:col-span-2 h-64 md:h-auto min-h-[300px] relative">
                <Image
                  src="/assets/suite.jpg"
                  alt="The Heritage Family Suite, a high-ceilinged room with exposed brick and a tall window"
                  fill
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  )
}
