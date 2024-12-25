import { motion } from "framer-motion";
import { BarChart3, Globe, Smartphone, Palette, ShieldBanIcon, Computer, Shield, AppWindow, UserCircle } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import ServiceCard from "../ui/ServiceCard";

const services = [
  {
    title: "Web Development",
    description:
      "Create powerful web applications using cutting-edge technologies.",
    icon: Globe,
    color: "from-purple-600 to-blue-500",
  },
  {
    title: "Mobile Development",
    description:
      "Build native and cross-platform mobile applications that users love.",
    icon: Smartphone,
    color: "from-pink-600 to-purple-500",
  },
  {
    title: "BespokeSoftware Development",
    description:
      "Custom software development for your specific needs.",
    icon: AppWindow,
    color: "from-pink-600 to-purple-500",
  },
  {
    title: "UI/UX Design",
    description:
      "Design intuitive and beautiful user interfaces that enhance user experience.",
    icon: Palette,
    color: "from-orange-600 to-pink-500",
  },
  {
    title: "Data Analytics",
    description:
      "Transform your data into actionable insights with our advanced analytics solutions.",
    icon: BarChart3,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "DevOps / SecOps",
    description:
      "Improve security and reliability with our DevOps and SecOps services.",
    icon: Computer,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Security Audits    ",
    description:
      "Protect your business from cyber threats with our comprehensive security audits.",
    icon: Shield,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Many More Services",
    description:
      "Explore our comprehensive range of services",
    icon: UserCircle,
    color: "from-blue-600 to-cyan-500",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-[#F5F6FA] dark:bg-[#10172A] overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive IT Solutions"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
