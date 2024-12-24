import { LucideIcon } from 'lucide-react';

interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function IndustryCard({ icon: Icon, title, description }: IndustryCardProps) {
  return (
    <div className="p-6 rounded-lg bg-dark-100 hover:bg-dark-300 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
        <Icon className="h-6 w-6 text-[#0A45EC]" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}