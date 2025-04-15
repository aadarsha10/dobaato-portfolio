import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaHtml5, FaCss3Alt } from "react-icons/fa";
import {
	SiFramer,
	SiTypescript,
	SiJavascript,
	SiTailwindcss,
	SiExpress,
} from "react-icons/si";

const skills = [
	{ name: "React", icon: <FaReact /> },
	{ name: "Node.js", icon: <FaNodeJs /> },
	{ name: "AWS", icon: <FaAws /> },
	{ name: "Framer Motion", icon: <SiFramer /> },
	{ name: "HTML", icon: <FaHtml5 /> },
	{ name: "CSS", icon: <FaCss3Alt /> },
	{ name: "TypeScript", icon: <SiTypescript /> },
	{ name: "JavaScript", icon: <SiJavascript /> },
	{ name: "Tailwind CSS", icon: <SiTailwindcss /> },
	{ name: "Express.js", icon: <SiExpress /> },
];

export const MarqueeSkills = () => {
	return (
		<div className="relative overflow-hidden py-10 bg-white dark:bg-[#10172A] text-neutral-800 dark:text-white">
			{/* Smooth Fade Start */}
			<div
				className="absolute left-0 top-0 h-full w-40 z-10 pointer-events-none 
				bg-gradient-to-r from-white via-white/70 to-transparent 
				dark:from-[#10172A] dark:via-[#10172A]/70 dark:to-transparent"
			/>

			{/* Smooth Fade End */}
			<div
				className="absolute right-0 top-0 h-full w-40 z-10 pointer-events-none 
				bg-gradient-to-l from-white via-white/70 to-transparent 
				dark:from-[#10172A] dark:via-[#10172A]/70 dark:to-transparent"
			/>

			<motion.div
				className="flex space-x-20 text-lg font-semibold items-center h-20"
				animate={{ x: [0, -1000] }}
				transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
			>
				{[...skills, ...skills].map((skill, index) => (
					<div
						key={index}
						className="flex items-center space-x-3 px-8 text-2xl"
					>
						<span>{skill.icon}</span>
						<span>{skill.name}</span>
					</div>
				))}
			</motion.div>
		</div>
	);
};
