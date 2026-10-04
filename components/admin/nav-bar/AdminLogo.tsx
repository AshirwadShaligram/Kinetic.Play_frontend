"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppDispatch } from "@/redux/hooks/authHooks";
import { logoutUser } from "@/redux/slice/authSlice";
import { adminLink } from "@/types/admin-links";
import { User } from "@/types/authTypes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logout, Menu, User2 } from "reicon-react";
import { toast } from "sonner";

interface AdminLogoProps {
  user: User | null;
}

const AdminLogo = ({ user }: AdminLogoProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Logout handler
  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      router.replace("/");
      toast.success(result.message);
    } catch (err) {
      console.error("Logout error: ", err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex md:hidden p-1">
        <Drawer swipeDirection="left">
          <DrawerTrigger>
            <Menu />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="border-b">
                <div className="h-12">
                  <div className="flex items-center gap-2 ml-3">
                    <span className="w-3 h-3 rounded-full bg-gray-700 border-2" />
                    <h1 className="font-bold">KINETIC.PLAY</h1>
                  </div>
                  <div className="flex items-center justify-start ml-8">
                    <p className="text-[8px]">OS // NODE TELEMETRY V4.2</p>
                  </div>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            {/* Nav links */}
            <div className="ml-3">
              {adminLink.map((link) => {
                const active = pathname === link.href;
                const Logo = link.icon;

                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`
                          group
                          relative
                          flex
                          items-center
            
                          py-3
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          gap-2
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

                    <Logo className="ml-2 size-5" />
                    <span className="font-semibold text-black">
                      {link.title}
                    </span>
                  </Link>
                );
              })}
            </div>
            {/* _________ */}
            <DrawerFooter className="bg-gray-300 h-24 flex items-center justify-center">
              <div className="border h-14 w-72 rounded-xl bg-white flex items-center gap-2 p-2 justify-between">
                <User2
                  size={32}
                  className="bg-black text-white p-1 rounded-md"
                />
                <div className="flex flex-col justify-center p-1">
                  <h1 className="text-xl font-bold">
                    User 1{" "}
                    {/*-------------------------------------Temp Data to display on mobile------------------------------   */}
                    {user?.email.split("@", 1)}
                  </h1>
                  <p className="text-[9px]">ROOT ADMIN // SUPERUSER</p>
                </div>
                <Button
                  className="border-none"
                  variant="ghost"
                  onClick={handleLogout}
                >
                  <Logout className="text-destructive size-6" />
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="font-bold">
        <h1>Kinetic Admin</h1>
      </div>
    </div>
  );
};

export default AdminLogo;
