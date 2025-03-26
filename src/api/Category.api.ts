import { Position } from "../constants/Question";
import { BACKEND_URLS } from "../constants/Urls";
import { Category } from "../models/Question.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchCategories(
  position?: Position
): Promise<Category[]> {
  const response = await backendHttpClient
    .get<Category[]>(BACKEND_URLS.CATEGORIES.ALL, {
      params: {
        position,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
