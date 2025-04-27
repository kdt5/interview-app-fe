import { BACKEND_URLS } from "../constants/Urls";
import { RankingItem } from "../models/Ranking.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchIntegrationRanking(): Promise<RankingItem[]> {
  const response = await backendHttpClient
    .get<RankingItem[]>(BACKEND_URLS.RANKINGS.ALL)
    .then((res) => res.data)
    .catch((error) => {
<<<<<<< HEAD
      console.error("Error fetching ranking data:", error);
      throw new Error("Failed to fetch ranking data");
    });
  return response;
}

=======
      throw error;
    });

  return response;
}

// 답변수 랭킹 가져오기
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
export async function fetchAnswerRanking(): Promise<RankingItem[]> {
  const response = await backendHttpClient
    .get<RankingItem[]>(BACKEND_URLS.RANKINGS.ANSWERS)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

<<<<<<< HEAD
=======
// 좋아요수 랭킹 가져오기
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
export async function fetchFavoriteRanking(): Promise<RankingItem[]> {
  const response = await backendHttpClient
    .get<RankingItem[]>(BACKEND_URLS.RANKINGS.LIKES)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
