import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import ReduxProvider from "@/redux/providers/ReduxProvider";
import AuthProvider from "@/redux/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/redux/providers/QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "KINETIC.PLAY",
  description: "Gaming marketplace",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="h-full flex flex-col">
        <QueryProvider>
          <ReduxProvider>
            <AuthProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </AuthProvider>
          </ReduxProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
