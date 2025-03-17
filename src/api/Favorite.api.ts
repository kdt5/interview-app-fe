import { backendHttpClient } from "./BackendHttpClient.api";
import { Question } from "../models/Question.model";

export async function fetchFavoritesQuestions() {
  const response = await backendHttpClient
    .get<Question[]>(`/api/favorites/mine`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchFavorite(questionId: number) {
  const response = await backendHttpClient
    .get<boolean>(`/api/favorites/${questionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function addFavorite(questionId: number) {
  const response = await backendHttpClient
    .post(`/api/favorites/${questionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function removeFavorite(questionId: number) {
  const response = await backendHttpClient
    .delete(`/api/favorites/${questionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
