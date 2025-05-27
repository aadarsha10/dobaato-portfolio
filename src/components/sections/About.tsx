import { Code2, Gem, Users, ArrowRight } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { motion } from "framer-motion";
import FeatureCard from "../ui/FeatureCard";

const features = [
  {
    title: "Modular Development",
    description:
      "We build scalable solutions using modern, modular architecture for maximum flexibility and maintainability.",
    icon: Code2,
  },
  {
    title: "Client-Focused",
    description:
      "Our approach prioritizes clear communication and understanding of client needs throughout the development process.",
    icon: Users,
  },
  {
    title: "Quality First",
    description:
      "Rigorous testing and attention to detail ensure delivery of robust, production-ready solutions.",
    icon: Gem,
  },
];

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1287&auto=format&fit=crop",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1287&auto=format&fit=crop",
  },
  {
    name: "Alex Johnson",
    role: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-[#10172A] dark:to-[#0d1424]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-[90%] lg:w-[80%]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mb-16 md:mb-20 lg:mb-24"
        >
          <SectionTitle
            title="About Us"
            subtitle="Delivering Excellence in IT Solutions"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 md:w-16 h-12 md:h-16 opacity-20 -z-10">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-primary dark:text-primary-400"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>

        {/* Vision and Mission with Graphics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-20">
            <div className="flex flex-col relative">
              <div className="absolute top-0 left-0 w-12 md:w-16 h-12 md:h-16 -mt-3 -ml-3 md:-mt-4 md:-ml-4 bg-primary/10 dark:bg-primary-500/20 rounded-lg -z-10"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 relative font-domine">
                Our Vision
                <span className="absolute -bottom-2 left-0 w-8 md:w-12 h-1 bg-primary dark:bg-primary-400"></span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 md:mb-8 font-manrope">
                To be the leading digital transformation partner in Nepal and a
                global player, delivering innovative solutions that redefine
                industries and empower businesses to achieve unprecedented
                growth and success.
              </p>
              <div className="mt-auto relative h-56 sm:h-64 md:h-72 overflow-hidden rounded-xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop"
                  alt="Team collaboration"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
              </div>
            </div>

            <div className="flex flex-col relative mt-12 md:mt-0">
              <div className="absolute top-0 right-0 w-12 md:w-16 h-12 md:h-16 -mt-3 -mr-3 md:-mt-4 md:-mr-4 bg-primary/10 dark:bg-primary-500/20 rounded-lg -z-10"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 relative font-domine">
                Our Mission
                <span className="absolute -bottom-2 left-0 w-8 md:w-12 h-1 bg-primary dark:bg-primary-400"></span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-6 md:mb-8 font-manrope">
                Our mission is to redefine IT services in Nepal and expand our
                global footprint with impactful solutions that create lasting
                value for our clients. We aim to foster innovation, excellence,
                and sustainable growth through technology.
              </p>
              <div className="mt-auto relative h-56 sm:h-64 md:h-72 overflow-hidden rounded-xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop"
                  alt="Business meeting"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 md:mb-12 font-domine   relative">
            <span className=" inline-block">Our Core Values</span>
          </h2>

          <div className=" flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
