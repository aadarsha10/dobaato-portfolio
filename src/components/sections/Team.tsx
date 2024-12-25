import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import Member1 from "../../assets/images/anish.webp";
import Member2 from "../../assets/images/sagun.webp";
import Member3 from "../../assets/images/member3.webp";
import LineThrough from "../line-through";
import DefaultUser from "../../assets/images/default-user.webp";
import { ArrowDown, ChevronDown, ChevronUp } from "lucide-react";

export default function Team() {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const teams = [
    {
      src: Member2,
      name: "Sagun Shrestha",
      role: "CEO & Founder",
    },
    {
      src: Member1,
      name: "Anish Shrestha",
      role: "Co-founder & Senior Developer",
    },
    {
      src: Member3,
      name: "Prameet Ghimire",
      role: "Co-founder & CFO",
    },
  ];

  const allTeams = [
    {
      title: "Development Teams",
      members: [
        { name: "Aadarsha Man Shrestha ", exp: "4+" },
        { name: "Anish Poudel", exp: "2+" },
        { name: "Dilip Bam", exp: "3+" },
        { name: "Rajan Raj Shah", exp: "3+" },
        { name: "Kundan Bhattarai", exp: "6+" },
        { name: "Pranav Dahal", exp: "4+" },
        { name: "Prajwal Acharya", exp: "2+" },
      ],
    },
    {
      title: "UI/UX Teams",
      members: [
        { name: "Shreejan Bista", exp: "5+" },
        { name: "Ashim Karki", exp: "1+" },
      ],
    },
    {
      title: "Devops",
      members: [{ name: "Ankit Shrestha", exp: "3+" }],
    },
    {
      title: "Consultant Team",
      members: [
        { name: "Subodh Chandra Sakhya", exp: "5+" },
        { name: "Prashant Parajuli", exp: "2+" },
      ],
    },
    {
      title: "Data Security Team",
      members: [
        { name: "Anzil Subedi", exp: "6+" },
        { name: "Sunil Songmen", exp: "13+" },
      ],
    },
    {
      title: "QA Team",
      members: [
        { name: "Bijay Chaudhary", exp: "4+" },
        { name: "Joyesh Shrestha", exp: "1+" },
        { name: "Pradip Lamsal", exp: "1+" },
      ],
    },
  ];

  return (
    <section id="team" className="py-24 bg-[#F5F6FA] dark:bg-[#10172A]">
      <div className="container mx-auto px-6 relative">
        <SectionTitle title="Our Core Team Members" />
        <div className="flex flex-col mt-12 gap-6 w-full md:w-[60%] items-center mx-auto">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            The success of Dobaato is driven by our talented and hardworking
            team. Our executive team provides visionary leadership and strategic
            direction, ensuring we maintain our commitment to innovation and
            excellence. Every team member plays a crucial role in achieving our
            goals and delivering exceptional results for our clients.
          </p>
          <div className="flex gap-8 md:flex-row flex-col flex-wrap justify-center">
            {teams.map((team, index) => (
              <TeamMember
                key={index}
                src={team.src}
                name={team.name}
                role={team.role}
              />
            ))}
          </div>
          {!showAll && (
            <div className="flex mt-6 w-full flex-col max-h-[118px] overflow-hidden bg-top relative fade-after">
              <LineThrough
                text={allTeams?.[0].title}
                className="text-gray-700 font-semibold"
              />
              <div className="mt-6 flex flex-row gap-8 flex-wrap justify-center">
                {allTeams?.[0].members.map((member, idx) => (
                  <div className="flex items-center gap-2 flex-col" key={idx}>
                    <img
                      src={DefaultUser}
                      className="w-12 rounded-full aspect-square "
                    />
                    <div className="flex flex-col gap-0">
                      <h3 className="text-[13px] font-semibold text-gray-600 dark:text-gray-300 text-center">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-200 text-[12px] text-center">
                        Exp: {member.exp} years
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <motion.div
            className={`transition-all duration-500 ${
              showAll ? "max-h-max opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {allTeams.map((group, index) => (
              <div className="flex mt-6 w-full flex-col" key={index}>
                <LineThrough
                  text={group.title}
                  className="text-gray-700 dark:text-gray-300 font-semibold"
                />
                <div className="mt-6 flex flex-row gap-8 flex-wrap justify-center">
                  {group.members.map((member, idx) => (
                    <div className="flex items-center gap-2 flex-col" key={idx}>
                      <img
                        src={DefaultUser}
                        className="w-12 rounded-full aspect-square "
                      />
                      <div className="flex flex-col gap-0">
                        <h3 className="text-[13px] font-semibold text-gray-600 dark:text-gray-300 text-center">
                          {member.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-200 text-[12px] text-center">
                          Exp: {member.exp} years
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <button
            onClick={toggleShowAll}
            className=" text-gray-700 font-semibold absolute bottom-4 right-[50%] translate-x-1/2 "
          >
            {showAll ? <></> : <ChevronDown />}
          </button>
        </div>
      </div>
    </section>
  );
}

const TeamMember = ({
  src,
  name,
  role,
}: {
  src: string;
  name: string;
  role: string;
}) => {
  return (
    <div className="flex flex-col gap-1 items-center min-w-max">
      <img
        src={src}
        alt={name}
        className="max-w-[140px] aspect-square object-cover rounded-full border border-[10px] shadow-md border-white"
      />
      <h3 className="font-semibold text-blue-950 dark:text-gray-100 text-[20px] mt-3">
        {name}
      </h3>
      <h4 className="font-medium text-gray-600 dark:text-gray-300 text-[14px]">
        {role}
      </h4>
    </div>
  );
};
