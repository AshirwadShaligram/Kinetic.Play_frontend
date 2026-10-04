// ---------------- SUBCATEGORY ----------------

export interface SubCategoryResponse {
  id: string;
  name: string;
  isVisible: boolean;
  categoryId: string;
}

export interface CreateSubCategoryInline {
  name: string;
  isVisible: boolean;
}

// ---------------- CATEGORY ----------------

export interface CategoryResponse {
  id: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  isVisible: boolean;
  activeProducts: number;
  subCategories: SubCategoryResponse[];
}

export interface CreateCategoryRequest {
  title: string;
  description: string;
  logo: string;
  image: File;
  isVisible: boolean;
  subCategories: CreateSubCategoryInline[];
}

export type CreateCategoryResponse = CategoryResponse;

// ---------------- UPDATE  ----------------
export interface UpdateCategoryRequest {
  title?: string;
  description?: string;
  logo?: string;
  image?: File;
}
