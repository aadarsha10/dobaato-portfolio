import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Cards";

type HighlightCardProps = {
  title: string;
  items: string[];
  icon: React.ElementType;
};

export default function HighlightCard({
  title,
  items,
  icon: Icon,
}: HighlightCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-200 to-white dark:from-blue-900 dark:to-neutral-900 text-gray-900 dark:text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-primary-500 dark:text-blue-400" />
          <CardTitle className="text-gray-900 dark:text-white font-domine">
            {title}
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground dark:text-gray-400 font-manrope">
          {items.length} key points
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 font-manrope">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground dark:text-gray-400 font-manrope">
          Explore more
        </span>
      </CardFooter>
    </Card>
  );
}
