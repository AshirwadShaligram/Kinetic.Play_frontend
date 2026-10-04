"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { browserItems } from "@/types/nav-links";

const BrowseDropdown = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="
              bg-transparent
              text-sm
              font-medium
              text-zinc-600
              hover:bg-transparent
              hover:text-accent
            "
          >
            Browse
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-190 p-5">
              {/* Featured Banner */}
              <div
                className="
                  mb-5
                  overflow-hidden
                  rounded-2xl
                  bg-linear-to-br
                  from-accent
                  to-amber-600
                  p-6
                  text-white
                "
              >
                <h2 className="text-xl font-bold text-white">
                  Summer Gaming Sale
                </h2>

                <p className="mt-2 max-w-md text-sm text-white/80">
                  Save up to 40% on consoles, accessories and gaming
                  peripherals.
                </p>

                <Button
                  className="
                    mt-5
                    bg-white
                    text-accent
                    hover:bg-amber-50
                    hover:text-amber-700
                  "
                >
                  Shop Now
                </Button>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 gap-3">
                {browserItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="
                        group
                        flex
                        gap-4
                        rounded-xl
                        border
                        border-transparent
                        p-4
                        transition-all
                        duration-200
                        hover:border-accent/30
                        hover:bg-accent/10
                      "
                    >
                      <div
                        className="
                          rounded-xl
                          bg-accent/15
                          p-3
                          text-accent
                          transition-all
                          duration-200
                          group-hover:scale-110
                          group-hover:bg-accent
                          group-hover:text-white
                        "
                      >
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3
                          className="
                            font-semibold
                            text-zinc-800
                            transition-colors
                            group-hover:text-accent
                          "
                        >
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-500">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default BrowseDropdown;
