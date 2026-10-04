import axiosApi from "@/lib/axios";
import {
  CategoryResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
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

// -------------GET ALL CATEGORY------------------
// API: http://localhost:5167/api/admin/category/get-all-category
export const getCategoriesService = async (): Promise<CategoryResponse[]> => {
  const response = await axiosApi.get<CategoryResponse[]>(
    "/admin/category/get-all-categories",
  );

  return response.data;
};

// -------------TOGGLE CATEGORY VISIBILITY------------------
// API: http://localhost:5167/api/admin/category/toggle/${id}
export const toggleCategoryService = async (id: string) => {
  const response = await axiosApi.patch(`/admin/category/toggle/${id}`);

  return response.data;
};
