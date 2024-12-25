import { useState, useEffect } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import MobileNav from "./ui/MobileNav";
import Logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import SunSvg from "../assets/svg/sun.svg";
import MoonSvg from "../assets/svg/moon.svg";

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
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("class", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

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
            ? "bg-gray-100 dark:bg-dark-300/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="h-8 w-auto cursor-pointer" />
          </Link>
          <div className="hidden lg:flex lg:gap-x-8 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-[#0A45EC]"
                    : "dark:text-white text-gray-400 hover:text-blue-800"
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

            {externalLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium  text-gray-400 dark:text-white hover:text-blue-800 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-5">
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <button
                onClick={() => setIsDark((prev) => !prev)}
                className="hover:bg-gray-300 p-2 rounded-md transition-all ease-in-out duration-200"
              >
                <img
                  src={isDark ? SunSvg : MoonSvg}
                  alt={isDark ? "Light Mode" : "Dark Mode"}
                  className="h-5 w-5 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <MobileNav />
    </>
  );
}
