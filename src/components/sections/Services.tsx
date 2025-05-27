import { motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  Smartphone,
  Palette,
  Computer,
  Shield,
  AppWindow,
  UserCircle,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { Feature } from "./Feature";

const services = [
  {
    title: "Web Development",
    description:
      "Develop scalable web applications leveraging modern frontend and backend frameworks for optimal performance and user engagement.",
    icon: <Globe />,
    color: "from-purple-600 to-blue-500",
  },
  {
    title: "Mobile Development",
    description:
      "Deliver responsive mobile solutions for iOS and Android platforms with seamless functionality and intuitive user interfaces.",
    icon: <Smartphone />,
    color: "from-pink-600 to-purple-500",
  },
  {
    title: "Software Development",
    description:
      "Engineer customized software solutions tailored to address your business challenges and operational requirements.",
    icon: <AppWindow />,
    color: "from-pink-600 to-purple-500",
  },
  {
    title: "UI/UX Design",
    description:
      "Create visually appealing interfaces with user-centered design principles that enhance accessibility and customer satisfaction.",
    icon: <Palette />,
    color: "from-orange-600 to-pink-500",
  },
  {
    title: "Data Analytics",
    description:
      "Implement powerful analytics tools to extract meaningful patterns from complex datasets for informed business decision-making.",
    icon: <BarChart3 />,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "DevOps / SecOps",
    description:
      "Streamline development workflows and enhance system security through automated deployment pipelines and continuous integration.",
    icon: <Computer />,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Security Audits    ",
    description:
      "Conduct thorough vulnerability assessments and penetration testing to identify and mitigate potential security risks.",
    icon: <Shield />,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Many More Services",
    description:
      "Discover additional specialized IT solutions including cloud infrastructure, AI integration, and enterprise architecture.",
    icon: <UserCircle />,
    color: "from-blue-600 to-cyan-500",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-gray-50 dark:bg-[#10172A] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-0 w-full md:w-[70%]">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive IT Solutions"
        />

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Feature {...service} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
