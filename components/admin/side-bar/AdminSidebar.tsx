"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/authHooks";
import { logoutUser } from "@/redux/slice/authSlice";
import { adminLink } from "@/types/admin-links";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logout, User } from "reicon-react";
import { toast } from "sonner";

const AdminSidebar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

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
    <div className="w-full border flex flex-col">
      {/* Logo */}
      <div className="h-12 border-b">
        <div className="flex items-center gap-2 ml-3">
          <span className="w-3 h-3 rounded-full bg-gray-700 border-2" />
          <h1 className="font-bold">KINETIC.PLAY</h1>
        </div>
        <div className="flex items-center justify-start ml-8">
          <p className="text-[8px]">OS // NODE TELEMETRY V4.2</p>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 mt-3">
        <div className="ml-3">
          <h1 className="font-semibold text-gray-600 text-xs">
            PLATFORM CONSOLE
          </h1>
        </div>
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
                <span className="font-semibold text-black">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Logout and Info */}
      <div className="bg-gray-200 flex items-center justify-center h-15 border">
        <div className="h-10 w-48 border bg-white flex items-center justify-center">
          <User size={24} className="bg-black text-white p-1 rounded-md" />
          <div className="flex flex-col justify-center p-1">
            <h1 className="text-[11px] font-bold">
              {user?.email.split("@", 1)}
            </h1>
            <p className="text-[9px]">ROOT ADMIN // SUPERUSER</p>
          </div>
          <Button
            className="border-none"
            variant="ghost"
            onClick={handleLogout}
          >
            <Logout size={24} className="text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
