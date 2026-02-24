import ScrollRevealInit from '@/components/ui/ScrollRevealInit'
import BackgroundEffects from '@/components/sections/BackgroundEffects'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Metrics from '@/components/sections/Metrics'
import Solutions from '@/components/sections/Solutions'
import About from '@/components/sections/About'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Faq from '@/components/sections/Faq'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <ScrollRevealInit />
      <BackgroundEffects />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Metrics />
        <Solutions />
        <About />
        <WhyChooseUs />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
