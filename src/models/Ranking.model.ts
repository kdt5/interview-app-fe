export interface RankingItem {
  //이게 찐임
  nickname: string;
  rank?: number;
  level: number;
  profileImageUrl: string;
  totalFavoriteCount: number;
  totalAnswerCount: number;
  totalScore: number;
}

export interface RankingData {
  id: number;
  username: string;
  level: number;
  like: number;
  comments: number;
  ranking: number;
}
export interface RankingItemTest {
  id: number;
  username: string;
  level: number;
  like: number;
  comments: number;
  ranking: number;
  totalScore: number;
}
