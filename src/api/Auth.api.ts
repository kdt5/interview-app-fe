import { HttpStatusCode } from "axios";
import { BACKEND_URLS } from "../constants/Urls";
import { LoginInputs } from "../pages/LoginPage";
import { SignUpInputs } from "../pages/SignUpPage";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function signUp(userData: SignUpInputs): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.SIGNUP, userData)
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function login(userData: LoginInputs): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.LOGIN, userData)
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function logout(): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.LOGOUT)
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.CHECK_EMAIL, { email })
    .then((response) => response.status !== HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function checkNicknameExists(nickname: string): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.CHECK_NICKNAME, { nickname })
    .then((response) => response.status !== HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function refreshToken(): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.REFRESH)
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function recoverPassword(email: string): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.RECOVER_PASSWORD, { email })
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function resetPassword(
  token: string,
  email: string,
  newPassword: string
): Promise<boolean> {
  if (!token || !email || !newPassword) {
    throw new Error("Missing required parameters");
  }
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.RESET_PASSWORD, { token, email, newPassword })
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}
