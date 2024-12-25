import { LucideIcon } from "lucide-react";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
}

export default function HighlightCard({
  icon: Icon,
  title,
  items,
}: HighlightCardProps) {
  return (
    <div className="p-6 rounded-lg bg-green-1000 dark:bg-[#1E293B]  hover:dark:bg-dark-200 hover:opacity-90 transition-colors">
      <div className="w-12 h-12 rounded-lg  bg-gray-50/20 dark:bg-primary-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-gray-50 dark:text-primary-1000" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500/20 dark:bg-primary-1000 mt-2" />
            <span className="text-gray-200 dark:text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
