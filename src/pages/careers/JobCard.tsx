import { Briefcase, MapPin, Clock } from "lucide-react";
import type { Job } from "../../types/careers";

interface JobCardProps {
	job: Job;
}

export function JobCard({ job }: JobCardProps) {
	return (
		<div className="bg-blue-100 dark:bg-[#1E293B]  rounded-lg p-6 hover:dark:bg-dark-200 transition-colors">
			<div className="flex justify-between items-start">
				<div>
					<h3 className="text-xl font-semibold text-gray-800 dark:text-white">
						{job.title}
					</h3>
					<div className="flex gap-4 mt-2 text-gray-500 dark:text-gray-400">
						<span className="flex items-center gap-1">
							<Briefcase className="h-4 w-4" />
							{job.type}
						</span>
						<span className="flex items-center gap-1">
							<MapPin className="h-4 w-4" />
							{job.location}
						</span>
						<span className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							{job.postedAt}
						</span>
					</div>
				</div>
				<a
					href={`mailto: careers@dobaato.com?subject=${encodeURIComponent(
						job.title
					)}`}
					className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
				>
					Apply Now
				</a>
			</div>
			<p className="mt-4 text-gray-600 dark:text-gray-400">
				{job.description}
			</p>
		</div>
	);
}
