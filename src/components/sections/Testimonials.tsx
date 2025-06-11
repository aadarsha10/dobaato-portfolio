import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials as localTestimonials } from '../../data/testimonials';
import { supabase } from '../../SupabaseClient';
import { Testimonial } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase.from("Testimonial").select("*");

      if (error) {
        setTestimonials(localTestimonials);
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, [testimonials.length]);

  // Reset current index if it's out of bounds when testimonials change
  useEffect(() => {
    if (currentIndex >= testimonials.length && testimonials.length > 0) {
      setCurrentIndex(0);
    }
  }, [testimonials.length, currentIndex]);

  // Show loading state if no testimonials are loaded yet
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 bg-[#F5F6FA] dark:bg-[#10172A]">
        <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
          <SectionTitle
            title="Client Testimonials"
            subtitle="What Our Clients Say About Us"
          />
          <div className="mt-16 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A45EC]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 bg-[#F5F6FA] dark:bg-[#10172A]">
      <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
        <SectionTitle
          title="Client Testimonials"
          subtitle="What Our Clients Say About Us"
        />
        
        <div className="mt-16 relative">
          <div className="max-w-3xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard {...testimonials[currentIndex]} />
            </motion.div>
          </div>
          
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-800 dark:text-white hover:text-[#0A45EC]"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-800 dark:text-white hover:text-[#0A45EC]"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}