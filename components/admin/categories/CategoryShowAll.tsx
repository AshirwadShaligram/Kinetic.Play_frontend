import { Edit, Ellipsis, FolderTree, Package } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Custom Liquid Rigs",
    slug: "custom-liquid-rigs",
    skuCount: 44,
    gmv: "₹1.82 Cr",
    subcategories: [
      { name: "Hardline PETG", skuCount: 18 },
      { name: "Bench Rigs", skuCount: 8 },
      { name: "AIO SFF", skuCount: 14 },
    ],
    visible: true,
  },
  {
    id: 2,
    name: "Gaming Peripherals",
    slug: "gaming-peripherals",
    skuCount: 128,
    gmv: "₹86.40 L",
    subcategories: [
      { name: "Gaming Mice", skuCount: 42 },
      { name: "Mechanical Keyboards", skuCount: 38 },
      { name: "Gaming Headsets", skuCount: 31 },
    ],
    visible: true,
  },
  {
    id: 3,
    name: "PC Components",
    slug: "pc-components",
    skuCount: 96,
    gmv: "₹2.14 Cr",
    subcategories: [
      { name: "Graphics Cards", skuCount: 28 },
      { name: "Processors", skuCount: 22 },
      { name: "Motherboards", skuCount: 19 },
    ],
    visible: false,
  },
];

const CategoryShowAll = () => {
  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-xl">
      <Table aria-label="categories" className="min-w-200">
        <TableHeader className="bg-surface-container-low">
          <TableRow>
            <TableHead className="w-[320px] text-[10px] font-semibold uppercase tracking-wider">
              Category Taxonomy{" "}
            </TableHead>
            <TableHead className="w-45 text-[10px] font-semibold uppercase tracking-wider">
              Active SKUs / GMV
            </TableHead>
            <TableHead className="w-75 text-[10px] font-semibold uppercase tracking-wider">
              Subcategories Preview
            </TableHead>
            <TableHead className="w-32.5 text-center text-[10px] font-semibold uppercase tracking-wider">
              Storefront
            </TableHead>
            <TableHead className="w-37.5 text-right text-[10px] font-semibold uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category.id}
              className="hover:bg-surface-container-low/50"
            >
              {/* Category */}
              <TableCell className="align-middle">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FolderTree className="size-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">
                        {category.name}
                      </span>

                      <span className="shrink-0 rounded-md bg-surface-container-high px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        ROOT
                      </span>
                    </div>

                    <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                      /taxonomy/{category.slug}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* SKUs / GMV */}
              <TableCell>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-lg font-bold">
                    {category.skuCount}
                  </span>

                  <span className="text-xs text-muted-foreground">SKUs</span>
                </div>

                <span className="font-mono text-xs text-muted-foreground">
                  {category.gmv} GMV
                </span>
              </TableCell>

              {/* Subcategories */}
              <TableCell>
                <div className="flex max-w-70 flex-wrap gap-1.5">
                  {category.subcategories.map((subcategory) => (
                    <span
                      key={subcategory.name}
                      className="rounded-full bg-surface-container-high px-2 py-1 text-xs whitespace-nowrap"
                    >
                      {subcategory.name} ({subcategory.skuCount})
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* Storefront */}
              <TableCell>
                <div className="flex flex-col items-center justify-center gap-1">
                  <Switch
                    checked={category.visible}
                    aria-label={`Toggle ${category.name} visibility`}
                  />

                  <span
                    className={`font-mono text-[10px] font-medium ${
                      category.visible
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {category.visible ? "PUBLIC NAV" : "HIDDEN"}
                  </span>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    title="Edit Category"
                  >
                    <Edit className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    title="Manage SKUs"
                  >
                    <Package className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    title="Category Options"
                  >
                    <Ellipsis className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryShowAll;
