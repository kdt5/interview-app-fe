export interface RankingItem {
  user: {
    nickname: string;
    level: number;
    profileImageUrl: string;
  };
  rank?: number;
  totalFavoriteCount: number;
  totalAnswerCount: number;
  totalScore: number;
}
