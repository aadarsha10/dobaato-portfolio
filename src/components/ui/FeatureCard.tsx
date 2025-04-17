import { LucideIcon } from "lucide-react";
import { cn } from "../../utils";
import { Card, CardHeader, CardTitle, CardDescription } from "./Cards";

interface FeatureCardProps {
	title: string;
	description: string;
	icon: LucideIcon | React.ElementType;
	image?: boolean;
}

export default function FeatureCard({
	title,
	description,
	icon: Icon,
	image,
}: FeatureCardProps) {
	return (
		<Card className="bg-white dark:bg-[#1E293B] text-gray-900 dark:text-white hover:opacity-95 transition-all">
			<CardHeader>
				<div
					className={cn(
						"w-12 h-12 rounded-lg flex items-center justify-center mb-3",
						image
							? "bg-[#ebeced]"
							: "bg-gray-100 dark:bg-primary-500/10"
					)}
				>
					{image ? (
						<Icon />
					) : (
						<Icon className="h-6 w-6 text-primary dark:text-primary-400" />
					)}
				</div>

				<CardTitle className="text-lg font-semibold text-gray-700 dark:text-white">
					{title}
				</CardTitle>

				<CardDescription className="text-sm text-gray-500 dark:text-gray-400">
					{description}
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
