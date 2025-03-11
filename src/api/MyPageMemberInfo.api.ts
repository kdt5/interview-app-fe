import { UserProfile } from "../models/User.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchUserProfile() {
  const response = await backendHttpClient
    .get<UserProfile>(`/me`)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });

  return response;
}
