import store from "@/store";
import axios from "axios";
import { fetchCsrfToken } from "@/utils/fetchCsrfToken";

class CustomError extends Error {
  response?: any;
  config?: any;
  code?: any;

  constructor(message: string, response?: any, config?: any, code?: any) {
    super(message);
    this.name = "CustomError";
    this.response = response;
    this.config = config;
    this.code = code;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    const csrfToken = await fetchCsrfToken();
    config.headers["X-CSRF-Token"] = csrfToken;
    return config;
  },
  (error) => {
    const errorInstance = new CustomError(
      error.message || "Request Error",
      error.response,
      error.config,
      error.code
    );
    return Promise.reject(errorInstance);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { auth } = store.getState();
      originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`;
      return axiosInstance(originalRequest);
    }
    let errorInstance: CustomError;
    if (error instanceof CustomError) {
      errorInstance = error;
    } else {
      errorInstance = new CustomError(
        error.message || "Request Error",
        error.response,
        error.config,
        error.code
      );
    }
    return Promise.reject(errorInstance);
  }
);
const Api = axiosInstance
export default Api 