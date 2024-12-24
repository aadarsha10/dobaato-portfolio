import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';
import { useState } from 'react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const categories = ['all', 'web', 'mobile', 'analytics'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-[#F5F6FA] dark:bg-dark-200">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Portfolio"
          subtitle="Recent Projects & Case Studies"
        />
        
        <div className="flex justify-center gap-4 mt-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-lg capitalize ${
                activeFilter === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-dark-100 text-gray-500 dark:text-gray-400 hover:dark:bg-dark-300 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}