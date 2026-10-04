"use client";

import CategoryCard from "@/components/admin/categories/CategoryCard";
import CategoryFilter from "@/components/admin/categories/CategoryFilter";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { getCategoriesService } from "@/services/admin/admin-category";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Clipboard, MoreH, Pen, Plus, Reorder } from "reicon-react";

const AdminCategoriesPage = () => {
  const router = useRouter();

  // -----------------GET ALL CATEGORIES---------------------
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });
  // --------------------------------------------------------
  // -------------- CATEGORY VARIABLE------------------------
  const rootCategory = categories.length;

  // --------------------------------------------------------

  useEffect(() => {
    console.log("All Categories: ", categories);
  }, [categories]);

  return (
    <div className="min-w-0 w-full p-2 flex flex-col gap-3">
      <div className="flex gap-2 items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Category Taxonomy & Hierarchy
          </h1>
          <div className="w-36 p-1 border text-[9px] bg-foreground text-background font-semibold rounded-xl">
            {rootCategory} ROOT // 24 SUBCATEGORIES
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
      <div>
        <CategoryFilter
          total={6}
          visible={5}
          hidden={1}
          clusters={["Hardware", "Peripherals", "Components", "Consoles"]}
          onSearchChange={(value) => {
            console.log("Search:", value);
          }}
          onVisibilityChange={(value) => {
            console.log("Visibility:", value);
          }}
          onClusterChange={(value) => {
            console.log("Cluster:", value);
          }}
        />
      </div>
      <div className="min-w-0 w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border p-4">
          <div className="flex w-full space-x-4 p-1 flex-col ">
            <Table>
              <TableCaption>A list of your categories</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex-1 text-[10px] font-semibold">
                    CATEGORY IMAGE
                  </TableHead>
                  <TableHead className="flex-1 text-[10px] font-semibold">
                    CATEGORY TITLE
                  </TableHead>
                  <TableHead className="flex-1 text-[10px] font-semibold">
                    CATEGORY Description
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
                {/* ------ Fetch All the categories ------ */}
                {categories?.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        width={300}
                        height={300}
                        objectFit="cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{cat.title}</TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell>{cat.activeProducts}</TableCell>
                    <TableCell>
                      {cat.subCategories.map((sub) => (
                        <div className="w-full" key={sub.id}>
                          <span className="inline-flex w-fit border rounded-2xl py-1 px-2">
                            {sub.name}
                          </span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Switch checked={cat.isVisible} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" className="border-none">
                        <Pen />
                      </Button>
                      <Button variant="ghost" className="border-none">
                        <Clipboard />
                      </Button>
                      <Button variant="ghost" className="border-none rotate-90">
                        <MoreH />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
