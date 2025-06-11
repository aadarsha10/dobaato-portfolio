import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { supabase } from '../../SupabaseClient';
import { FAQ as FAQType } from '../../types';
import SectionTitle from '../ui/SectionTitle';

export default function FAQ() {
  const [faqs, setFAQs] = useState<FAQType[]>([]);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase.from("faq").select("*");
        
        if (error) {
          console.error("Error fetching FAQs:", error);
          setFAQs([]);
        } else {
          setFAQs(data || []);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFAQs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <section id="faq" className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services"
          />
          <div className="mt-16 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A45EC]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return (
      <section id="faq" className="py-24 bg-white dark:bg-[#0F172A]">
        <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our services"
          />
          <div className="mt-16 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No FAQs available at the moment. Please check back later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-24 bg-white dark:bg-[#0F172A]">
      <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services"
        />
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="  rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm  "
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-2 text-left flex items-center justify-between transition-colors duration-200"
                  aria-expanded={openItems.has(faq.id)}
                >
                  <h3 className="text-md font-light text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    {openItems.has(faq.id) ? (
                      <Minus className="h-5 w-5 text-[#0A45EC]" />
                    ) : (
                      <Plus className="h-5 w-5 text-[#0A45EC]" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openItems.has(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 mb-4"></div>
                        <p className="text-gray-600 text-sm font-light dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  );
}
