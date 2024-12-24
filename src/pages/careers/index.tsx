import Navbar from '../../components/Navbar';
import Footer from '../../components/sections/Footer';
import JobList from './JobList';

export default function Careers() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">Join Our Team</h1>
          <p className="text-gray-400 mb-8">Discover exciting opportunities at Dobaato</p>
          <JobList />
        </div>
      </main>
      <Footer />
    </>
  );
}