"use client";

import CategoryIconPicker from "@/components/admin/categories/category-icon-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  createCategoryService,
  getCategoriesService,
} from "@/services/admin/admin-category";
import { CategoryIconName } from "@/types/category-icon";
import { CreateCategoryRequest } from "@/types/category-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ArrowRight,
  Bezier2,
  BrowserTerminal,
  Camera,
  Eye3,
  Forward2,
  ImagePlus,
  Plus,
  Search,
  ShieldCheck,
} from "reicon-react";
import { toast } from "sonner";

type CategoryFormValues = {
  title: string;
  description: string;
  logo: CategoryIconName | undefined;
  isVisible: boolean;
};

type SubCategoryDraft = {
  name: string;
  isVisible: boolean;
};

const CreateCategoryPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -----------------SUBCATEGORIES (local draft list)---------------------
  const [subCategories, setSubCategories] = useState<SubCategoryDraft[]>([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [defaultVisible, setDefaultVisible] = useState(true);

  const handleAddSubCategory = () => {
    const trimmed = subCategoryName.trim();

    if (!trimmed) {
      setSubCategoryError("Sub-category name cannot be empty");
      return;
    }

    const isDuplicate = subCategories.some(
      (sc) => sc.name.toLowerCase() === trimmed.toLowerCase(),
    );

    if (isDuplicate) {
      setSubCategoryError("This sub-category has already been added");
      return;
    }

    setSubCategories((prev) => [
      ...prev,
      { name: trimmed, isVisible: defaultVisible },
    ]);
    setSubCategoryName("");
    setSubCategoryError("");
  };

  const handleRemoveSubCategory = (index: number) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleSubCategoryVisibility = (index: number) => {
    setSubCategories((prev) =>
      prev.map((sc, i) =>
        i === index ? { ...sc, isVisible: !sc.isVisible } : sc,
      ),
    );
  };
  // ------------------------------------------------------------------------

  const router = useRouter();
  const queryClient = useQueryClient();

  // CONTROLLER FOR HANDLING CREATE CATEGORY
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      title: "",
      description: "",
      logo: undefined,
      isVisible: true,
    },
    mode: "onSubmit",
  });

  const handleRevertForm = () => {
    reset();
    removeImage();
    setSubCategories([]);
    setSubCategoryName("");
    setSubCategoryError("");
    setDefaultVisible(true);
  };

  // -----------------GET ALL CATEGORIES---------------------
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });
  // --------------------------------------------------------

  // -----------------IMAGE SELECTION---------------------
  const handleImageSelect = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file");
      return;
    }

    setImageError("");
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Image Drag & Drop
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    handleImageSelect(event.dataTransfer.files[0]);
  };

  // Remove Image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  // -------------------------------------------------------

  // -----------------Mutation----------------------
  const createCategoryMutation = useMutation({
    mutationFn: createCategoryService,
    onSuccess: () => {
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/categories");
      router.refresh();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to create category";

      toast.error(message);
    },
  });
  // -----------------------------------------------

  const errorCount = Object.keys(errors).length + (imageError ? 1 : 0);

  // -------------onSubmit function-----------------
  const onSubmit = (values: CategoryFormValues) => {
    let hasError = false;

    if (!imageFile) {
      setImageError("A category image is required");
      hasError = true;
    }

    if (hasError) return;

    const payload: CreateCategoryRequest = {
      title: values.title.trim(),
      description: values.description?.trim() ?? "",
      logo: values.logo as CategoryIconName,
      image: imageFile as File,
      isVisible: values.isVisible,
      subCategories,
    };

    console.log("Create category: ", payload);

    createCategoryMutation.mutate(payload);
  };
  // -----------------------------------------------

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Create Hardware Category</h1>
          <p className="text-gray-600">
            Configure taxonomy, hardware specifications, visibility parameters,
            and nested subcategories.
          </p>
        </div>
        <Button
          type="submit"
          className="text-[10px]"
          disabled={createCategoryMutation.isPending}
        >
          {createCategoryMutation.isPending
            ? "Publishing..."
            : "Publish Category"}
        </Button>
      </div>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:w-185">
        <div className="flex flex-col gap-4">
          {/* Basic Category Info */}
          <div className="border rounded-md  p-2 mt-2">
            <div className="flex justify-between ">
              <div className="flex items-center gap-3">
                <BrowserTerminal className="size-4 border w-7 h-11 p-1 bg-gray-400 text-black rounded-md" />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-xl">
                    General Specification
                  </h1>
                  <p className="text-gray-600 text-[10px]">
                    Core taxonomy, and architectural description.
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-semibold">SEC // 01</div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">
                  Category Title
                  <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Custom Liquid Rigs & Workstation"
                  className="text-gray-700 text-[11px]"
                  {...register("title", {
                    required: "Category name is required",
                    maxLength: {
                      value: 100,
                      message: "Category name must be 100 characters or less.",
                    },
                    validate: (val) =>
                      !categories.some(
                        (c) =>
                          c.title.trim().toLowerCase() ===
                          val.trim().toLowerCase(),
                      ) || "A category with this name already exists.",
                  })}
                />

                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="desc">
                  Category Description & Engineering Spes
                  <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="desc"
                  placeholder="e.g. Ultra-high terminal efficiency workstations and hardline PETG water-cooled enthusiast builds."
                  className="text-gray-700 text-[11px] resize-none min-h-28"
                  {...register("description", {
                    maxLength: {
                      value: 500,
                      message: "Description must be 500 characters or less",
                    },
                  })}
                />

                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Media & Visible identity */}
          <div className="border rounded-md p-2">
            <div className="flex justify-between ">
              <div className="flex items-center gap-2">
                <Camera className="size-4 border w-7 h-11 p-1 bg-gray-400 text-black rounded-md" />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-xl">
                    Media & Visual Identity
                  </h1>
                  <p className="text-gray-600 text-[10px]">
                    Storefront hero assets and high-density vector iconography
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-semibold">SEC // 02</div>
            </div>
            <div className="flex justify-between gap-4">
              <div className="flex-2">
                <h1 className="flex justify-between text-[10px]">
                  Category Hero Banner<span>16:9</span>
                </h1>
                <div className="flex w-full min-h-48 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 transition-colors">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => handleImageSelect(e.target.files?.[0])}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`flex min-h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg transition-colors
                    ${dragOver ? "bg-muted/50" : "bg-muted/20 hover:bg-muted/40"}
                    `}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Category Preview"
                        className="max-h-40 max-w-full rounded-md object-contain"
                      />
                    ) : (
                      <>
                        <ImagePlus className="mb-3 size-8 text-muted-foreground" />

                        <p className="text-sm font-medium">
                          Click to upload an image
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          PNG, JPG and WEBP
                        </p>
                      </>
                    )}
                  </div>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={removeImage}
                    >
                      Remove image
                    </Button>
                  )}
                </div>
                {/* ------------Image Error-------------- */}
                {imageError && (
                  <p className="mt-1 text-xs text-destructive">{imageError}</p>
                )}
              </div>

              {/* ICON PICKER */}
              <div className="flex-1">
                <h1 className="flex justify-between text-[10px]">
                  Navigation Icon<span>1:1</span>
                </h1>
                <div className="flex w-full min-h-48 flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 transition-colors">
                  <Controller
                    control={control}
                    name="logo"
                    rules={{ required: "Please select an icon" }}
                    render={({ field, fieldState }) => (
                      <CategoryIconPicker
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SubCategories */}
          <div className="border rounded-md p-2 flex flex-col gap-3">
            <div className="flex items-center justify-between h-12">
              <div className="flex gap-3">
                <Bezier2 className="size-4 border w-7 h-11 p-1 bg-gray-400 text-black rounded-md" />
                <div className="flex flex-col justify-start">
                  <h1 className="font-semibold">
                    SubCategories (Nested Taxonomy)
                  </h1>
                  <p className="text-[10px] text-gray-600">
                    Hierarchical hardware tiers with public storefront
                    visibility toggles
                  </p>
                </div>
              </div>
              <div>-Units-</div>
            </div>
            <div className="bg-muted p-2 flex items-center justify-between rounded-md">
              <div className="relative flex items-center">
                <Forward2 className="absolute left-2 size-3" />
                <Input
                  className="w-32 h-7 md:w-40  bg-white pl-6"
                  placeholder="e.g. PS5"
                  value={subCategoryName}
                  onChange={(e) => {
                    setSubCategoryName(e.target.value);
                    if (subCategoryError) setSubCategoryError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSubCategory();
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-1">
                <h4 className="text-[9px] font-semibold">Default Visible</h4>
                <Switch
                  id="defaultVisible"
                  checked={defaultVisible}
                  onCheckedChange={setDefaultVisible}
                  className="bg-surface-container-lowest"
                />
              </div>
              <div>
                <Button
                  type="button"
                  className="text-[10px]"
                  onClick={handleAddSubCategory}
                >
                  <Plus className="size-3 text-amber-500" />
                  Add Subcategory
                </Button>
              </div>
            </div>

            {subCategoryError && (
              <p className="text-xs text-destructive">{subCategoryError}</p>
            )}

            {subCategories.length === 0 ? (
              <p className="text-[10px] text-gray-500">
                No sub-categories added yet.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {subCategories.map((sc, index) => (
                  <div
                    key={`${sc.name}-${index}`}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <span className="text-[11px] font-medium">{sc.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <h4 className="text-[9px] font-semibold">
                          {sc.isVisible ? "Visible" : "Hidden"}
                        </h4>
                        <Switch
                          id={`subcategory-visible-${index}`}
                          checked={sc.isVisible}
                          onCheckedChange={() =>
                            handleToggleSubCategoryVisibility(index)
                          }
                          className="bg-surface-container-lowest"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-[10px] text-destructive"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:w-96">
          {/* Storefront Visibility */}
          <div className="border rounded-md p-2">
            <div>
              <div className="flex justify-between ">
                <div className="flex items-center gap-2">
                  <Eye3 className="size-4 border w-7 h-11 p-1 bg-gray-400 text-black rounded-md" />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-md">
                      Storefront Visibility
                    </h1>
                    <p className="text-gray-600 text-[10px]">
                      Global exposure & dispatch parameters
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 border bg-amber-500 rounded-full" />
              </div>
            </div>
            <div className="bg-surface-container-highest p-1 rounded-md mt-2 flex items-center justify-between">
              <div>
                <h1 className="font-semibold text-[12px]">
                  Publish to Public Navigation
                </h1>
                <p className="text-[8px]">
                  Instantly expose in hardware mega-menu
                </p>
              </div>
              <Controller
                control={control}
                name="isVisible"
                render={({ field }) => (
                  <Switch
                    id="isVisible"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-surface-container-lowest"
                  />
                )}
              />
            </div>

            <div className="bg-surface-container-highest p-1 rounded-md mt-2 flex gap-3">
              <ShieldCheck className="size-4 w-16 mt-2" fontSize={2} />
              <div>
                <h1>KINETIC SHIELD V3</h1>
                <p className="text-[8px]">
                  Rate-limiting set to 2 units per PAN/Verified builder identity
                  required for this taxonomy
                </p>
              </div>
            </div>
          </div>

          {/* Active Products Allocation */}
          <div className="border rounded-md p-2">
            Active Products Allocation
          </div>
        </div>
      </div>

      {/* ------Publish Button------- */}
      <div className="border mt-3 p-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 border rounded-full ${
              errorCount > 0 ? "bg-red-500" : "bg-amber-500"
            }`}
          />
          <span className="text-[9px]">
            {errorCount > 0
              ? `Category Configuration . ${errorCount} schema error${
                  errorCount > 1 ? "s" : ""
                } detected`
              : "Category Configuration Validated . 0 schema errors detected"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="font-semibold text-[10px] bg-gray-300"
            variant="ghost"
            onClick={handleRevertForm}
          >
            Revert Form
          </Button>
          <Button
            type="submit"
            className="flex items-center text-[10px] font-semibold"
            disabled={createCategoryMutation.isPending}
          >
            {createCategoryMutation.isPending
              ? "Publishing..."
              : "Publish Category"}
            <ArrowRight className="text-amber-500" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCategoryPage;
