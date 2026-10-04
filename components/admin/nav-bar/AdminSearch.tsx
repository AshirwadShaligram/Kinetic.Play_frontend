import { Input } from "@/components/ui/input";
import React from "react";
import { Search } from "reicon-react";

const AdminSearch = () => {
  return (
    <div className="relative flex items-center">
      <Search className="absolute top-2 left-1 size-4" />
      <Input className="pl-6 w-52 font-medium text-gray-500 text-sm active:border-0" />
    </div>
  );
};

export default AdminSearch;
