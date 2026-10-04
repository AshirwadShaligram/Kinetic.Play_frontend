"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { navLinks } from "@/types/nav-links";

const MobileNavigationLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col py-4">
      {navLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.title}
            href={link.href}
            className={`
              group
              relative
              flex
              items-center
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-200
              ${active ? "text-accent" : "text-zinc-600 hover:text-accent"}
            `}
          >
            {/* Active indicator */}
            <span
              className={`
                absolute
                left-0
                h-5
                w-0.5
                rounded-full
                bg-accent
                transition-all
                duration-200
                ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
              `}
            />

            <span>{link.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNavigationLinks;
