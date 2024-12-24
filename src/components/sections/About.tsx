import { Code2, Gem, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import FeatureCard from '../ui/FeatureCard';

const features = [
  {
    title: 'Modular Development',
    description: 'We build scalable solutions using modern, modular architecture for maximum flexibility and maintainability.',
    icon: Code2,
  },
  {
    title: 'Client-Focused',
    description: 'Our approach prioritizes clear communication and understanding of client needs throughout the development process.',
    icon: Users,
  },
  {
    title: 'Quality First',
    description: 'Rigorous testing and attention to detail ensure delivery of robust, production-ready solutions.',
    icon: Gem,
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F5F6FA] dark:bg-dark-200">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="About Us"
          subtitle="Delivering Excellence in IT Solutions"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}