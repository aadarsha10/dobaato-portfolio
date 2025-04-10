import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Industries from "../components/sections/Industries";
import Experience from "../components/sections/Experience";
import ProjectJourney from "../components/sections/ProjectJourney";
import Portfolio from "../components/sections/Portfolio";
import CompanyHighlights from "../components/sections/CompanyHighlights";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import Introduction from "../components/sections/Introduction";
import WelcomeMessage from "../components/sections/WelcomeMessage";
import UniqueAspect from "../components/sections/UniqueAspect";
import { MarqueeSkills } from "../components/ui/marquee";

export default function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Introduction />
			<WelcomeMessage />
			<About />
			<Services />
			<ProjectJourney />
			<UniqueAspect />
			<Portfolio />
			<Industries />
			<Experience />
			<MarqueeSkills />
			<CompanyHighlights />
			{/* <Testimonials /> */}
			<Contact />
			<Footer />
		</>
	);
}
