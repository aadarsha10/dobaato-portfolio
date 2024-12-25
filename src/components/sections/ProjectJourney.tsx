import { motion, useAnimation } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import JourneyStep from "../ui/JourneyStep";
import { Search, Code2, TestTube2, Rocket, Headphones } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const steps = [
  {
    icon: Search,
    title: "Research & Consultation",
    description: "In-depth analysis and requirement gathering",
  },
  {
    icon: Code2,
    title: "Agile Development",
    description: "Iterative development with regular feedback",
  },
  {
    icon: TestTube2,
    title: "Testing",
    description: "Comprehensive testing and quality assurance",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Seamless deployment and integration",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Ongoing maintenance and support",
  },
];

export default function ProjectJourney() {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id="journey" className="py-24 bg-[#F5F6FA] dark:bg-dark-200" ref={ref}>
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Project Journey"
          subtitle="Our Proven Development Process"
        />

        <div className="mt-16 relative">
          {/* Animated Line */}
          <motion.div
            className="absolute top-[20%] left-[10%] h-1 bg-primary-500 -translate-y-1/2 hidden md:block z-10"
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: { width: "80%" },
              hidden: { width: 0 },
            }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />

          <div className="grid gap-8 md:grid-cols-5 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{ position: "relative" }}
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
