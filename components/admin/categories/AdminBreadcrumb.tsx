"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const breadcrumbLabels: Record<string, string> = {
  admin: "Admin Control",
  categories: "Categories",
  create: "Create Category",
  edit: "Edit Category",
  user: "Users",
  sellers: "Sellers",
  deals: "Deals",
  settings: "Settings",
  finance: "Finance",
};

const AdminBreadcrumb = () => {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const adminIndex = segments.indexOf("admin");

  // ONly show the breadcrumb for admin routes
  if (adminIndex === -1) {
    return null;
  }

  const adminSegments = segments.slice(adminIndex);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {adminSegments.map((segment, index) => {
          const isLast = index === adminSegments.length - 1;
          const href = "/" + adminSegments.slice(0, index + 1).join("/");
          const label =
            breadcrumbLabels[segment] ??
            segment
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <React.Fragment key={`${segment}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;
