import Navbar from '../../components/Navbar';
import Footer from '../../components/sections/Footer';
import BlogList from './BlogList';

export default function Blog() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
          <p className="text-gray-400 mb-8">Insights and updates from our team</p>
          <BlogList />
        </div>
      </main>
      <Footer />
    </>
  );
}