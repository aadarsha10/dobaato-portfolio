import { Code2, Gem, Users } from "lucide-react";
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

export default function WelcomeMessage() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-[#10172A]">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="CEO Welcome Message"
          subtitle="Mr. Aadarsha Man Shrestha"
        />
      </div>
      <div className="flex flex-col gap-6 px-6  md:flex-row w-full md:w-[60%]  items-center justify-between md:mx-auto pl-6 md:pl-4 ">
        <p className="text-gray-600 text-[18px] mx-auto mt-12 w-full md:w-[65%]">
          At Dobaato, we bring together a team with decades of collective
          experience in data-centric projects across a range of industries. From
          previous work with Banking and Financial Institutions (BFIs) to our
          partnerships with international clients in the travel, cybersecurity,
          and network hardware sectors, we’ve built a reputation for reliability
          and innovation. Our clients trust us to deliver on projects that
          require the utmost confidentiality and precision, knowing that our
          team’s expertise will support their unique needs.
          <br />
          <br />
          We are especially proud of Saahitt, our latest data initiative
          tailored for Nepal’s events industry. This project harnesses data to
          enhance an industry deeply woven into the country’s cultural fabric,
          underscoring our commitment to impactful, locally relevant solutions.
          <br />
          <br />
          Thank you for joining Dobaato on this journey of innovation and
          excellence. Together, we will continue to explore new avenues, serve
          diverse industries, and make a lasting difference.
        </p>
      </div>
    </section>
  );
}
