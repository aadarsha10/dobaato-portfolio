import { LucideIcon } from "lucide-react";
import { cn } from "../../utils";
import { CardContainer, CardBody, CardItem } from "./3d-card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon | React.ElementType;
  image?: boolean;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  image,
}: FeatureCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gradient-to-br from-gray-200 to-white dark:from-blue-900 dark:to-neutral-900 text-gray-900 dark:text-white border border-black/10 dark:border-white/20 w-auto sm:w-[30rem] rounded-xl p-6 group/card">
        <CardItem translateZ="60">
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center mb-3",
              image ? "bg-[#ebeced]" : "bg-gray-100 dark:bg-primary-500/10"
            )}
          >
            {image ? (
              <Icon />
            ) : (
              <Icon className="h-6 w-6 text-primary dark:text-primary-400" />
            )}
          </div>
        </CardItem>

        <CardItem
          translateZ="50"
          className="text-lg font-semibold text-gray-700 dark:text-white font-domine"
        >
          {title}
        </CardItem>

        <CardItem
          translateZ="40"
          as="p"
          className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-manrope"
        >
          {description}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
