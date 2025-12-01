import {motion} from "framer-motion";
import {Code2, Gem, Users} from "lucide-react";
import FeatureCard from "../ui/FeatureCard";
import SectionTitle from "../ui/SectionTitle";

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
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 0.7}}
          viewport={{once: true}}
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

        {/* Vision, Mission and Values Cards */}
        <motion.div
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.2}}
          viewport={{once: true}}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.2}}
              viewport={{once: true}}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-white dark:bg-[#1A2F4A] border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 md:w-20 md:h-20"
                >
                  {/* Target Icon */}
                  <circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke="#EF4444"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="24"
                    stroke="#EF4444"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="13"
                    stroke="#EF4444"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="40" cy="40" r="4" fill="#EF4444" />
                  <path
                    d="M40 5 L45 18 L59 18 L48 27 L52 40 L40 31 L28 40 L32 27 L21 18 L35 18 Z"
                    fill="#EF4444"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 font-domine">
                Our <span className="text-red-500">Mission</span>
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300 font-manrope">
                Our mission is to redefine IT services in Nepal and expand our
                global footprint with impactful solutions that create lasting
                value for our clients. We aim to foster innovation, excellence,
                and sustainable growth through technology.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.3}}
              viewport={{once: true}}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-white dark:bg-[#1A2F4A] border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 md:w-20 md:h-20"
                >
                  {/* Eye Icon */}
                  <path
                    d="M40 25C30 25 21 32 15 40C21 48 30 55 40 55C50 55 59 48 65 40C59 32 50 25 40 25Z"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="8"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle cx="40" cy="40" r="4" fill="#3B82F6" />
                  <path
                    d="M20 20 L25 25 M60 20 L55 25 M20 60 L25 55 M60 60 L55 55"
                    stroke="#3B82F6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 font-domine">
                Our <span className="text-blue-500">Vision</span>
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300 font-manrope">
                To be the leading digital transformation partner in Nepal and a
                global player, delivering innovative solutions that redefine
                industries and empower businesses to achieve unprecedented
                growth and success.
              </p>
            </motion.div>

            {/* Values Card */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.4}}
              viewport={{once: true}}
              className="flex flex-col items-center text-center p-8 rounded-xl bg-white dark:bg-[#1A2F4A] border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 md:w-20 md:h-20"
                >
                  {/* Star Medal Icon */}
                  <circle
                    cx="40"
                    cy="35"
                    r="20"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M40 15 L45 28 L59 28 L48 37 L53 50 L40 41 L27 50 L32 37 L21 28 L35 28 Z"
                    fill="#10B981"
                  />
                  <path
                    d="M30 55 L35 65 M50 55 L45 65"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M35 65 Q40 70 45 65"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 font-domine">
                Our <span className="text-emerald-500">Values</span>
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300 font-manrope">
                We are driven by modular development, client-focused solutions,
                and quality-first approaches. Our core values emphasize
                innovation, excellence, integrity, and sustainable growth.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Core Values */}
        <motion.div
          initial={{opacity: 0, y: 40}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.3}}
          viewport={{once: true}}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 md:mb-12 font-domine   relative">
            <span className=" inline-block">Our Core Values</span>
          </h2>

          <div className=" flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.2 + 0.4}}
                viewport={{once: true}}
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
