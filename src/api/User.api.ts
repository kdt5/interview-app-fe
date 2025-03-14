import { BACKEND_URLS } from "../constants/Urls";
import { UserBasicInfo } from "../models/User.model";
import { LoginProps } from "../pages/LoginPage";
import { JoinProps } from "../pages/SignUpPage";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchMyUserData(): Promise<UserBasicInfo> {
  const response = await backendHttpClient
    .get<UserBasicInfo>(BACKEND_URLS.USERS.ME)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function signup(userData: JoinProps) {
  const response = await backendHttpClient.post("/api/auth/signup", userData);
  return response.data;
}

export async function login(userData: LoginProps) {
  const response = await backendHttpClient.post("/api/auth/login", userData);
  return response.data;
}
