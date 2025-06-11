import Navbar from '../../components/Navbar';
import Footer from '../../components/sections/Footer';
import CaseStudiesList from './CaseStudiesList';

export default function CaseStudies() {
  return (
    <>
      <Navbar />
      <main className="pt-32 min-h-screen bg-[#F5F6FA] dark:bg-inherit">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
              Case Studies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-manrope">
              Explore our successful projects and discover how we've helped businesses transform their digital presence through innovative solutions.
            </p>
          </div>
          <CaseStudiesList />
        </div>
      </main>
      <Footer />
    </>
  );
}
