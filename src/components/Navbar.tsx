import { useState, useEffect } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import MobileNav from "./ui/MobileNav";
import Logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";
const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const externalLinks = [
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-dark-300/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link to={'/'}>
          <img
            src={Logo}
            alt="Logo"
            className="h-8 w-auto cursor-pointer"
          />
          </Link>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`text-sm font-semibold transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-[#0A45EC]"
                    : "text-white hover:text-primary-400"
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-600" />
            {externalLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-white hover:text-primary-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <MobileNav />
    </>
  );
}
