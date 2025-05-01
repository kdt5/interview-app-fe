/* eslint-disable @typescript-eslint/naming-convention */
// Naming convention because the axios library uses complicated names
import axios from "axios";
import { FRONTEND_URLS } from "../constants/Urls";

export const backendHttpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: import.meta.env.VITE_BACKEND_DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

backendHttpClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = FRONTEND_URLS.LOGIN;
    }
  }
);
