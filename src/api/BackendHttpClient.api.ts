/* eslint-disable @typescript-eslint/naming-convention */
// eslint disabled for naming convention because the axios library uses complicated names
import axios from "axios";

export const backendHttpClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  timeout: import.meta.env.VITE_BACKEND_DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
