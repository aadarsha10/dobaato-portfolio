import { LucideIcon } from "lucide-react";

interface ExperienceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ExperienceCard({
  icon: Icon,
  title,
  description,
}: ExperienceCardProps) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-primary-1000 dark:text-primary-1000" />
      </div>
      <h3 className="text-xl font-medium text-gray-600 dark:text-white mb-2 font-domine">
        {title}
      </h3>
      <p className="text-gray-400 font-manrope">{description}</p>
    </div>
  );
}
