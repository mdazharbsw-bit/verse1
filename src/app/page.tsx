import PageLoader from '@/components/ui/PageLoader';
import CustomCursor from '@/components/ui/CustomCursor';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import ServiceMarquee from '@/components/sections/ServiceMarquee';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import VerveGlobeSection from '@/components/sections/VerveGlobeSection';
import Leadership from '@/components/sections/Leadership';
import Clients from '@/components/sections/Clients';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <ServiceMarquee />
        <About />
        <Services />
        <VerveGlobeSection />
        <Leadership />
        <Clients />
        <Process />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
