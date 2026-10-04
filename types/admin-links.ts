import {
  Category2,
  ChartBarTrendUp,
  ChartTrend,
  Gamepad2,
  Microchip,
  Setting2,
  Truck3,
  Tuning,
} from "reicon-react";

export const adminLink = [
  {
    title: "Overview",
    href: "/admin/",
    icon: ChartBarTrendUp,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Category2,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Microchip,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Gamepad2,
  },
  {
    title: "Sellers",
    href: "/admin/sellers",
    icon: Tuning,
  },
  {
    title: "Order & Dispatch",
    href: "/admin/order",
    icon: Truck3,
  },
  {
    title: "Analytics & Telemetry",
    href: "/admin/analytics",
    icon: ChartTrend,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Setting2,
  },
];
