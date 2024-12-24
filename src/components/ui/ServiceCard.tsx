import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function ServiceCard({ title, description, icon: Icon, color }: ServiceCardProps) {
  return (
    <div className="group relative p-6 rounded-lg bg-dark-100 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
      <div className="relative">
        <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-[#0A45EC]" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}