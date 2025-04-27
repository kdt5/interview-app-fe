import { RankingItem } from "../models/Ranking.model";
import { http, HttpResponse } from "msw";

// Mock 데이터
export const integrationRankingMockData: RankingItem[] = [
  {
    nickname: "User1",
    rank: 1,
    totalFavoriteCount: 5,
    totalAnswerCount: 15,
    totalScore: 20,
  },
  {
    nickname: "User2",
    rank: 2,
    totalFavoriteCount: 20,
    totalAnswerCount: 5,
    totalScore: 25,
  },
  {
    nickname: "User3",
    rank: 3,
    totalFavoriteCount: 10,
    totalAnswerCount: 20,
    totalScore: 30,
  },
  {
    nickname: "User4",
    rank: 4,
    totalFavoriteCount: 8,
    totalAnswerCount: 13,
    totalScore: 21,
  },
  {
    nickname: "User5",
    rank: 5,
    totalFavoriteCount: 12,
    totalAnswerCount: 8,
    totalScore: 22,
  },
  {
    nickname: "User6",
    rank: 6,
    totalFavoriteCount: 4,
    totalAnswerCount: 18,
    totalScore: 22,
  },
  {
    nickname: "User7",
    rank: 7,
    totalFavoriteCount: 16,
    totalAnswerCount: 10,
    totalScore: 26,
  },
  {
    nickname: "User8",
    rank: 8,
    totalFavoriteCount: 7,
    totalAnswerCount: 17,
    totalScore: 24,
  },
  {
    nickname: "User9",
    rank: 9,
    totalFavoriteCount: 11,
    totalAnswerCount: 12,
    totalScore: 23,
  },
  {
    nickname: "User10",
    rank: 10,
    totalFavoriteCount: 15,
    totalAnswerCount: 9,
    totalScore: 24,
  },
];

export const answerRankingMockData: RankingItem[] = [
  {
    nickname: "User1",
    rank: 1,
    totalFavoriteCount: 5,
    totalAnswerCount: 15,
    totalScore: 20,
  },
  {
    nickname: "User2",
    rank: 2,
    totalFavoriteCount: 20,
    totalAnswerCount: 5,
    totalScore: 25,
  },
  {
    nickname: "User3",
    rank: 3,
    totalFavoriteCount: 10,
    totalAnswerCount: 20,
    totalScore: 30,
  },
  {
    nickname: "User4",
    rank: 4,
    totalFavoriteCount: 8,
    totalAnswerCount: 13,
    totalScore: 21,
  },
  {
    nickname: "User5",
    rank: 5,
    totalFavoriteCount: 12,
    totalAnswerCount: 8,
    totalScore: 22,
  },
  {
    nickname: "User6",
    rank: 6,
    totalFavoriteCount: 4,
    totalAnswerCount: 18,
    totalScore: 22,
  },
  {
    nickname: "User7",
    rank: 7,
    totalFavoriteCount: 16,
    totalAnswerCount: 10,
    totalScore: 26,
  },
  {
    nickname: "User8",
    rank: 8,
    totalFavoriteCount: 7,
    totalAnswerCount: 17,
    totalScore: 24,
  },
  {
    nickname: "User9",
    rank: 9,
    totalFavoriteCount: 11,
    totalAnswerCount: 12,
    totalScore: 23,
  },
  {
    nickname: "User10",
    rank: 10,
    totalFavoriteCount: 15,
    totalAnswerCount: 9,
    totalScore: 24,
  },
];

export const favoriteRankingMockData: RankingItem[] = [
  {
    nickname: "User1",
    rank: 1,
    totalFavoriteCount: 5,
    totalAnswerCount: 15,
    totalScore: 20,
  },
  {
    nickname: "User2",
    rank: 2,
    totalFavoriteCount: 20,
    totalAnswerCount: 5,
    totalScore: 25,
  },
  {
    nickname: "User3",
    rank: 3,
    totalFavoriteCount: 10,
    totalAnswerCount: 20,
    totalScore: 30,
  },
  {
    nickname: "User4",
    rank: 4,
    totalFavoriteCount: 8,
    totalAnswerCount: 13,
    totalScore: 21,
  },
  {
    nickname: "User5",
    rank: 5,
    totalFavoriteCount: 12,
    totalAnswerCount: 8,
    totalScore: 22,
  },
  {
    nickname: "User6",
    rank: 6,
    totalFavoriteCount: 4,
    totalAnswerCount: 18,
    totalScore: 22,
  },
  {
    nickname: "User7",
    rank: 7,
    totalFavoriteCount: 16,
    totalAnswerCount: 10,
    totalScore: 26,
  },
  {
    nickname: "User8",
    rank: 8,
    totalFavoriteCount: 7,
    totalAnswerCount: 17,
    totalScore: 24,
  },
  {
    nickname: "User9",
    rank: 9,
    totalFavoriteCount: 11,
    totalAnswerCount: 12,
    totalScore: 23,
  },
  {
    nickname: "User10",
    rank: 10,
    totalFavoriteCount: 15,
    totalAnswerCount: 9,
    totalScore: 24,
  },
];

// Mock API 핸들러
export const getIntegrationRanking = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/rankings`,
  () => {
    return HttpResponse.json(integrationRankingMockData, { status: 200 });
  }
);

export const getAnswerRanking = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/rankings/answers`,
  () => {
    return HttpResponse.json(answerRankingMockData, { status: 200 });
  }
);

export const getFavoriteRanking = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/rankings/likes`,
  () => {
    return HttpResponse.json(favoriteRankingMockData, { status: 200 });
  }
);
