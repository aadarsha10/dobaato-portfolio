import { useState, useEffect, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Project } from "../../types";

export default function PortfolioProjects({
	projects,
}: {
	projects: Project[];
}) {
	const [active, setActive] = useState<Project | null>(null);
	const id = useId();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) =>
			e.key === "Escape" && setActive(null);
		document.body.style.overflow = active ? "hidden" : "auto";
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [active]);

	useOutsideClick(ref, () => setActive(null));

	return (
		<>
			{/* Overlay */}
			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/30 z-40"
					/>
				)}
			</AnimatePresence>

			{/* Modal */}
			<AnimatePresence>
				{active && (
					<div className="fixed inset-0 z-50 flex justify-center items-center p-4">
						<motion.div
							ref={ref}
							layoutId={`card-${active.title}-${id}`}
							className="max-w-lg w-full bg-white dark:bg-[#1E293B] rounded-xl overflow-hidden shadow-lg relative"
						>
							<motion.img
								layoutId={`image-${active.title}-${id}`}
								src={active.image}
								alt={active.title}
								className="w-full h-64 object-cover"
							/>
							<div className="p-6">
								<motion.h3
									layoutId={`title-${active.title}-${id}`}
									className="text-xl font-semibold text-gray-800 dark:text-white"
								>
									{active.title}
								</motion.h3>
								<motion.p
									layoutId={`description-${active.description}-${id}`}
									className="text-gray-600 dark:text-gray-400 mt-2"
								>
									{active.description}
								</motion.p>

								<div className="flex gap-4 mt-4">
									{active.demoUrl && (
										<a
											href={active.demoUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-blue-500 hover:underline"
										>
											<ExternalLink className="h-4 w-4" />
											Demo
										</a>
									)}
									{active.githubUrl && (
										<a
											href={active.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 text-gray-500 hover:underline"
										>
											<Github className="h-4 w-4" />
											GitHub
										</a>
									)}
								</div>
							</div>
							<button
								onClick={() => setActive(null)}
								className="absolute top-4 right-4 bg-white rounded-full p-1 shadow"
							>
								<CloseIcon />
							</button>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* Project Cards */}
			<ul className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 mt-6">
				{projects.map((project) => (
					<motion.li
						layoutId={`card-${project.title}-${id}`}
						key={project.title}
						onClick={() => setActive(project)}
						className="bg-white p-5 dark:bg-[#1E293B] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg border border-gray-200 dark:border-slate-500 transition-shadow"
					>
						<motion.div layoutId={`image-${project.title}-${id}`}>
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-52 rounded-lg object-cover transition-transform group-hover:scale-110"
							/>
						</motion.div>
						<div className="p-4">
							<motion.h3
								layoutId={`title-${project.title}-${id}`}
								className="text-lg font-medium text-gray-800 dark:text-white"
							>
								{project.title}
							</motion.h3>
							<motion.p
								layoutId={`description-${project.description}-${id}`}
								className="text-sm leading-loose text-gray-600 dark:text-gray-400"
							>
								{project.description.length > 150
									? `${project.description.substring(
											0,
											150
									  )}...`
									: project.description}
							</motion.p>
						</div>
					</motion.li>
				))}
			</ul>
		</>
	);
}

const CloseIcon = () => (
	<motion.svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		viewBox="0 0 24 24"
		className="h-5 w-5"
	>
		<path d="M18 6L6 18M6 6l12 12" />
	</motion.svg>
);
