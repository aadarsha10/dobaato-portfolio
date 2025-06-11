import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Clock, FileText, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';

export default function PrivacyPolicy() {
  const lastUpdated = "June 11, 2025";

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#F5F6FA] dark:bg-inherit">
        <div className="container mx-auto px-6 py-16 max-w-4xl">
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
            className="text-center mb-16"
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0A45EC]/10 dark:bg-[#0A45EC]/20 rounded-full mb-6">
                <Shield className="h-10 w-10 text-[#0A45EC]" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 font-domine">
              Privacy Policy
            </h1>
            
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-8">
              <Clock className="h-4 w-4" />
              <span className="font-manrope">Last updated: {lastUpdated}</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-8"
          >
            {/* Introduction */}
            <section>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-manrope">
                Dobaato Infotech Pvt. Ltd. ("we", "our", "us") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our software, services, websites, and applications (collectively, the "Services").
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-manrope mt-4">
                By accessing or using our Services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Table of Contents */}
            <section className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 font-domine flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Table of Contents
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 font-manrope">
                <li><a href="#information-collected" className="hover:text-[#0A45EC] transition-colors">1. Information We Collect</a></li>
                <li><a href="#how-we-use" className="hover:text-[#0A45EC] transition-colors">2. How We Use Your Information</a></li>
                <li><a href="#sharing-disclosure" className="hover:text-[#0A45EC] transition-colors">3. Sharing and Disclosure of Information</a></li>
                <li><a href="#data-security" className="hover:text-[#0A45EC] transition-colors">4. Data Security</a></li>
                <li><a href="#your-rights" className="hover:text-[#0A45EC] transition-colors">5. Your Rights and Choices</a></li>
                <li><a href="#third-party" className="hover:text-[#0A45EC] transition-colors">6. Third-Party Services</a></li>
                <li><a href="#children-privacy" className="hover:text-[#0A45EC] transition-colors">7. Children's Privacy</a></li>
                <li><a href="#international-users" className="hover:text-[#0A45EC] transition-colors">8. International Users</a></li>
                <li><a href="#policy-changes" className="hover:text-[#0A45EC] transition-colors">9. Changes to This Privacy Policy</a></li>
                <li><a href="#contact" className="hover:text-[#0A45EC] transition-colors">10. Contact Us</a></li>
              </ul>
            </section>

            {/* Section 1: Information We Collect */}
            <section id="information-collected">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 font-domine">
                a. Personal Information
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-manrope">
                We may collect personally identifiable information such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6 font-manrope ml-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company/Organization name</li>
                <li>Billing and payment details</li>
                <li>Any other information you voluntarily provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 font-domine">
                b. Usage Data
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-manrope">
                We may also collect information automatically when you use our Services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6 font-manrope ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited</li>
                <li>Time and date of access</li>
                <li>Device information</li>
                <li>Referring URLs</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 font-domine">
                c. Cookies & Tracking Technologies
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                We use cookies and similar technologies to enhance your user experience and analyze usage patterns.
              </p>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section id="how-we-use">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-manrope">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-manrope ml-4">
                <li>Provide, maintain, and improve our Services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Personalize user experience</li>
                <li>Send administrative and promotional communications</li>
                <li>Process transactions</li>
                <li>Ensure legal compliance and protect against fraud</li>
              </ul>
            </section>

            {/* Section 3: Sharing and Disclosure */}
            <section id="sharing-disclosure">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                3. Sharing and Disclosure of Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-manrope">
                We do not sell or rent your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 font-manrope ml-4">
                <li>Service providers who perform services on our behalf</li>
                <li>Legal authorities, when required by law or to protect rights</li>
                <li>Third parties in the event of a business transfer (e.g., merger, acquisition)</li>
              </ul>
            </section>

            {/* Section 4: Data Security */}
            <section id="data-security">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine flex items-center gap-2">
                <Lock className="h-6 w-6 text-[#0A45EC]" />
                4. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                We implement appropriate technical and organizational measures to safeguard your information from unauthorized access, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 5: Your Rights */}
            <section id="your-rights">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                5. Your Rights and Choices
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 font-manrope">
                Depending on your location, you may have rights to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4 font-manrope ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion</li>
                <li>Object to or restrict processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                To exercise your rights, please contact us at <a href="mailto:hello@dobaato.com" className="text-[#0A45EC] hover:underline">hello@dobaato.com</a>.
              </p>
            </section>

            {/* Section 6: Third-Party Services */}
            <section id="third-party">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                6. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                Our Services may contain links to third-party websites or use third-party services. We are not responsible for their privacy practices and encourage you to read their policies.
              </p>
            </section>

            {/* Section 7: Children's Privacy */}
            <section id="children-privacy">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                7. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                Our Services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Section 8: International Users */}
            <section id="international-users">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                8. International Users
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                If you are accessing our Services from outside Nepal, please note that your information may be transferred to, stored, and processed in Nepal. By using our Services, you consent to such transfer.
              </p>
            </section>

            {/* Section 9: Policy Changes */}
            <section id="policy-changes">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 font-domine">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 font-manrope">
                We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website or via other means. Your continued use of our Services after changes are posted constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Section 10: Contact */}
            <section id="contact">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 font-domine">
                10. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 font-manrope">
                If you have any questions about this Privacy Policy or our data practices, please contact:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-domine">
                  Dobaato Infotech Pvt. Ltd.
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#0A45EC] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white font-domine">Address:</p>
                      <p className="text-gray-600 dark:text-gray-400 font-manrope">
                        Ranibari 26, Samakhushi, Kathmandu, Nepal
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#0A45EC] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white font-domine">Email:</p>
                      <a 
                        href="mailto:hello@dobaato.com" 
                        className="text-[#0A45EC] hover:underline font-manrope"
                      >
                        hello@dobaato.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#0A45EC] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white font-domine">Phone:</p>
                      <div className="space-y-1 font-manrope">
                        <p className="text-gray-600 dark:text-gray-400">+977 9849088717</p>
                        <p className="text-gray-600 dark:text-gray-400">+977 9861495735</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-manrope">
                This Privacy Policy is effective as of {lastUpdated} and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
