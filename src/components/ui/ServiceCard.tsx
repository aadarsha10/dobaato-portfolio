import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  color,
}: ServiceCardProps) {
  return (
    <div className="group relative p-6  h-[280px] w-full bg-green-1000 dark:bg-[#1E293B] hover:dark:bg-dark-200 hover:opacity-90 overflow-hidden transition-all duration-300 rounded-xl">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />
      <div className="relative flex flex-col h-full">
        <div className="w-14 h-14 rounded-lg bg-gray-50/20 dark:bg-primary-500/10 flex items-center justify-center mb-5">
          <Icon className="h-7 w-7 text-gray-50 dark:text-primary-1000" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-200  dark:text-gray-400 line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
}
