import { BACKEND_URLS } from "../constants/Urls";
import { LoginProps } from "../pages/LoginPage";
import { JoinProps } from "../pages/SignUpPage";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function signUp(userData: JoinProps) {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.SIGNUP, userData)
    .then((response) => response.data);

  return response;
}

export async function login(userData: LoginProps) {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.LOGIN, userData)
    .then((response) => response.data);

  return response;
}
