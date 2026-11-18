import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import HeritageSection from '@/components/HeritageSection'
import RoomsSection from '@/components/RoomsSection'
import AmenitiesSection from '@/components/AmenitiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BookingCTA from '@/components/BookingCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
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
    </>
  )
}
