import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import SectionTitle from '../ui/SectionTitle';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials } from '../../data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-dark-200">
      <div className="container mx-auto px-6">
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
          
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[#0A45EC]"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white hover:text-[#0A45EC]"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
}