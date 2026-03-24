interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
}

export default function FooterLinks({title, links}: FooterLinksProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    const isHashTarget = href.startsWith("#") || href.startsWith("/#");
    if (!isHashTarget || typeof window === "undefined") return;

    e.preventDefault();
    const hash = href.startsWith("/#") ? href.slice(1) : href;

    if (window.location.pathname !== "/") {
      sessionStorage.setItem("pendingSectionHash", hash);
      window.location.href = `/${hash}`;
      return;
    }

    if (hash === "#home") {
      window.scrollTo({top: 0, behavior: "smooth"});
      return;
    }

    document.querySelector(hash)?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4 font-domine">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={handleClick}
              className="text-gray-400 hover:text-[#0A45EC] transition-colors font-domine"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
