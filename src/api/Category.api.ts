import { Position } from "../constants/Question";
import { BACKEND_URLS } from "../constants/Urls";
import { Category } from "../models/Question.model";
import { getPositionIdByKey } from "../utils/Positions";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchCategories(
  position?: Position
): Promise<Category[]> {
  const params: { positionId?: number } = {};

  if (position !== undefined) {
    params.positionId = getPositionIdByKey(position);
  }

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
