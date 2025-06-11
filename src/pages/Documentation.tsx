import { motion } from 'framer-motion';
import { FileText, BookOpen, Code, Settings, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';

export default function Documentation() {
  const documentationFeatures = [
    {
      icon: BookOpen,
      title: "API Documentation",
      description: "Comprehensive guides for all our API endpoints and integration methods."
    },
    {
      icon: Code,
      title: "Code Examples",
      description: "Ready-to-use code snippets and implementation examples for various platforms."
    },
    {
      icon: Settings,
      title: "Configuration Guides",
      description: "Step-by-step setup instructions and configuration best practices."
    },
    {
      icon: FileText,
      title: "Tutorials & Guides",
      description: "Detailed tutorials to help you get the most out of our solutions."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#F5F6FA] dark:bg-inherit">
        <div className="container mx-auto px-6 py-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#0A45EC] hover:text-[#0936C4] transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0A45EC]/10 dark:bg-[#0A45EC]/20 rounded-full mb-6">
                <FileText className="h-10 w-10 text-[#0A45EC]" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6 font-domine">
              Documentation
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-manrope">
              Your comprehensive guide to our digital solutions
            </p>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A45EC] to-[#0936C4] text-white rounded-full text-lg font-semibold shadow-lg"
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Coming Soon
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16"
          >
            {documentationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0A45EC]/10 dark:bg-[#0A45EC]/20 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-[#0A45EC]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 font-domine">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-manrope">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-[#0A45EC]/20 to-[#0936C4]/20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
                    <BookOpen className="h-16 w-16 text-[#0A45EC]" />
                  </div>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 font-domine">
                We're Building Something Amazing
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-manrope leading-relaxed">
                Our comprehensive documentation portal is currently under development. 
                Soon you'll have access to detailed guides, API references, tutorials, 
                and everything you need to integrate and maximize our digital solutions.
              </p>

              <div className="space-y-4 text-left bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-domine">
                  What's Coming:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 font-manrope">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0A45EC] rounded-full"></div>
                    Complete API documentation with interactive examples
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0A45EC] rounded-full"></div>
                    Step-by-step integration guides for all platforms
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0A45EC] rounded-full"></div>
                    Best practices and optimization tips
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#0A45EC] rounded-full"></div>
                    Video tutorials and code examples
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#0A45EC] hover:bg-[#0936C4] text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Get Notified When Ready
                </Link>
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
