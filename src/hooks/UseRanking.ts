import { useQuery } from "@tanstack/react-query";
import { RankingItem } from "../models/Ranking.model";
import {
  fetchAnswerRanking,
  fetchFavoriteRanking,
  fetchIntegrationRanking,
} from "../api/Ranking.api";

export function useIntegrationRanking() {
  return useQuery<RankingItem[]>({
    queryKey: ["integrationRanking"],
    queryFn: fetchIntegrationRanking,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAnswerRanking() {
  return useQuery<RankingItem[]>({
    queryKey: ["answerRanking"],
    queryFn: fetchAnswerRanking,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFavoriteRanking() {
  return useQuery<RankingItem[]>({
    queryKey: ["favoriteRanking"],
    queryFn: fetchFavoriteRanking,
    staleTime: 1000 * 60 * 5,
  });
}
