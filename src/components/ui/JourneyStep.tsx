import { LucideIcon } from 'lucide-react';

interface JourneyStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
}

export default function JourneyStep({ icon: Icon, title, description, stepNumber }: JourneyStepProps) {
  return (
    <div className="relative text-center">
      <div className="w-16 h-16 rounded-full bg-dark-100 flex items-center justify-center mx-auto mb-4 relative z-10">
        <Icon className="h-8 w-8 text-[#0A45EC]" />
      </div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-[#0A45EC]">
        {stepNumber}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}