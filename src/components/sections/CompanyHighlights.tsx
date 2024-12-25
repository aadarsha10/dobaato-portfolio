import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import HighlightCard from '../ui/HighlightCard';
import { Puzzle, Users2, Target, Globe2 } from 'lucide-react';

const highlights = [
  {
    title: 'Unique Aspects',
    items: [
      'Modular software development for rapid transformations',
      'Hybrid working environment for optimal productivity',
      'Project-based hiring for specialized expertise',
    ],
    icon: Puzzle,
  },
  {
    title: 'Client-Centric Focus',
    items: [
      'Attention to detail in every project',
      'Long-term client relationships',
      'Transparent communication',
    ],
    icon: Target,
  },
  {
    title: 'International Collaboration',
    items: [
      'Robust IT infrastructure',
      'Flexible hours for global time zones',
      'Local expertise for regional challenges',
    ],
    icon: Globe2,
  },
  {
    title: 'Our Vision',
    items: [
      'Redefining IT services in Nepal',
      'Delivering impactful solutions',
      'International scale innovation',
    ],
    icon: Users2,
  },
];

export default function CompanyHighlights() {
  return (
    <section id="highlights" className="py-24 bg-white dark:bg-[#10172A]">
      <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Our Commitment to Excellence"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <HighlightCard {...highlight} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}