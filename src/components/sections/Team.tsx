import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import TeamMemberCard from '../ui/TeamMemberCard';
import { teamMembers } from '../../data/team';

export default function Team() {
  return (
    <section id="team" className="py-24 bg-dark-300">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Team"
          subtitle="Meet the Experts Behind Our Success"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}