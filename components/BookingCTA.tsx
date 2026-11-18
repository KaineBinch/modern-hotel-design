import { BOOKING_URL } from '@/lib/constants'

export default function BookingCTA() {
  return (
    <section id="book" className="py-24 px-6 md:px-12 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-surface-container-high rounded-3xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden">

          <div className="relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6 tracking-tight">
              Ready for a quiet escape?
            </h2>
            <p className="text-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Secure your dates at The Alder Fold and rediscover the art of the
              countryside retreat. Check-in from 16:30, check-out by 10:30.
            </p>

            {/* Booking widget */}
            <div className="bg-surface p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 items-stretch md:items-center max-w-3xl mx-auto">
              <div className="flex-1 text-left px-4 py-3 md:border-r border-outline-variant/20">
                <div className="text-[10px] font-label uppercase tracking-widest text-outline mb-1">
                  Check-In
                </div>
                <div className="font-medium text-primary text-sm">From 16:30</div>
              </div>
              <div className="flex-1 text-left px-4 py-3 md:border-r border-outline-variant/20">
                <div className="text-[10px] font-label uppercase tracking-widest text-outline mb-1">
                  Check-Out
                </div>
                <div className="font-medium text-primary text-sm">By 10:30</div>
              </div>
              <div className="flex-1 text-left px-4 py-3 md:border-r border-outline-variant/20">
                <div className="text-[10px] font-label uppercase tracking-widest text-outline mb-1">
                  Breakfast
                </div>
                <div className="font-medium text-primary text-sm">Included with every stay</div>
              </div>
              <a
                href={BOOKING_URL}
                className="w-full md:w-auto bg-primary text-on-primary px-10 py-4 rounded-lg font-label text-sm uppercase tracking-widest hover:opacity-90 transition-opacity inline-block text-center whitespace-nowrap"
              >
                Check Availability
              </a>
            </div>

            {/* Trust signals */}
            <p className="text-xs text-outline mt-6 tracking-wide">
              Free parking &bull; Free cancellation on selected rates &bull; Concept site, bookings are not live
            </p>
          </div>

          {/* Abstract background gradient */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-primary via-transparent to-tertiary" />
          </div>

        </div>
      </div>
    </section>
  )
}
