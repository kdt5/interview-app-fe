import { backendHttpClient } from "./BackendHttpClient.api";
import { BACKEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "../utils/Url";
import { Question } from "../models/Question.model";
import axios from "axios";

export async function fetchFavoriteQuestions() {
  const response = await backendHttpClient
    .get<Question[]>(BACKEND_URLS.FAVORITES.MINE)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export type FavoriteTargetType = "question" | "post" | "answer" | "comment";

export async function fetchFavorite(
  targetId: number,
  targetType: FavoriteTargetType
) {
  const response = await backendHttpClient
    .get<boolean>(
      replaceUrlParams(BACKEND_URLS.FAVORITES.FAVORITE, {
        targetType,
        targetId: targetId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }

      throw error;
    });

  return response;
}

export async function addFavorite(
  targetId: number,
  targetType: FavoriteTargetType
) {
  const response = await backendHttpClient
    .post(
      replaceUrlParams(BACKEND_URLS.FAVORITES.FAVORITE, {
        targetType,
        targetId: targetId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function removeFavorite(
  targetId: number,
  targetType: FavoriteTargetType
) {
  const response = await backendHttpClient
    .delete(
      replaceUrlParams(BACKEND_URLS.FAVORITES.FAVORITE, {
        targetType,
        targetId: targetId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
