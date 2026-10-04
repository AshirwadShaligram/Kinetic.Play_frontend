import Navbar from "@/components/navbar/Navbar";
import SaleWarning from "@/components/sales-warning/SaleWarning";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-10">
        <SaleWarning />
      </div>
      <div className="h-16">
        <Navbar />
      </div>
      <main>{children}</main>
    </>
  );
}
