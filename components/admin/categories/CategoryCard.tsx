"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CategoryResponse } from "@/types/category-types";
import { useMemo } from "react";
import { Bezier2, Eye, Shop3, Speedometer } from "reicon-react";

interface CategoryCardProps {
  categories: CategoryResponse[];
}

const CategoryCard = ({ categories }: CategoryCardProps) => {
  const {
    rootCategoryCount,
    subCategoryCount,
    visibleCategories,
    hiddenCategories,
    totalActiveProducts,
  } = useMemo(
    () => ({
      rootCategoryCount: categories.length,
      subCategoryCount: categories.reduce<number>(
        (s, c) => s + c.subCategories.length,
        0,
      ),
      visibleCategories: categories.filter((c) => c.isVisible),
      hiddenCategories: categories.filter((c) => !c.isVisible),
      totalActiveProducts: categories.reduce<number>(
        (s, c) => s + c.activeProducts,
        0,
      ),
    }),
    [categories],
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {/* Active Categories */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex text-[8px] items-center font-semibold text-gray-600">
            CATALOG TREE
          </CardTitle>
          <CardAction>
            <Bezier2 className="size-4" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1">
          <h1 className="font-bold text-xl mt-5">
            {rootCategoryCount} Active Root
          </h1>
          <div className="flex justify-between">
            <p className="text-[8px]">{subCategoryCount} nested nodes</p>
            <p className="text-[8px] text-amber-800 font-bold">+2 staging</p>
          </div>
        </CardContent>
        <CardFooter>Progress bar</CardFooter>
      </Card>

      {/* Category Visible/Hidden */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex text-[8px] items-center font-semibold text-gray-600">
            STOREFRONT EXPOSURE
          </CardTitle>
          <CardAction>
            <Eye className="size-4" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1">
          <h1 className="font-bold text-xl">
            {visibleCategories.length} Visible/ {hiddenCategories.length} Hidden
          </h1>
          <div className="flex justify-between">
            <p className="text-[8px]">98.2% Catalog coverage</p>
            <p className="text-[8px] text-amber-800 font-bold">NAV</p>
          </div>
        </CardContent>
        <CardFooter>1</CardFooter>
      </Card>

      {/* Total Products linked */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex text-[8px] items-center font-semibold text-gray-600">
            TOTAL BOUND SKUS
          </CardTitle>
          <CardAction>
            <Shop3 className="size-4" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1">
          <h1 className="font-bold text-xl">
            {totalActiveProducts} Active SKUs
          </h1>
          <div className="flex justify-between">
            <p className="text-[8px]">Allocated GMV</p>
            <p className="text-[8px] text-amber-800 font-bold">₹4.89Cr</p>
          </div>
        </CardContent>
        <CardFooter>1</CardFooter>
      </Card>

      {/* Latency */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex text-[8px] items-center font-semibold text-gray-600">
            EDGE INVALIDATION
          </CardTitle>
          <CardAction>
            <Speedometer className="size-4" />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1">
          <h1 className="font-bold text-xl">0.38ms Latency</h1>
          <div className="flex justify-between">
            <p className="text-[8px]">Purged 4m ago</p>
            <p className="text-[8px] text-amber-800 font-bold">HOT TIER</p>
          </div>
        </CardContent>
        <CardFooter>1</CardFooter>
      </Card>
    </div>
  );
};

export default CategoryCard;
