import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, User } from "lucide-react";
import { CaseStudy } from "../../types";

interface CaseStudyCardProps {
	caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long'
			});
		} catch {
			return dateString;
		}
	};

	return (
		<motion.div
			className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-200"
		>
			{/* Background Image */}
			<div className="relative h-64 overflow-hidden">
				<div 
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-200 group-hover:scale-105"
					style={{ backgroundImage: `url(${caseStudy.imageUrl})` }}
				/>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
				
				{/* Project URL Link */}
				{caseStudy.projectUrl && (
					<a
						href={caseStudy.projectUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
						onClick={(e) => e.stopPropagation()}
					>
						<ExternalLink className="h-4 w-4" />
					</a>
				)}
				
				{/* Content Overlay */}
				<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
					<h3 className="text-xl font-bold mb-2 font-domine">
						{caseStudy.title}
					</h3>
					<p className="text-sm text-gray-200 mb-3 line-clamp-2 font-manrope">
						{caseStudy.description}
					</p>
					
					{/* Meta Information */}
					<div className="flex items-center justify-between text-xs text-gray-300 mb-4">
						{caseStudy.clientName && (
							<div className="flex items-center gap-1">
								<User className="h-3 w-3" />
								<span>{caseStudy.clientName}</span>
							</div>
						)}
						{caseStudy.projectDate && (
							<div className="flex items-center gap-1">
								<Calendar className="h-3 w-3" />
								<span>{formatDate(caseStudy.projectDate)}</span>
							</div>
						)}
					</div>
					
					{/* Technologies */}
					{caseStudy.technologies && caseStudy.technologies.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-4">
							{caseStudy.technologies.slice(0, 3).map((tech, index) => (
								<span
									key={index}
									className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
								>
									{tech}
								</span>
							))}
							{caseStudy.technologies.length > 3 && (
								<span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
									+{caseStudy.technologies.length - 3} more
								</span>
							)}
						</div>
					)}
					
					{/* View More Button */}
					<Link
						to={`/case-studies/${caseStudy.slug}`}
						className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A45EC] hover:bg-[#0936C4] text-white text-sm font-medium rounded-lg transition-colors duration-200 group"
					>
						<span>View Details</span>
						<motion.svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							initial={{ x: 0 }}
							whileHover={{ x: 3 }}
							transition={{ duration: 0.2 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</motion.svg>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}
