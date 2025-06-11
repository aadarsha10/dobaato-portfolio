import { motion } from 'framer-motion';
import { Home, Info, Briefcase, FolderOpen, Phone, Building2, GraduationCap, FileText } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Info, label: 'About', href: '#about' },
  { icon: Briefcase, label: 'Services', href: '#services' },
  { icon: FolderOpen, label: 'Portfolio', href: '#portfolio' },
  { icon: Building2, label: 'Industries', href: '#industries' },
  { icon: Phone, label: 'Contact', href: '#contact' },
  { icon: GraduationCap, label: 'Careers', href: '/careers' },
  { icon: FileText, label: 'Case Studies', href: '/case-studies' },
];

export default function MobileNav() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1E293B] /95 backdrop-blur-sm border-t border-dark-200 z-50"
    >
      <div className="flex justify-around py-2 overflow-auto">
        {navItems.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            onClick={handleClick}
            className="flex flex-col items-center p-2 text-gray-400 hover:text-[#0A45EC]"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs mt-1">{label}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}