import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { Building2, Users, Globe } from 'lucide-react';
import ExperienceCard from '../ui/ExperienceCard';

const highlights = [
  {
    icon: Building2,
    title: '9+ Years',
    description: 'Collective experience in data-driven projects',
  },
  {
    icon: Users,
    title: 'BFI Expertise',
    description: 'Specialized in Banking and Financial Institutions',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Serving international clients across time zones',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-[#10172A]">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Experience"
          subtitle="Proven Track Record of Excellence"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ExperienceCard {...highlight} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}