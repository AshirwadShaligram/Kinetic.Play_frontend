"use client";

import { Search2 } from "reicon-react";
import { Input } from "../ui/input";

const Search = () => {
  return (
    <div className="relative h-full flex items-center justify-center p-1 gap-2">
      <Search2 className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-6"
        placeholder="Search..."
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Search;
