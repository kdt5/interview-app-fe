export interface UserBasicInfo {
  email: string;
  nickname: string;
  level: number;
  _count: {
    answers: number;
  };
  positionId: number;
  profileImageUrl?: string;
}

export interface UserStats {
  answerCount: number;
  favoriteCount: number;
  communityPostCount: number;
  commentCount: number;
}
