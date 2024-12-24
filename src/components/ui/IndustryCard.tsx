import { LucideIcon } from 'lucide-react';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function IndustryCard({ icon: Icon, title, description }: IndustryCardProps) {
  return (
    <div className="p-6 rounded-lg bg-green-1000 dark:bg-dark-100 hover:dark:bg-dark-200 hover:opacity-90 overflow-hidden">
      <div className="w-12 h-12 rounded-lg bg-gray-500/20 dark:bg-primary-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-gray-300 dark:text-primary-1000" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 dark:text-gray-400">{description}</p>
    </div>
  );
}