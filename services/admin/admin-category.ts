import axiosApi from "@/lib/axios";
import {
  CategoryResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "@/types/category-types";

// -------------CREATE CATEGORY------------------
// API: http://localhost:5167/api/admin/category/create-category
export const createCategoryService = async (
  data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
  const formdata = new FormData();

  formdata.append("title", data.title);
  formdata.append("description", data.description);
  formdata.append("logo", data.logo);
  formdata.append("image", data.image);
  formdata.append("isVisible", String(data.isVisible));

  data.subCategories?.forEach((subCategory, index) => {
    formdata.append(`subCategories[${index}].name`, subCategory.name);
    formdata.append(
      `subCategories[${index}].isVisible`,
      String(subCategory.isVisible),
    );
  });

  const response = await axiosApi.post<CreateCategoryResponse>(
    "/admin/category/create-category",
    formdata,
  );

  return response.data;
};

// -------------UPDATE CATEGORY------------------
// API: http://localhost:5167/api/admin/category/update-category/{id}
export const updateCategoryService = async (
  id: string,
  data: UpdateCategoryRequest,
): Promise<UpdateCategoryResponse> => {
  const formdata = new FormData();
  if (data.title !== undefined) {
    formdata.append("title", data.title);
  }
  if (data.description !== undefined) {
    formdata.append("description", data.description);
  }
  if (data.logo !== undefined) {
    formdata.append("logo", data.logo);
  }
  if (data.image !== undefined) {
    formdata.append("image", data.image);
  }
  data.subCategories?.forEach((subCategory, index) => {
    if (subCategory.id !== undefined) {
      formdata.append(`subCategories[${index}].id`, subCategory.id);
    }
    formdata.append(`subCategories[${index}].name`, subCategory.name);
    formdata.append(
      `subCategories[${index}].isVisible`,
      String(subCategory.isVisible),
    );
  });
  const response = await axiosApi.patch<UpdateCategoryResponse>(
    `/admin/category/${id}`,
    formdata,
  );
  return response.data;
};

// -------------GET ALL CATEGORY------------------
// API: http://localhost:5167/api/admin/category/get-all-category
export const getCategoriesService = async (): Promise<CategoryResponse[]> => {
  const response = await axiosApi.get<CategoryResponse[]>(
    "/admin/category/get-all-categories",
  );

  return response.data;
};

// -------------GET CATEGORY BY ID------------------
// API: http://localhost:5167/api/admin/category/{guid}
export const getCategoryByIdService = async (
  id: string,
): Promise<CategoryResponse> => {
  const response = await axiosApi.get<CategoryResponse>(
    `/admin/category/${id}`,
  );

  return response.data;
};

// -------------TOGGLE CATEGORY VISIBILITY------------------
// API: http://localhost:5167/api/admin/category/toggle/${id}
export const toggleCategoryService = async (id: string) => {
  const response = await axiosApi.patch(`/admin/category/toggle/${id}`);

  return response.data;
};
