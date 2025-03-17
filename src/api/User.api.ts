import { BACKEND_URLS } from "../constants/BackendUrls";
import { UserBasicInfo } from "../models/User.model";
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
