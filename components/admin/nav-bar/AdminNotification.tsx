import { Bell } from "reicon-react";

const AdminNotification = () => {
  return (
    <div className="relative">
      <span className="absolute right-0 border-2 w-3 h-3 bg-red-600 rounded-full" />
      <Bell />
    </div>
  );
};

export default AdminNotification;
