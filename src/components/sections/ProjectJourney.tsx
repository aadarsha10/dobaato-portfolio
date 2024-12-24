import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import JourneyStep from '../ui/JourneyStep';
import { Search, Code2, TestTube2, Rocket, Headphones } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Research & Consultation',
    description: 'In-depth analysis and requirement gathering',
  },
  {
    icon: Code2,
    title: 'Agile Development',
    description: 'Iterative development with regular feedback',
  },
  {
    icon: TestTube2,
    title: 'Testing',
    description: 'Comprehensive testing and quality assurance',
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'Seamless deployment and integration',
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Ongoing maintenance and support',
  },
];

export default function ProjectJourney() {
  return (
    <section id="journey" className="py-24 bg-dark-200">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Project Journey"
          subtitle="Our Proven Development Process"
        />
        
        <div className="mt-16 relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary-500/20 -translate-y-1/2 hidden md:block" />
          
          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <JourneyStep {...step} stepNumber={index + 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}