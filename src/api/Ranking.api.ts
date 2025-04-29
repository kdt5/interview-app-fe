import { BACKEND_URLS } from "../constants/Urls";
import { RankingItem } from "../models/Ranking.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchIntegrationRanking(): Promise<RankingItem[]> {
  const response = await backendHttpClient
    .get<RankingItem[]>(BACKEND_URLS.RANKINGS.ALL)
    .then((res) => res.data)
    .catch((error) => {
      console.error("Error fetching ranking data:", error);
      throw new Error("Failed to fetch ranking data");
    });
  return response;
}

export async function fetchAnswerRanking(): Promise<RankingItem[]> {
  const response = await backendHttpClient
    .get<RankingItem[]>(BACKEND_URLS.RANKINGS.ANSWERS)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchFavoriteRanking(): Promise<RankingItem[]> {
  const response = await backendHttpClient
    .get<RankingItem[]>(BACKEND_URLS.RANKINGS.LIKES)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
