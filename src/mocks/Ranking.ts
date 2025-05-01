// import { RankingItem } from "../models/Ranking.model";
// import { http, HttpResponse } from "msw";

// Mock 데이터
// export const integrationRankingMockData: RankingItem[] = [];

// // Mock API 핸들러
// export const getIntegrationRanking = http.get(
//   `${import.meta.env.VITE_BACKEND_BASE_URL}/api/rankings`,
//   () => {
//     return HttpResponse.json(integrationRankingMockData, { status: 200 });
//   }
// );

// export const getAnswerRanking = http.get(
//   `${import.meta.env.VITE_BACKEND_BASE_URL}/api/rankings/answers`,
//   () => {
//     return HttpResponse.json(answerRankingMockData, { status: 200 });
//   }
// );

// export const getFavoriteRanking = http.get(
//   `${import.meta.env.VITE_BACKEND_BASE_URL}/api/rankings/likes`,
//   () => {
//     return HttpResponse.json(favoriteRankingMockData, { status: 200 });
//   }
// );
