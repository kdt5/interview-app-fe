import { Position } from "../constants/Question";
import { BACKEND_URLS } from "../constants/Urls";
import { Category } from "../models/Question.model";
import { getPositionIdByKey } from "../utils/Positions";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchCategories(
  position?: Position
): Promise<Category[]> {
  const positionId: number | undefined = getPositionIdByKey(position);
  const params = positionId ? { positionId } : {};

  const response = await backendHttpClient
    .get<Category[]>(BACKEND_URLS.CATEGORIES.ALL, {
      params,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
