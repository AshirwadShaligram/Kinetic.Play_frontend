import AuthNavbar from "@/components/auth/nav-bar/AuthNavbar";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <header className="h-12 shrink-0">
        <AuthNavbar />
      </header>

      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
