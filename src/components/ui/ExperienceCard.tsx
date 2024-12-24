import { LucideIcon } from 'lucide-react';

interface ExperienceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ExperienceCard({ icon: Icon, title, description }: ExperienceCardProps) {
  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-8 w-8 text-[#0A45EC]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}