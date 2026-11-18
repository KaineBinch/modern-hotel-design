import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HeritageSection from '@/components/HeritageSection'
import RoomsSection from '@/components/RoomsSection'
import AmenitiesSection from '@/components/AmenitiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BookingCTA from '@/components/BookingCTA'
import Footer from '@/components/Footer'
import BookingProvider from '@/components/BookingProvider'

export default function Home() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <HeroSection />
        <HeritageSection />
        <RoomsSection />
        <AmenitiesSection />
        <TestimonialsSection />
        <BookingCTA />
      </main>
      <Footer />
    </BookingProvider>
  )
}
