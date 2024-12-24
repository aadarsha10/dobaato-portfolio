import FooterLinks from '../ui/FooterLinks';
import FooterSocial from '../ui/FooterSocial';
import FooterNewsletter from '../ui/FooterNewsletter';
import Logo from '../../assets/svg/logo.svg'
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-[#1B1D1E] dark:bg-dark-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/">
            <img src={Logo} alt="Logo" className="w-32 mb-4" />
            </Link>
            <p className="text-gray-400 mb-6">
              Transforming ideas into digital reality through innovative IT solutions and exceptional service delivery.
            </p>
            <FooterSocial />
          </div>
          
          <FooterLinks
            title="Company"
            links={[
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Team', href: '#team' },
              { label: 'Contact', href: '#contact' },
            ]}
          />
          
          <FooterLinks
            title="Resources"
            links={[
              { label: 'Blog', href: '/blog' },
              { label: 'Case Studies', href: '/case-studies' },
              { label: 'Documentation', href: '/docs' },
              { label: 'Privacy Policy', href: '/privacy' },
            ]}
          />
          
          <FooterNewsletter />
        </div>
        
        <div className="mt-12 pt-8 border-t border-dark-200">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Dobaato. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}