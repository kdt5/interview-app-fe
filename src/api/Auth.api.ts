import { HttpStatusCode } from "axios";
import { BACKEND_URLS } from "../constants/Urls";
import { LoginInputs } from "../pages/LoginPage";
import { backendHttpClient } from "./BackendHttpClient.api";
import { UserBasicInfo, SignUpInputs } from "../models/User.model";
import axios from "axios";

export async function signUp(userData: SignUpInputs): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.AUTH.SIGNUP, userData)
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function login(userData: LoginInputs): Promise<UserBasicInfo> {
  const response = await backendHttpClient
    .post<UserBasicInfo>(BACKEND_URLS.AUTH.LOGIN, userData)
    .then((response) => response.data)
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
  try {
    const response = await backendHttpClient.post(
      BACKEND_URLS.AUTH.CHECK_EMAIL,
      { email }
    );
    return response.status !== HttpStatusCode.Ok;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Conflict
    ) {
      return true;
    }
    throw error;
  }
}

export async function checkNicknameExists(nickname: string): Promise<boolean> {
  try {
    const response = await backendHttpClient.post(
      BACKEND_URLS.AUTH.CHECK_NICKNAME,
      { nickname }
    );
    return response.status !== HttpStatusCode.Ok;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Conflict
    ) {
      return true;
    }
    throw error;
  }
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
    .post(BACKEND_URLS.USERS.RECOVER_PASSWORD, { email })
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
