import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import CompanyHighlights from "../components/sections/CompanyHighlights";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";
import FAQ from "../components/sections/FAQ";
import Footer from "../components/sections/Footer";
import Industries from "../components/sections/Industries";
import Introduction from "../components/sections/Introduction";
import Portfolio from "../components/sections/Portfolio";
import ProjectJourney from "../components/sections/ProjectJourney";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import UniqueAspect from "../components/sections/UniqueAspect";
import {MarqueeSkills} from "../components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Introduction />
      <Experience />
      <Services />
      <Portfolio />
      <ProjectJourney />
      <UniqueAspect />
      <MarqueeSkills />
      <Industries />
      <CompanyHighlights />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
