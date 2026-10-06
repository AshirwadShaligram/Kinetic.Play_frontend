"use client";

import CategoryCard from "@/components/admin/categories/CategoryCard";
import CategoryFilter from "@/components/admin/categories/CategoryFilter";
import { Button } from "@/components/ui/button";
import { getCategoriesService } from "@/services/admin/admin-category";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Plus, Reorder } from "reicon-react";

const AdminCategoriesPage = () => {
  const router = useRouter();

  // -----------------GET ALL CATEGORIES---------------------
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });
  // --------------------------------------------------------

  const { rootCategoryCount, subCategoryCount } = useMemo(
    () => ({
      rootCategoryCount: categories.length,
      subCategoryCount: categories.reduce<number>(
        (s, c) => s + c.subCategories.length,
        0,
      ),
    }),
    [categories],
  );

  return (
    <div className="min-w-0 w-full p-2 flex flex-col gap-3">
      <div className="flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Category Taxonomy & Hierarchy
          </h1>
          <div className="w-36 p-1 border text-[9px] bg-foreground text-background font-semibold rounded-xl">
            {rootCategoryCount} ROOT // {subCategoryCount} SUBCATEGORIES
          </div>
          <p className="text-[10px] text-gray-600">
            Manage global catalog structure, nested subcategories, storefront
            visibility. SKU allocations and taxonomy metadata across
            high-performance clusters.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          <Button className="text-[10px] font-bold" variant="ghost">
            <Reorder />
            Reorder Hierarchy
          </Button>
          <Button
            onClick={() => router.push("/admin/categories/create-category")}
            className="text-[10px] font-bold"
          >
            <Plus />
            Create Category
          </Button>
        </div>
      </div>

      {/* Category cards summary */}
      <div>
        <CategoryCard categories={categories} />
      </div>

      {/* Filters + filtered table (ScrollArea) */}
      <CategoryFilter
        categories={categories}
        clusters={["Hardware", "Peripherals", "Components", "Consoles"]}
      />
    </div>
  );
};

export default AdminCategoriesPage;
