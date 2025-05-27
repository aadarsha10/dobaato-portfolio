import { motion, useAnimation } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import JourneyStep from "../ui/JourneyStep";
import { Search, Code2, TestTube2, Rocket, Headphones } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const steps = [
  {
    icon: Search,
    title: "Consultation and Research",
    description: "Tailoring solutions to meet client-specific needs.",
  },
  {
    icon: Code2,
    title: "Agile Development",
    description: "Ensuring adaptability and rapid iterations.",
  },
  {
    icon: TestTube2,
    title: "Rigorous Testing",
    description: "Delivering reliable and high-performing solutions.",
  },
  {
    icon: Rocket,
    title: "Seamless Delivery and Support",
    description: "Providing ongoing maintenance and optimization",
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
    <section
      id="journey"
      className="py-24 bg-white dark:bg-[#10172A]"
      ref={ref}
    >
      <div className="container mx-auto px-6 w-full md:w-[70%]">
        <SectionTitle
          title="Our Project Approach"
          subtitle="Our Proven Development Process"
        />

        <div className="mt-16 relative">
          {/* Animated Line */}
          <motion.div
            className="absolute top-[15%] left-[10%] h-0.5 bg-primary-500 -translate-y-1/2 hidden md:block z-10"
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: { width: "80%" },
              hidden: { width: 0 },
            }}
            transition={{ duration: 5, ease: "easeInOut" }}
          />

          <div className="grid gap-8 md:grid-cols-4 relative z-10">
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
