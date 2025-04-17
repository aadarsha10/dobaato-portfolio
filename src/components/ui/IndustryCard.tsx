import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./Cards";

interface IndustryCardProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

export default function IndustryCard({
	icon: Icon,
	title,
	description,
}: IndustryCardProps) {
	return (
		<Card className="bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white hover:opacity-95 transition-all">
			<CardHeader>
				<div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-primary-500/10 flex items-center justify-center mb-2">
					<Icon className="h-6 w-6 text-primary dark:text-primary-400" />
				</div>
				<CardTitle className="text-primary-1000 dark:text-white text-lg font-semibold">
					{title}
				</CardTitle>
				<CardDescription className="text-sm text-gray-500 dark:text-gray-400">
					{description}
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
