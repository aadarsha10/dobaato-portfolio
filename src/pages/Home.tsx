import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Industries from '../components/sections/Industries';
import Experience from '../components/sections/Experience';
import ProjectJourney from '../components/sections/ProjectJourney';
import Portfolio from '../components/sections/Portfolio';
import CompanyHighlights from '../components/sections/CompanyHighlights';
import Team from '../components/sections/Team';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Experience />
      <ProjectJourney />
      <Portfolio />
      <CompanyHighlights />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}