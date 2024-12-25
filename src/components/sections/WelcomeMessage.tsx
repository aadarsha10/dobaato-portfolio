import SectionTitle from "../ui/SectionTitle";
import image from "../../assets/images/WhatsApp Image 2024-12-25 at 12.12.11 PM.jpeg";
import { motion } from "framer-motion";
export default function WelcomeMessage() {
  return (
    <section id="about" className="py-24 bg-[#F5F6FA] dark:bg-[#10172A]">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="CEO Welcome Message"
          subtitle="Mr. Aadarsha Man Shrestha"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
      <div className="flex items-center flex-col md:flex-row w-full md:w-[70%]  gap-10 mx-auto mt-12 px-6 md:px-0">
        <img
          src={image}
          alt="adrash-man-shrestha"
          className="max-w-[100px] aspect-square md:aspect-auto rounded-full md:max-w-[360px] md:rounded-lg"
        />
        <p className="text-gray-600 dark:text-gray-200 text-[16px] md:text-[18px] mx-auto w-full md:w-[50%]">
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
      </motion.div>
    </section>
  );
}
