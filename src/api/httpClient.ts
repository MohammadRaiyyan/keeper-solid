import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { paths } from "../constants/routes";
import type { ApiError } from "../types/common";
import { AuthEndpoint } from "./endpoints/auth";

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
    _isRefreshTokenRequest?: boolean;
  }
}

interface ErrorResponse {
  message: string;
  code: string;
}

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

httpClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError<ErrorResponse>) => {
    const { response, config } = error;
    if (!response || !config) return Promise.reject(error);

    console.log("API Error:", response.status, response.data);

    if (
      (config as InternalAxiosRequestConfig)._isRefreshTokenRequest &&
      response.status === 401
    ) {
      console.error("Refresh token failed. Redirecting to login...");
      window.location.href = paths.LOGIN;
      return Promise.reject(error);
    }

    if (
      response.status === 401 &&
      !(config as InternalAxiosRequestConfig)._retry
    ) {
      (config as InternalAxiosRequestConfig)._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_API_URL}${AuthEndpoint.refreshToken()}`,
            {},
            {
              withCredentials: true,
              _isRefreshTokenRequest: true,
            } as InternalAxiosRequestConfig,
          );

          refreshSubscribers.forEach((callback) => callback());
          refreshSubscribers = [];

          isRefreshing = false;
          return httpClient(config);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];
          console.error("Refresh token failed. Redirecting to login...");
          window.location.href = paths.LOGIN;
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        refreshSubscribers.push(() => resolve(httpClient(config)));
      });
    }

    if (response.status === 403) {
      window.location.href = paths.HOME;
    }
    const apiError: ApiError = {
      message: response.data?.message || "An unexpected error occurred",
      code: response.data?.code || "UNKNOWN_ERROR",
      status: response.status || 500,
    };
    return Promise.reject(apiError);
  },
);

export default httpClient;
