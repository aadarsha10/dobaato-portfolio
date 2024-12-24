import { Home, Info, Briefcase, FolderOpen, Phone, Building2, GraduationCap } from 'lucide-react';
import type { NavItem } from '../types/navigation';

export const mainNavItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Industries', href: '#industries' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const externalLinks: NavItem[] = [
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
];

export const mobileNavItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: Info, label: 'About', href: '#about' },
  { icon: Briefcase, label: 'Services', href: '#services' },
  { icon: Building2, label: 'Industries', href: '#industries' },
  { icon: FolderOpen, label: 'Portfolio', href: '#portfolio' },
  { icon: Phone, label: 'Contact', href: '#contact' },
  { icon: GraduationCap, label: 'Careers', href: '/careers' },
];