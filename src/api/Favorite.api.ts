import { backendHttpClient } from "./BackendHttpClient.api";
import { BACKEND_URLS } from "../constants/Urls";
import { replaceUrlParams } from "../utils/Url";

interface FavoriteQuestionResponse {
  userId: number;
  question: {
    id: number;
    title: string;
  };
}

export async function fetchFavoriteQuestions() {
  const response = await backendHttpClient
    .get<FavoriteQuestionResponse[]>(BACKEND_URLS.FAVORITES.MINE)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchFavorite(questionId: number) {
  const response = await backendHttpClient
    .get<boolean>(
      replaceUrlParams(BACKEND_URLS.FAVORITES.FAVORITE, {
        questionId: questionId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function addFavorite(questionId: number) {
  const response = await backendHttpClient
    .post(
      replaceUrlParams(BACKEND_URLS.FAVORITES.FAVORITE, {
        questionId: questionId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function removeFavorite(questionId: number) {
  const response = await backendHttpClient
    .delete(
      replaceUrlParams(BACKEND_URLS.FAVORITES.FAVORITE, {
        questionId: questionId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
