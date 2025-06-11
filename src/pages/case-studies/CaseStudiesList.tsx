import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../SupabaseClient";
import toast from "react-hot-toast";
import { CaseStudy } from "../../types";
import CaseStudyCard from "./CaseStudyCard";

export default function CaseStudiesList() {
	const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCaseStudies = async () => {
			try {
				const { data, error } = await supabase
					.from("CaseStudy")
					.select("*")
					.order('projectDate', { ascending: false });
				
				if (error) {
					toast.error("Error fetching case studies: " + error.message);
				} else {
					setCaseStudies(data || []);
				}
			} catch (error) {
				toast.error("Error fetching case studies");
				console.error('Error:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchCaseStudies();
	}, []);

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="animate-pulse">
							<div className="bg-gray-300 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
							<div className="space-y-2">
								<div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
								<div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (caseStudies.length === 0) {
		return (
			<div className="max-w-7xl mx-auto px-4 py-24 text-center">
				<div className="text-gray-500 dark:text-gray-400">
					<h3 className="text-xl font-semibold mb-2">No case studies yet</h3>
					<p>Check back later for new case studies!</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-12">
			<motion.div 
				className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				{caseStudies.map((caseStudy, index) => (
					<motion.div
						key={caseStudy.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.1 }}
					>
						<CaseStudyCard caseStudy={caseStudy} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
