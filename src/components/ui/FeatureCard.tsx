import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg bg-dark-100 hover:bg-dark-200 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#0A45EC]" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}