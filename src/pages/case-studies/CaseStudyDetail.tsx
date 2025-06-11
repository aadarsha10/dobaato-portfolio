import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Github, Globe } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/sections/Footer';
import { CaseStudy } from '../../types';
import { supabase } from '../../SupabaseClient';
import toast from 'react-hot-toast';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<CaseStudy[]>([]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) return;
      
      try {
        // Fetch the case study by slug from Supabase
        const { data, error } = await supabase
          .from('CaseStudy')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          toast.error('Case study not found');
          setLoading(false);
          return;
        }

        setCaseStudy(data);

        // Fetch related case studies (excluding current case study)
        const { data: related } = await supabase
          .from('CaseStudy')
          .select('*')
          .neq('slug', slug)
          .limit(3);

        setRelatedCaseStudies(related || []);
      } catch (error) {
        toast.error('Error loading case study');
        console.error('Error fetching case study:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  // Update document title when case study loads
  useEffect(() => {
    if (caseStudy) {
      document.title = `${caseStudy.title} | Dobaato Case Studies`;
    }
    return () => {
      document.title = 'Dobaato - Digital Solutions';
    };
  }, [caseStudy]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24  h-full bg-[#F5F6FA] dark:bg-inherit">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!caseStudy) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen h-full bg-[#F5F6FA] dark:bg-inherit">
          <div className="container mx-auto px-6 max-w-4xl text-center py-16">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Case Study Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The case study you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A45EC] hover:bg-[#0936C4] text-white rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 min-h-screen  bg-[#F5F6FA] dark:bg-inherit">
        <article className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-[#0A45EC] hover:text-[#0936C4] transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl"
          >
            <img
              src={caseStudy.imageUrl}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>

          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 font-domine leading-tight">
              {caseStudy.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-manrope leading-relaxed">
              {caseStudy.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
              {caseStudy.clientName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Client: {caseStudy.clientName}</span>
                </div>
              )}
              {caseStudy.projectDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(caseStudy.projectDate)}</span>
                </div>
              )}
            </div>

            {/* Project Links */}
            {(caseStudy.projectUrl || caseStudy.githubUrl) && (
              <div className="flex flex-wrap gap-4 mb-8">
                {caseStudy.projectUrl && (
                  <a
                    href={caseStudy.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A45EC] hover:bg-[#0936C4] text-white rounded-lg transition-colors duration-200"
                  >
                    <Globe className="h-4 w-4" />
                    View Live Project
                  </a>
                )}
                {caseStudy.githubUrl && (
                  <a
                    href={caseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
              </div>
            )}

            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#0A45EC]/10 text-[#0A45EC] dark:bg-[#0A45EC]/20 dark:text-[#4A9EFF] rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Content */}
          {caseStudy.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="prose prose-lg dark:prose-invert max-w-none mb-16"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 font-domine">
                  Project Details
                </h2>
                <div className="text-gray-600 dark:text-gray-300 font-manrope leading-relaxed whitespace-pre-wrap">
                  {caseStudy.content}
                </div>
              </div>
            </motion.div>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center font-domine">
                Related Case Studies
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedCaseStudies.map((relatedCaseStudy) => (
                  <Link
                    key={relatedCaseStudy.id}
                    to={`/case-studies/${relatedCaseStudy.slug}`}
                    className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200 "
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedCaseStudy.imageUrl}
                        alt={relatedCaseStudy.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                          {relatedCaseStudy.title}
                        </h3>
                        <p className="text-gray-200 text-sm line-clamp-2">
                          {relatedCaseStudy.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </article>
      <Footer />

      </main>
    </>
  );
}
