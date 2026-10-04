"use client";

import { useAppSelector } from "@/redux/hooks/authHooks";
import AdminLogo from "./AdminLogo";
import AdminSearch from "./AdminSearch";
import AdminNotification from "./AdminNotification";
import AdminInfo from "./AdminInfo";

const AdminNavbar = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  return (
    <div className="h-full border-b flex justify-between items-center p-3">
      <div className="h-full flex items-center">
        <AdminLogo user={user} />
      </div>

      <div className=" hidden h-full md:flex items-center justify-center">
        <AdminSearch />
      </div>
      <div className="h-full flex gap-2 items-center">
        <AdminNotification />
        <AdminInfo user={user} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
};

export default AdminNavbar;
