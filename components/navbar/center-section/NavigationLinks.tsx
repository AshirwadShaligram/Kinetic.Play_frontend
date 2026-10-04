"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { navLinks } from "@/types/nav-links";
import BrowseDropdown from "./BrowserDropdown";

const NavigationLinks = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {navLinks.map((link) => {
        if (link.megaMenu) {
          return <BrowseDropdown key={link.title} />;
        }

        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative
              text-sm
              font-medium
              transition-all
              duration-200
              hover:text-accent
              ${active ? "nav-link-active" : "text-muted-foreground"}
            `}
          >
            {link.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;
