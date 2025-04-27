import { useQuery } from "@tanstack/react-query";
import { RankingItem } from "../models/Ranking.model";
import {
  fetchAnswerRanking,
  fetchFavoriteRanking,
  fetchIntegrationRanking,
} from "../api/Ranking.api";

<<<<<<< HEAD
=======
// 통합 랭킹 조회 훅
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
export function useIntegrationRanking() {
  return useQuery<RankingItem[]>({
    queryKey: ["integrationRanking"],
    queryFn: fetchIntegrationRanking,
<<<<<<< HEAD
    staleTime: 1000 * 60 * 5,
  });
}

=======
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh
  });
}

// 답변수 랭킹 조회 훅
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
export function useAnswerRanking() {
  return useQuery<RankingItem[]>({
    queryKey: ["answerRanking"],
    queryFn: fetchAnswerRanking,
    staleTime: 1000 * 60 * 5,
  });
}

<<<<<<< HEAD
=======
// 좋아요수 랭킹 조회 훅
>>>>>>> ad7bcf1 (feature/랭킹페이지 통합,답변,좋아요  api 구현)
export function useFavoriteRanking() {
  return useQuery<RankingItem[]>({
    queryKey: ["favoriteRanking"],
    queryFn: fetchFavoriteRanking,
    staleTime: 1000 * 60 * 5,
  });
}
