export interface UserBasicInfo {
  email: string;
  nickname: string;
  positionId: number;
  profileImageUrl?: string;
}

export interface UserStats {
  answerCount: number;
  favoriteCount: number;
  communityPostCount: number;
  commentCount: number;
}
