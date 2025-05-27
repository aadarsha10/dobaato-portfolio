import SectionTitle from "../ui/SectionTitle";
import { motion } from "framer-motion";

import Icon1 from "../../assets/images/steps.png";
import Icon2 from "../../assets/images/icon2.png";
import Icon3 from "../../assets/images/search.png";
import FeatureCard from "../ui/FeatureCard";

const features = [
  {
    title: "Modular  Development",
    description:
      "Enabling easy feature additions and rapid    transformations.",
    icon: () => <img src={Icon1} alt="" className="w-8 " />,
  },
  {
    title: "Hybrid Work Environment",
    description: "Balancing productivity and flexibility for our team.",
    icon: () => <img src={Icon2} alt="" className="w-8 " />,
  },
  {
    title: "Project-Based Hiring",
    description:
      "Bringing specialized talent to each project for tailored expertise.",
    icon: () => <img src={Icon3} alt="" className="w-8 " />,
  },
];

export default function UniqueAspect() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#10172A]">
      <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
        <SectionTitle title="Unique Aspects of Dobaato" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                image={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
