"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Search from "./Search";
import { User } from "@/types/authTypes";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks/authHooks";
import { logoutUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";

interface UserMenuProps {
  user: User | null;
  isLoggedIn: boolean;
}

const UserMenu = ({ user, isLoggedIn }: UserMenuProps) => {
  const isSeller = user?.role === "Seller";
  const isAdmin = user?.role === "Admin";
  const isCustomer = user?.role === "Customer";

  const dispatch = useAppDispatch();

  // Logout handler
  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();

      toast.success(result.message);
    } catch (err) {
      console.error("Logout error: ", err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="mr-3 flex h-full items-center justify-center">
      {!isLoggedIn ? (
        <div className="flex">
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="start">
            {/* Account */}
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>

              <DropdownMenuItem>{user?.email}</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/billing">Billing</Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {/* Mobile Search */}
            <DropdownMenuSeparator className="md:hidden" />

            <DropdownMenuGroup className="md:hidden">
              <Search />
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="md:hidden" />

            {/* Seller */}
            {isSeller && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/seller">Seller hub</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}

            {/* Admin */}
            {isAdmin && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href="/admin">Admin hub</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}

            {/* Guest */}
            {isCustomer && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="bg-foreground text-background mb-1">
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="bg-foreground text-background">
                    <Link href="/my-order">My Order</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}

            {/* Logout */}
            {isLoggedIn && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserMenu;
