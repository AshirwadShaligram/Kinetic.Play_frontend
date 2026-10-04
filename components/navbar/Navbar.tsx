"use client";

import { useAppSelector } from "@/redux/hooks/authHooks";
import CartBtn from "./CartBtn";
import NavigationLinks from "./center-section/NavigationLinks";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  return (
    <div className="h-full flex items-center justify-between">
      <div className="h-full">
        <Logo />
      </div>
      <div className="hidden h-full md:flex mx-auto">
        <NavigationLinks />
      </div>
      <div className=" hidden h-full md:flex">
        <Search />
      </div>
      <div className="h-full flex gap-2">
        {isLoggedIn && <CartBtn />}
        <UserMenu user={user} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default Navbar;
