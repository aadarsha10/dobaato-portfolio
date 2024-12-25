import { useState, useEffect } from "react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import MobileNav from "./ui/MobileNav";
import { Link } from "react-router-dom";
import SunSvg from "../assets/svg/sun.svg";
import MoonSvg from "../assets/svg/moon.svg";
import { cn } from "../utils";

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
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();

      if (typeof window !== "undefined") {
        // Navigate to the homepage if not already on it
        if (window.location.pathname !== "/") {
          window.location.href = `/${href}`;
          // Delay smooth scrolling until the page has loaded
          window.addEventListener("load", () => {
            const targetElement = document.querySelector(href);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          });
          return;
        }

        // If already on the homepage, perform smooth scrolling
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        } else {
          // Retry in case the element is dynamically loaded
          const observer = new MutationObserver(() => {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
              observer.disconnect(); // Stop observing once found
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
      }
    }
  };
  const handleTheme = () => {
    if (typeof window !== "undefined") {
      if (window?.location?.pathname !== "/") return true;
    }
    return false;
  };
  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5F6FA] dark:bg-[#10172A] backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex  justify-between w-full">
            <Link
              to={"/"}
              className={cn(
                isScrolled && "text-gray-800 dark:text-white",
                handleTheme() && "text-gray-800 dark:text-white"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="153"
                height="48"
                viewBox="0 0 153 48"
                fill="none"
                className="w-28"
              >
                <g clip-path="url(#clip0_23_93)">
                  <path
                    d="M7.99037 34.7487C7.43809 35.7053 7.76237 36.9423 8.78389 37.3625C10.5867 38.1041 12.523 38.4897 14.4852 38.4904C17.1165 38.4913 19.7018 37.8 21.9815 36.4859C24.2611 35.1718 26.155 33.2812 27.473 31.0037C28.791 28.7263 29.4868 26.1423 29.4904 23.5109C29.494 20.8796 28.8053 18.2937 27.4936 16.0127C26.1818 13.7316 24.2931 11.8358 22.0171 10.5155C19.741 9.19511 17.1577 8.49674 14.5264 8.49042C12.5642 8.48571 10.6268 8.86597 8.82195 9.60265C7.79929 10.0201 7.47161 11.2562 8.02127 12.2143L8.991 13.9046C9.54066 14.8627 10.7612 15.1694 11.8165 14.8431C12.6859 14.5742 13.5945 14.4369 14.5121 14.4391C16.0999 14.4429 17.6587 14.8643 19.0321 15.6611C20.4056 16.4578 21.5452 17.6018 22.3368 18.9782C23.1283 20.3546 23.5438 21.915 23.5416 23.5028C23.5395 25.0906 23.1197 26.6498 22.3244 28.0241C21.5291 29.3983 20.3862 30.5392 19.0106 31.3321C17.635 32.1251 16.0751 32.5422 14.4873 32.5417C13.5697 32.5413 12.6614 32.4015 11.7928 32.1303C10.7384 31.8011 9.51701 32.1045 8.96473 33.0611L7.99037 34.7487Z"
                    fill="currentColor"
                  />
                  <path
                    d="M41.325 32.975C43.775 32.975 45.7 31.05 45.7 28.425C45.7 25.8 43.775 23.875 41.325 23.875C38.875 23.875 36.95 25.8 36.95 28.425C36.95 31.05 38.875 32.975 41.325 32.975ZM32.225 28.425C32.225 23.525 36.25 19.5 41.325 19.5C46.4 19.5 50.425 23.525 50.425 28.425C50.425 33.325 46.4 37.35 41.325 37.35C36.25 37.35 32.225 33.325 32.225 28.425ZM54.0945 37V12.5H58.8195V22.3H58.9945C59.3445 21.775 59.7995 21.32 60.3245 20.9C61.2695 20.2 62.5645 19.5 64.4195 19.5C68.4795 19.5 72.1195 23.21 72.1195 28.425C72.1195 33.675 68.4795 37.35 64.4195 37.35C62.5645 37.35 61.2695 36.65 60.3245 35.95C59.7995 35.53 59.3445 35.075 58.9945 34.55H58.8195V37H54.0945ZM63.0195 32.975C65.4695 32.975 67.3945 31.05 67.3945 28.425C67.3945 25.8 65.4695 23.875 63.0195 23.875C60.5695 23.875 58.6445 25.8 58.6445 28.425C58.6445 31.05 60.5695 32.975 63.0195 32.975ZM85.2486 37V34.9H85.0736C84.6886 35.355 84.2686 35.775 83.7786 36.125C82.9386 36.79 81.6436 37.35 79.9986 37.35C76.8486 37.35 74.7486 35.25 74.7486 32.45C74.7486 29.65 76.6386 27.515 79.8236 26.955L85.2486 25.975C85.0736 24.75 84.0586 23.7 82.2736 23.7C81.0486 23.7 80.1036 24.155 79.4386 24.68C79.0536 24.96 78.7036 25.275 78.4236 25.625L75.6236 22.825C76.1136 22.23 76.7086 21.67 77.4086 21.18C78.6336 20.34 80.3486 19.5 82.6236 19.5C86.9986 19.5 89.9736 22.51 89.9736 26.325V37H85.2486ZM85.2486 29.65V29.3L81.3986 30C80.1736 30.245 79.4736 30.875 79.4736 31.75C79.4736 32.835 80.1736 33.5 81.5736 33.5C83.6736 33.5 85.2486 31.925 85.2486 29.65ZM104.15 37V34.9H103.975C103.59 35.355 103.17 35.775 102.68 36.125C101.84 36.79 100.545 37.35 98.9 37.35C95.75 37.35 93.65 35.25 93.65 32.45C93.65 29.65 95.54 27.515 98.725 26.955L104.15 25.975C103.975 24.75 102.96 23.7 101.175 23.7C99.95 23.7 99.005 24.155 98.34 24.68C97.955 24.96 97.605 25.275 97.325 25.625L94.525 22.825C95.015 22.23 95.61 21.67 96.31 21.18C97.535 20.34 99.25 19.5 101.525 19.5C105.9 19.5 108.875 22.51 108.875 26.325V37H104.15ZM104.15 29.65V29.3L100.3 30C99.075 30.245 98.375 30.875 98.375 31.75C98.375 32.835 99.075 33.5 100.475 33.5C102.575 33.5 104.15 31.925 104.15 29.65ZM114.485 31.05V24.575H111.51V20.2H113.085C114.38 20.2 115.01 19.5 115.01 18.1V14.95H119.21V20.2H123.06V24.575H119.21V30.35C119.21 31.925 120.085 32.8 121.485 32.8C122.01 32.8 122.465 32.73 122.85 32.625C123.06 32.59 123.235 32.52 123.41 32.45V36.825C123.13 36.93 122.815 37 122.5 37.105C121.94 37.245 121.135 37.35 120.26 37.35C116.76 37.35 114.485 35.11 114.485 31.05ZM134.806 32.975C137.256 32.975 139.181 31.05 139.181 28.425C139.181 25.8 137.256 23.875 134.806 23.875C132.356 23.875 130.431 25.8 130.431 28.425C130.431 31.05 132.356 32.975 134.806 32.975ZM125.706 28.425C125.706 23.525 129.731 19.5 134.806 19.5C139.881 19.5 143.906 23.525 143.906 28.425C143.906 33.325 139.881 37.35 134.806 37.35C129.731 37.35 125.706 33.325 125.706 28.425Z"
                    fill="currentColor"
                  />
                  <circle cx="14.5" cy="23.5" r="4.5" fill="#0945EC" />
                </g>
                <defs>
                  <clipPath id="clip0_23_93">
                    <rect width="153" height="48" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="hover:bg-gray-300 p-2 rounded-md transition-all ease-in-out duration-200 block md:hidden"
            >
              <img
                src={isDark ? SunSvg : MoonSvg}
                alt={isDark ? "Light Mode" : "Dark Mode"}
                className="h-4 w-4 cursor-pointer"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8 items-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-[#0A45EC]"
                    : cn(
                        " hover:text-blue-800",
                        isScrolled && " text-gray-400 dark:text-white",
                        handleTheme() && "text-gray-400"
                      )
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
                className={`text-sm font-medium  hover:text-blue-800 transition-colors ${
                  (isScrolled || handleTheme()) &&
                  " text-gray-400 dark:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-5">
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <button
                onClick={() => setIsDark((prev) => !prev)}
                className="hover:bg-gray-300 p-2 rounded-md transition-all ease-in-out duration-200 block"
              >
                {!isDark ? (
                  <svg
                    id="theme-toggle-dark-icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={(isScrolled || handleTheme()) ? "#9BA3AF" : "white"}
                    className="w-4 h-4"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
                  </svg>
                ) : (
                  <svg
                    id="theme-toggle-light-icon"
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
      <MobileNav />
    </>
  );
}
