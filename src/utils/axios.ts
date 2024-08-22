import axios from "axios";
import { getAccessToken } from "./cookies";
const createApiInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(async (config) => {
    const accessToken = getAccessToken()?.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return instance;
};

const Api = createApiInstance();
export default Api;
