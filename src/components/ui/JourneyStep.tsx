import { LucideIcon } from "lucide-react";

interface JourneyStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
}

export default function JourneyStep({
  icon: Icon,
  title,
  description,
}: JourneyStepProps) {
  return (
    <div className="relative text-center">
      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-[#1D2C4D] flex items-center justify-center mx-auto mb-4 z-20 ">
        <Icon className="h-8 w-8 text-primary-1000 dark:text-primary-1000 z-30" />
      </div>

      <h3 className="text-lg font-medium  text-gray-600 dark:text-white mb-2 font-domine">
        {title}
      </h3>
      <p className="text-gray-400 font-manrope">{description}</p>
    </div>
  );
}
