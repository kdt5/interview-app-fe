import { RankingItem } from "../models/Ranking.model";
import { http, HttpResponse } from "msw";

// Mock 데이터
export const integrationRankingMockData: RankingItem[] = [
  {
    nickname: "User1",
    rank: 1,
<<<<<<< HEAD
    level: 5,
    profileImageUrl: "https://placehold.co/100x100?text=User1",
    totalFavoriteCount: 25,
    totalAnswerCount: 10,
    totalScore: 90,
=======
    totalFavoriteCount: 5,
    totalAnswerCount: 15,
    totalScore: 20,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User2",
    rank: 2,
<<<<<<< HEAD
    level: 4,
    profileImageUrl: "https://placehold.co/100x100?text=User2",
    totalFavoriteCount: 15,
    totalAnswerCount: 20,
    totalScore: 85,
=======
    totalFavoriteCount: 20,
    totalAnswerCount: 5,
    totalScore: 25,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User3",
    rank: 3,
<<<<<<< HEAD
    level: 3,
    profileImageUrl: "https://placehold.co/100x100?text=User3",
    totalFavoriteCount: 20,
    totalAnswerCount: 18,
    totalScore: 80,
=======
    totalFavoriteCount: 10,
    totalAnswerCount: 20,
    totalScore: 30,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User4",
    rank: 4,
<<<<<<< HEAD
    level: 5,
    profileImageUrl: "https://placehold.co/100x100?text=User4",
    totalFavoriteCount: 10,
    totalAnswerCount: 22,
    totalScore: 78,
=======
    totalFavoriteCount: 8,
    totalAnswerCount: 13,
    totalScore: 21,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User5",
    rank: 5,
<<<<<<< HEAD
    level: 2,
    profileImageUrl: "https://placehold.co/100x100?text=User5",
    totalFavoriteCount: 18,
    totalAnswerCount: 12,
    totalScore: 75,
=======
    totalFavoriteCount: 12,
    totalAnswerCount: 8,
    totalScore: 22,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User6",
    rank: 6,
<<<<<<< HEAD
    level: 4,
    profileImageUrl: "https://placehold.co/100x100?text=User6",
    totalFavoriteCount: 22,
    totalAnswerCount: 15,
    totalScore: 70,
=======
    totalFavoriteCount: 4,
    totalAnswerCount: 18,
    totalScore: 22,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User7",
    rank: 7,
<<<<<<< HEAD
    level: 3,
    profileImageUrl: "https://placehold.co/100x100?text=User7",
    totalFavoriteCount: 5,
    totalAnswerCount: 25,
    totalScore: 68,
=======
    totalFavoriteCount: 16,
    totalAnswerCount: 10,
    totalScore: 26,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User8",
    rank: 8,
<<<<<<< HEAD
    level: 1,
    profileImageUrl: "https://placehold.co/100x100?text=User8",
    totalFavoriteCount: 30,
    totalAnswerCount: 8,
    totalScore: 65,
=======
    totalFavoriteCount: 7,
    totalAnswerCount: 17,
    totalScore: 24,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User9",
    rank: 9,
<<<<<<< HEAD
    level: 2,
    profileImageUrl: "https://placehold.co/100x100?text=User9",
    totalFavoriteCount: 12,
    totalAnswerCount: 17,
    totalScore: 60,
=======
    totalFavoriteCount: 11,
    totalAnswerCount: 12,
    totalScore: 23,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User10",
    rank: 10,
<<<<<<< HEAD
    level: 1,
    profileImageUrl: "https://placehold.co/100x100?text=User10",
    totalFavoriteCount: 8,
    totalAnswerCount: 5,
    totalScore: 55,
=======
    totalFavoriteCount: 15,
    totalAnswerCount: 9,
    totalScore: 24,
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
];

export const answerRankingMockData: RankingItem[] = [
  {
<<<<<<< HEAD
    nickname: "User7",
    rank: 1,
    level: 3,
    profileImageUrl: "https://placehold.co/100x100?text=User7",
    totalFavoriteCount: 5,
    totalAnswerCount: 25,
    totalScore: 68,
  },
  {
    nickname: "User4",
    rank: 2,
    level: 5,
    profileImageUrl: "https://placehold.co/100x100?text=User4",
    totalFavoriteCount: 10,
    totalAnswerCount: 22,
    totalScore: 78,
  },
  {
    nickname: "User2",
    rank: 3,
    level: 4,
    profileImageUrl: "https://placehold.co/100x100?text=User2",
    totalFavoriteCount: 15,
    totalAnswerCount: 20,
    totalScore: 85,
  },
  {
    nickname: "User3",
    rank: 4,
    level: 3,
    profileImageUrl: "https://placehold.co/100x100?text=User3",
    totalFavoriteCount: 20,
    totalAnswerCount: 18,
    totalScore: 80,
  },
  {
    nickname: "User9",
    rank: 5,
    level: 2,
    profileImageUrl: "https://placehold.co/100x100?text=User9",
    totalFavoriteCount: 12,
    totalAnswerCount: 17,
    totalScore: 60,
=======
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
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User6",
    rank: 6,
<<<<<<< HEAD
    level: 4,
    profileImageUrl: "https://placehold.co/100x100?text=User6",
    totalFavoriteCount: 22,
    totalAnswerCount: 15,
    totalScore: 70,
  },
  {
    nickname: "User5",
    rank: 7,
    level: 2,
    profileImageUrl: "https://placehold.co/100x100?text=User5",
    totalFavoriteCount: 18,
    totalAnswerCount: 12,
    totalScore: 75,
  },
  {
    nickname: "User1",
    rank: 8,
    level: 5,
    profileImageUrl: "https://placehold.co/100x100?text=User1",
    totalFavoriteCount: 25,
    totalAnswerCount: 10,
    totalScore: 90,
  },
  {
    nickname: "User8",
    rank: 9,
    level: 1,
    profileImageUrl: "https://placehold.co/100x100?text=User8",
    totalFavoriteCount: 30,
    totalAnswerCount: 8,
    totalScore: 65,
=======
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
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User10",
    rank: 10,
<<<<<<< HEAD
    level: 1,
    profileImageUrl: "https://placehold.co/100x100?text=User10",
    totalFavoriteCount: 8,
    totalAnswerCount: 5,
    totalScore: 55,
  },
];
export const favoriteRankingMockData: RankingItem[] = [
  {
    nickname: "User8",
    rank: 1,
    level: 1,
    profileImageUrl: "https://placehold.co/100x100?text=User8",
    totalFavoriteCount: 30,
    totalAnswerCount: 8,
    totalScore: 65,
  },
  {
    nickname: "User1",
    rank: 2,
    level: 5,
    profileImageUrl: "https://placehold.co/100x100?text=User1",
    totalFavoriteCount: 25,
    totalAnswerCount: 10,
    totalScore: 90,
  },
  {
    nickname: "User6",
    rank: 3,
    level: 4,
    profileImageUrl: "https://placehold.co/100x100?text=User6",
    totalFavoriteCount: 22,
    totalAnswerCount: 15,
    totalScore: 70,
  },
  {
    nickname: "User3",
    rank: 4,
    level: 3,
    profileImageUrl: "https://placehold.co/100x100?text=User3",
    totalFavoriteCount: 20,
    totalAnswerCount: 18,
    totalScore: 80,
=======
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
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
  },
  {
    nickname: "User5",
    rank: 5,
<<<<<<< HEAD
    level: 2,
    profileImageUrl: "https://placehold.co/100x100?text=User5",
    totalFavoriteCount: 18,
    totalAnswerCount: 12,
    totalScore: 75,
  },
  {
    nickname: "User2",
    rank: 6,
    level: 4,
    profileImageUrl: "https://placehold.co/100x100?text=User2",
    totalFavoriteCount: 15,
    totalAnswerCount: 20,
    totalScore: 85,
  },
  {
    nickname: "User9",
    rank: 7,
    level: 2,
    profileImageUrl: "https://placehold.co/100x100?text=User9",
    totalFavoriteCount: 12,
    totalAnswerCount: 17,
    totalScore: 60,
  },
  {
    nickname: "User4",
    rank: 8,
    level: 5,
    profileImageUrl: "https://placehold.co/100x100?text=User4",
    totalFavoriteCount: 10,
    totalAnswerCount: 22,
    totalScore: 78,
  },
  {
    nickname: "User10",
    rank: 9,
    level: 1,
    profileImageUrl: "https://placehold.co/100x100?text=User10",
    totalFavoriteCount: 8,
    totalAnswerCount: 5,
    totalScore: 55,
  },
  {
    nickname: "User7",
    rank: 10,
    level: 3,
    profileImageUrl: "https://placehold.co/100x100?text=User7",
    totalFavoriteCount: 5,
    totalAnswerCount: 25,
    totalScore: 68,
=======
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
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
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
