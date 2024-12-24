import { LucideIcon } from 'lucide-react';

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
}

export default function HighlightCard({ icon: Icon, title, items }: HighlightCardProps) {
  return (
    <div className="p-6 rounded-lg bg-dark-100 hover:bg-dark-200 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#0A45EC]" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2" />
            <span className="text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}