import {useEffect} from "react";
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
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hashFromUrl = window.location.hash;
    const pendingHash = sessionStorage.getItem("pendingSectionHash");
    const targetHash = hashFromUrl || pendingHash;

    if (!targetHash?.startsWith("#")) return;

    const scrollToTarget = () => {
      if (targetHash === "#home") {
        window.scrollTo({top: 0, behavior: "smooth"});
        sessionStorage.removeItem("pendingSectionHash");
        return true;
      }

      const targetElement = document.querySelector(targetHash);
      if (targetElement) {
        targetElement.scrollIntoView({behavior: "smooth"});
        sessionStorage.removeItem("pendingSectionHash");
        return true;
      }

      return false;
    };

    if (scrollToTarget()) return;

    let attempts = 0;
    const maxAttempts = 25;
    const interval = window.setInterval(() => {
      attempts += 1;
      if (scrollToTarget() || attempts >= maxAttempts) {
        window.clearInterval(interval);
      }
    }, 120);

    return () => window.clearInterval(interval);
  }, []);

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
