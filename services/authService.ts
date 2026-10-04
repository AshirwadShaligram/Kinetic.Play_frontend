import axiosApi from "@/lib/axios";
import { LoginFormData, RegisterRequest } from "@/types/authTypes";

// REGISTER SERVICE
export const registerService = async (userData: RegisterRequest) => {
  const res = await axiosApi.post("/auth/register", userData);
  return res.data;
};

// LOGIN SERVICE
export const loginService = async (userData: LoginFormData) => {
  const res = await axiosApi.post("/auth/login", userData);
  return res.data;
};

// LOGOUT SERVICE
export const logoutService = async () => {
  const res = await axiosApi.post("/auth/logout");
  return res.data;
};

// REFRESH SERVICE
export const refreshService = async () => {
  const res = await axiosApi.post("/auth/refresh");
  return res.data;
};

// GET USER INFO
export const getUserInfo = async () => {
  const res = await axiosApi.get("/auth/get-user-info");
  return res.data;
};
