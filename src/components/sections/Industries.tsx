import { ShoppingBag, Heart, Building2, Plane, Shield, Router } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import IndustryCard from '../ui/IndustryCard';

const industries = [
  {
    icon: ShoppingBag,
    title: 'Retail',
    description: 'Digital transformation solutions for modern retail operations',
  },
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'Secure and compliant healthcare technology solutions',
  },
  {
    icon: Building2,
    title: 'Finance',
    description: 'Advanced fintech solutions for banking and financial institutions',
  },
  {
    icon: Plane,
    title: 'Travel',
    description: 'Innovative travel and hospitality management systems',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Robust security solutions for enterprise protection',
  },
  {
    icon: Router,
    title: 'Network Hardware',
    description: 'Advanced networking and infrastructure solutions',
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-white dark:bg-[#10172A]">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Industries We Serve"
          subtitle="Specialized Solutions for Diverse Sectors"
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.title} {...industry} />
          ))}
        </div>
      </div>
    </section>
  );
}