import { Code2, Gem, Users } from "lucide-react";
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

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-[#10172A]">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="About Us"
          subtitle="Delivering Excellence in IT Solutions"
        />

        <div className="flex flex-col md:grid grid-cols-2 gap-6 md:gap-12 mt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-[25px] text-gray-600 font-bold">Our Vision</h2>
            <p className="text-[16px] text-gray-700">
              To be the leading digital transformation partner in Nepal and a
              global player, delivering innovative solutions that redefine
              industries and empower businesses to achieve unprecedented growth
              and success.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[25px] text-gray-600 font-bold">Our Mission</h2>
            <p className="text-[16px] text-gray-700">
              Our mission is to redefine IT services in Nepal and expand our
              global footprint with impactful solutions.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
