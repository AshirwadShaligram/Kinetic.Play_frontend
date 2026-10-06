"use client";

import CategoryIconPicker from "@/components/admin/categories/category-icon-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getCategoryByIdService,
  updateCategoryService,
} from "@/services/admin/admin-category";
import { CategoryIconName } from "@/types/category-icon";
import {
  CategoryResponse,
  UpdateCategoryRequest,
} from "@/types/category-types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BrowserTerminal, Camera, ImagePlus } from "reicon-react";

type CategoryFormValues = {
  title: string;
  description: string;
  logo: CategoryIconName | undefined;
  isVisible: boolean;
};

type SubCategoryDraft = {
  id?: string;
  name: string;
  isVisible: boolean;
};

const getErrorMessage = (err: unknown) => {
  if (isAxiosError(err)) {
    const data = err.response?.data;
    if (typeof data === "string" && data) return data;
    if (data?.message) return data.message as string;
    if (data?.title) return data.title as string;
    return err.message;
  }
  return err instanceof Error ? err.message : "Something went wrong";
};

const UpdateCategoryPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -----------------SUBCATEGORIES---------------------
  const [subCategories, setSubCategories] = useState<SubCategoryDraft[]>([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [defaultVisible, setDefaultVisible] = useState(true);

  // -----------------SUBMIT FEEDBACK---------------------
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const queryClient = useQueryClient();

  const params = useParams();
  const categoryId = params.guid as string;

  // -----------------FORM---------------------
  const {
    register,
    control,
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
  });

  // -----------------GET CATEGORY BY ID---------------------
  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryByIdService(categoryId),
    enabled: !!categoryId,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!category) return;

    reset({
      title: category.title,
      description: category.description,
      logo: category.logo as CategoryIconName,
      isVisible: category.isVisible,
    });

    setSubCategories(
      (category.subCategories ?? []).map((sc) => ({
        id: sc.id,
        name: sc.name,
        isVisible: sc.isVisible,
      })),
    );
  }, [category, reset]);

  // --------------------------------------------------------
  // Add Sub Category
  // --------------------------------------------------------
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

  // --------------------------------------------------------
  // Image Selection
  // --------------------------------------------------------
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

  // Discard a newly selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --------------------------------------------------------
  // Mutation
  // --------------------------------------------------------
  const updateMutation = useMutation({
    mutationFn: (payload: UpdateCategoryRequest) =>
      updateCategoryService(categoryId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["category", categoryId],
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      removeImage();
      setSubmitError("");
      setSubmitSuccess(true);
    },
    onError: (err) => {
      setSubmitSuccess(false);
      setSubmitError(getErrorMessage(err));
    },
  });

  // --------------------------------------------------------
  // onSubmit function
  // --------------------------------------------------------
  const onSubmit = (values: CategoryFormValues) => {
    if (!category) return;

    setSubmitError("");
    setSubmitSuccess(false);

    const payload: UpdateCategoryRequest = {};

    const title = values.title.trim();
    if (title !== category.title) payload.title = title;

    const description = values.description.trim();
    if (description !== category.description) payload.description = description;

    if (values.logo && values.logo !== category.logo)
      payload.logo = values.logo;

    if (imageFile) payload.image = imageFile;

    payload.subCategories = subCategories.map((sc) => ({
      id: sc.id,
      name: sc.name,
      isVisible: sc.isVisible,
    }));

    updateMutation.mutate(payload);
  };

  // --------------------------------------------------------
  // LOADING
  // --------------------------------------------------------
  if (categoryLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading category...</p>
      </div>
    );
  }

  // --------------------------------------------------------
  // ERROR
  // --------------------------------------------------------
  if (categoryError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-destructive">Failed to load category</p>
      </div>
    );
  }

  // --------------------------------------------------------
  // CATEGORY NOT FOUND
  // --------------------------------------------------------
  if (!category) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-destructive">Category not found.</p>
      </div>
    );
  }

  const displayedImage = imagePreview || category.image;

  return (
    <main className="w-full p-2 flex flex-col gap-3">
      {/* Page Header */}
      <section className="flex gap-3 justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-5xl font-bold">
            Update Hardware Category
          </h1>
          <p className="text-gray-600 md:text-lg">
            Update taxonomy, hardware specifications, and nested subcategories.
          </p>
        </div>
        <Button
          type="button"
          className="text-[10px] md:text-lg p-2 h-10"
          disabled={updateMutation.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {updateMutation.isPending ? "Saving..." : "Update category"}
        </Button>
      </section>

      {/* Submit feedback */}
      {submitError && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}
      {submitSuccess && (
        <p className="mt-2 text-sm text-green-600" role="status">
          Category updated.
        </p>
      )}

      {/* Category Information */}
      <div className="flex gap-3 mt-2">
        <section className="flex flex-col flex-2 justify-between gap-3 md:w-full border p-2 rounded-xl">
          <div className="rounded-md border p-2">
            <div className="flex justify-between ">
              <div className="flex items-center gap-4">
                <BrowserTerminal className="size-4 border w-7 h-11 p-1 bg-gray-400 text-black rounded-md" />
                <div className="flex flex-col">
                  <h1 className="font-semibold text-xl md:text-2xl">
                    General Specification
                  </h1>
                  <p className="text-gray-600 text-[10px] md:text-sm">
                    Core taxonomy, and architectural description.
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-semibold">SEC // 01</div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="md:text-lg">
                  Category Title
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Custom Liquid Rigs & Workstation"
                  className="text-gray-700 text-[11px]"
                  {...register("title", {
                    validate: (v) =>
                      v.trim().length > 0 || "Category title cannot be empty",
                  })}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="desc" className="md:text-lg">
                  Category Description & Engineering Spes
                </Label>
                <Textarea
                  id="desc"
                  placeholder="e.g. Ultra-high terminal efficiency workstations and hardline PETG water-cooled enthusiast builds."
                  className="text-gray-700 text-[11px] resize-none min-h-28"
                  {...register("description")}
                />
              </div>
            </div>
          </div>
          {/* Media & Visible identity */}
          <div className="rounded-md border p-2">
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
                    {displayedImage ? (
                      <img
                        src={displayedImage}
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
                  {imageFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={removeImage}
                    >
                      Discard new image
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
        </section>

        {/* Subcategories */}
        <section className="flex flex-1 flex-col gap-3 md:w-full border p-2 rounded-xl">
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl">Sub-categories</h2>
            <p className="text-gray-600 text-[10px] md:text-sm">
              Add, rename, or hide the sub-categories under this category.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
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
                placeholder="e.g. Liquid coolers"
                className="text-[11px]"
              />
              <Button type="button" onClick={handleAddSubCategory}>
                Add
              </Button>
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={defaultVisible}
                onChange={(e) => setDefaultVisible(e.target.checked)}
              />
              Visible when added
            </label>
            {subCategoryError && (
              <p className="text-xs text-destructive">{subCategoryError}</p>
            )}
          </div>

          {subCategories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No sub-categories yet. Add one above.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {subCategories.map((sc, index) => (
                <li
                  key={sc.id ?? `new-${sc.name}`}
                  className="flex items-center justify-between gap-2 rounded-md border p-2"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-sm font-medium">
                      {sc.name}
                    </span>
                    {!sc.id && (
                      <span className="text-[10px] text-muted-foreground">
                        New — saved on update
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleSubCategoryVisibility(index)}
                    >
                      {sc.isVisible ? "Visible" : "Hidden"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSubCategory(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <div className="rounded-md border p-2">3</div>
    </main>
  );
};

export default UpdateCategoryPage;
