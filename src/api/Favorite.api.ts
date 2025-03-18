import { backendHttpClient } from "./BackendHttpClient.api";
import { Question } from "../models/Question.model";

export async function fetchFavoriteQuestions() {
  const response = await backendHttpClient
    .get<Question[]>(`/api/favorites/mine`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
