import {motion} from "framer-motion";
import {ArrowLeft} from "lucide-react";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";
import About from "../../components/sections/About";
import CompanyHighlights from "../../components/sections/CompanyHighlights";
import Experience from "../../components/sections/Experience";
import Footer from "../../components/sections/Footer";
import Testimonials from "../../components/sections/Testimonials";
import WelcomeMessage from "../../components/sections/WelcomeMessage";
import {MarqueeSkills} from "../../components/ui/Marquee";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-[#0d1424]">
        {/* Back Button */}
        <motion.div
          initial={{opacity: 0, x: -20}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5}}
          className="container mx-auto px-6 pt-24 pb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* CEO Welcome Message */}
        <motion.section
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8, delay: 0.2}}
        >
          <WelcomeMessage />
        </motion.section>

        {/* Main About Content */}
        <motion.section
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8}}
        >
          <About />
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8, delay: 0.4}}
        >
          <Experience />
        </motion.section>

        {/* Skills Marquee */}
        <motion.section
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8, delay: 0.6}}
        >
          <MarqueeSkills />
        </motion.section>

        {/* Company Highlights */}
        <motion.section
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8, delay: 0.8}}
        >
          <CompanyHighlights />
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.8, delay: 1}}
        >
          <Testimonials />
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
