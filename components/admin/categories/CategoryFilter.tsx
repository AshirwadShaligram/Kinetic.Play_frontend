"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toggleCategoryService } from "@/services/admin/admin-category";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Pen, Search, Trash, X } from "reicon-react";
import { toast } from "sonner";

type VisibilityFilter = "all" | "Visible" | "Hidden";

export interface CategoryItem {
  id: string | number;
  title: string;
  description?: string;
  image: string;
  activeProducts: number;
  isVisible: boolean;
  cluster?: string;
  subCategories: { id: string | number; name: string }[];
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  clusters: string[];
}

const CategoryFilter = ({ categories, clusters }: CategoryFilterProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<VisibilityFilter>("all");
  const [cluster, setCluster] = useState("all");

  // Counts for the pills
  const total = categories.length;
  const visibleCount = useMemo(
    () => categories.filter((c) => c.isVisible).length,
    [categories],
  );
  const hiddenCount = total - visibleCount;

  // ---------------- APPLY FILTERS ----------------
  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();

    return categories.filter((cat) => {
      const matchesSearch =
        q === "" ||
        cat.title.toLowerCase().includes(q) ||
        (cat.description ?? "").toLowerCase().includes(q) ||
        cat.subCategories.some((sub) => sub.name.toLowerCase().includes(q));

      const matchesVisibility =
        visibility === "all" ||
        (visibility === "Visible" && cat.isVisible) ||
        (visibility === "Hidden" && !cat.isVisible);

      const matchesCluster = cluster === "all" || cat.cluster === cluster;

      return matchesSearch && matchesVisibility && matchesCluster;
    });
  }, [categories, search, visibility, cluster]);
  // -----------------------------------------------

  const handleCluster = (value: string | null) => setCluster(value ?? "all");

  const clearFilters = () => {
    setSearch("");
    setVisibility("all");
    setCluster("all");
  };

  const hasFilters =
    search.length > 0 || visibility !== "all" || cluster !== "all";

  const pillClass = (active: boolean) =>
    `rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  // ----------------------------------------------------------------
  // -----------------Toggle Category Visibility---------------------
  const toggleCategoryMutation = useMutation({
    mutationFn: (id: string) => toggleCategoryService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error) => {
      console.error("Failed to toggle category:", error);
      toast.error("Failed to update category visibility");
    },
  });
  // ----------------------------------------------------------------

  return (
    <div className="flex min-w-0 w-full flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories, slugs, tags or sub-nodes..."
            className="h-10 rounded-xl bg-surface-container-low pl-10 border-0"
          />

          {search && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSearch("")}
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
              onClick={() => setVisibility("all")}
              className={pillClass(visibility === "all")}
            >
              All ({total})
            </button>
            <button
              type="button"
              onClick={() => setVisibility("Visible")}
              className={pillClass(visibility === "Visible")}
            >
              Visible ({visibleCount})
            </button>
            <button
              type="button"
              onClick={() => setVisibility("Hidden")}
              className={pillClass(visibility === "Hidden")}
            >
              Hidden ({hiddenCount})
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
                <SelectItem value="all">All Clusters</SelectItem>
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

      {/* Filtered results */}
      <div className="min-w-0 w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border p-4">
          <div className="flex w-full flex-col space-x-4 p-1">
            <Table>
              <TableCaption>
                Showing {filteredCategories.length} of {total} categories
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex-1 text-[10px] font-semibold">
                    CATEGORY IMAGE
                  </TableHead>
                  <TableHead className="flex-1 text-[10px] font-semibold">
                    CATEGORY TITLE
                  </TableHead>
                  <TableHead className="flex-1 text-[10px] font-semibold">
                    CATEGORY DESCRIPTION
                  </TableHead>
                  <TableHead className="text-[10px] font-semibold">
                    ACTIVE SKUS / GMV
                  </TableHead>
                  <TableHead className="text-[10px] font-semibold">
                    SUBCATEGORIES PREVIEW
                  </TableHead>
                  <TableHead className="text-[10px] font-semibold">
                    STOREFRONT
                  </TableHead>
                  <TableHead className="text-[10px] font-semibold">
                    ACTIONS
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No categories match your filters.
                      {hasFilters && (
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={clearFilters}
                        >
                          Clear filters
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell>
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={200}
                          height={300}
                        />
                      </TableCell>
                      <TableCell className="font-semibold md:text-xl">
                        {cat.title}
                      </TableCell>
                      <TableCell>{cat.description}</TableCell>
                      <TableCell>{cat.activeProducts}</TableCell>
                      <TableCell>
                        {cat.subCategories.map((sub) => (
                          <div className="w-full" key={sub.id}>
                            <span className="m-1 inline-flex w-fit gap-2 rounded-2xl border bg-muted-foreground px-2 py-1 text-background">
                              {sub.name}
                            </span>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Switch
                          id={`category-visible-${cat.id}`}
                          checked={cat.isVisible}
                          onCheckedChange={() => {
                            toggleCategoryMutation.mutate(String(cat.id));
                          }}
                          disabled={toggleCategoryMutation.isPending}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger
                            className="mr-4 border-none"
                            onClick={() =>
                              router.push(
                                `/admin/categories/update-category/${cat.id}`,
                              )
                            }
                          >
                            <Pen size={24} />
                          </TooltipTrigger>
                          <TooltipContent>Edit Category</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger className="border-none text-destructive">
                            <Trash />
                          </TooltipTrigger>
                          <TooltipContent>Delete Category</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default CategoryFilter;
