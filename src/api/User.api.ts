import { HttpStatusCode } from "axios";
import { BACKEND_URLS } from "../constants/Urls";
import { UserBasicInfo, UserStats } from "../models/User.model";
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

export async function fetchUserStats(): Promise<UserStats> {
  const response = await backendHttpClient
    .get<UserStats>(BACKEND_URLS.USERS.STATS)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function uploadProfile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("profile", file);

  const response = await backendHttpClient
    .post(BACKEND_URLS.USERS.UPLOAD_PROFILE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response.profileImageUrl;
}

export async function changeNickname(nickname: string): Promise<boolean> {
  const response = await backendHttpClient
    .post(BACKEND_URLS.USERS.CHANGE_NICKNAME, { nickname })
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  if (!oldPassword || !newPassword) {
    throw new Error("Missing required parameters");
  }
  const response = await backendHttpClient
    .post(BACKEND_URLS.USERS.CHANGE_PASSWORD, { oldPassword, newPassword })
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}
