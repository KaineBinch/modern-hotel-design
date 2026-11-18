import Image from 'next/image'
import { BOOKING_URL } from '@/lib/constants'
import { asset } from '@/lib/assets'

export default function HeroSection() {
  return (
    <section className="relative flex items-center px-6 md:px-12 py-24 md:py-28 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

        {/* Text */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-semibold mb-6 tracking-wide">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            COUNTRYSIDE BED &amp; BREAKFAST
          </div>

          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.1] mb-8 tracking-tighter">
            A sanctuary carved from nature&apos;s quiet
          </h1>

          <p className="text-lg text-secondary leading-relaxed mb-10 max-w-md">
            Restored barn rooms, a long cooked breakfast and quiet gardens, where heritage meets
            modern countryside comfort.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={BOOKING_URL}
              className="bg-primary text-on-primary px-8 md:px-10 py-4 rounded-lg font-label text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform inline-block"
            >
              Book Your Stay
            </a>
            <a
              href="#about"
              className="border border-outline-variant/30 text-primary px-8 md:px-10 py-4 rounded-lg font-label text-sm uppercase tracking-widest hover:bg-surface-container-low transition-colors inline-block"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative mt-8 md:mt-0">
          <div className="aspect-4/5 rounded-xl overflow-hidden shadow-2xl relative">
            <Image
              src={asset('/assets/exterior.jpg')}
              alt="The Alder Fold, a restored brick barn with flower borders"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>

          {/* Overlay quote card — desktop only */}
          <div className="absolute -bottom-10 -left-10 hidden lg:block w-64 bg-surface-container p-8 rounded-lg shadow-xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-tertiary text-4xl mb-4 block">eco</span>
            <p className="font-headline text-primary text-xl leading-snug">
              The scent of cut grass and fresh morning dew.
            </p>
          </div>
        </div>
      </div>

      {/* Background decorative panel — tablet + desktop */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low z-0 hidden md:block rounded-l-[80px] lg:rounded-l-[100px]" />
    </section>
  )
}
