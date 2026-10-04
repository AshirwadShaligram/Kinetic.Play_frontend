import { getToken, setToken } from "@/services/token-service";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface RetryRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR
axiosApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequest;

    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axiosApi.post("/auth/refresh");

        setToken(res.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return axiosApi(originalRequest);
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          console.error(
            "Refresh failed:",
            refreshError.response?.status,
            refreshError.response?.data,
          );
        }
        setToken(null);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
