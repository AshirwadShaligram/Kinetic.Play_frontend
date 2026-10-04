import {
  Computer,
  Diamonds,
  Gamepad2,
  Headphones2,
  Keyboard3,
  Mouse2Newicons,
} from "reicon-react";

export const navLinks = [
  {
    title: "Home",
    href: "/",
    mobile: true,
  },
  {
    title: "Consoles",
    href: "/products/consoles",
    mobile: true,
  },
  {
    title: "Gaming PCs",
    href: "/products/pcs",
    mobile: true,
  },
  {
    title: "Browse",
    href: "#",
    desktopOnly: true,
    megaMenu: true,
  },
];

export const browserItems = [
  {
    title: "Gaming Consoles",
    description: "PlayStation • Xbox • Nintendo",
    href: "/products/consoles",
    icon: Gamepad2,
  },
  {
    title: "Accessories",
    description: "Controllers & Headsets",
    href: "/products/accessories",
    icon: Headphones2,
  },
  {
    title: "Gaming PCs",
    description: "Desktop & Laptops",
    href: "/products/pcs",
    icon: Computer,
  },
  {
    title: "Keyboards",
    description: "Mechanical RGB",
    href: "/products/keyboards",
    icon: Keyboard3,
  },
  {
    title: "Mouse",
    description: "Wireless & Gaming",
    href: "/products/mouse",
    icon: Mouse2Newicons,
  },
  {
    title: "Premium Collection",
    description: "Exclusive Gear",
    href: "/products/premium",
    icon: Diamonds,
  },
];
