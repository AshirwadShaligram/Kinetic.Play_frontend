"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Search, X } from "reicon-react";

type VisibilityFilter = "all" | "Visible" | "Hidden";

interface CategoryFilterProps {
  total: number;
  visible: number;
  hidden: number;
  clusters: string[];
  onSearchChange?: (value: string) => void;
  onVisibilityChange?: (value: VisibilityFilter) => void;
  onClusterChange?: (value: string) => void;
}

const CategoryFilter = ({
  total,
  visible,
  hidden,
  clusters,
  onSearchChange,
  onVisibilityChange,
  onClusterChange,
}: CategoryFilterProps) => {
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<VisibilityFilter>("all");
  const [cluster, setCluster] = useState("all");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleVisibility = (value: VisibilityFilter) => {
    setVisibility(value);
    onVisibilityChange?.(value);
  };

  const handleCluster = (value: string | null) => {
    const newValue = value ?? "all";

    setCluster(newValue);
    onClusterChange?.(newValue);
  };

  const clearFilters = () => {
    setSearch("");
    setVisibility("all");
    setCluster("all");

    onSearchChange?.("");
    onVisibilityChange?.("all");
    onClusterChange?.("all");
  };

  const hasFilters =
    search.length > 0 || visibility !== "all" || cluster !== "all";

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search categories, slugs, tags or sun-nodes..."
          className="h-10 rounded-xl bg-surface-container-low pl-10 border-0"
        />

        {search && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground border-0"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Visibility */}
        <div className="flex w-fit items-center rounded-full bg-surface-container-low p-1">
          <button
            type="button"
            onClick={() => handleVisibility("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${visibility === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            All ({total})
          </button>
          <button
            type="button"
            onClick={() => handleVisibility("Visible")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${visibility === "Visible" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Visible ({visible})
          </button>
          <button
            type="button"
            onClick={() => handleVisibility("Hidden")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${visibility === "Hidden" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Hidden ({hidden})
          </button>
        </div>
        {/* Cluster */}
        <div className="flex items-center gap-2">
          <span className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:block">
            Cluster
          </span>
          <Select value={cluster} onValueChange={handleCluster}>
            <SelectTrigger className="h-9 w-full rounded-full bg-surface-container-low border-0 sm:w-44">
              <SelectValue placeholder="Select cluster" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all"> All Clusters </SelectItem>
              {clusters.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="shrink-0"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
