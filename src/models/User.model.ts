export interface UserBasicInfo {
  email: string;
  nickname: string;
  level: number;
  answerCount: number;
  positionId: number;
  profileImageUrl?: string;
}

export interface SignUpInputs {
  email: string;
  password: string;
  nickname: string;
  positionId: number;
}

export interface UserStats {
  answerCount: number; // 답변 수
  favoriteCount: number; // 받은 좋아요 합계
  communityPostCount: number; // 커뮤니티 게시글 수
  commentCount: number; // 댓글 수
  levelUpProgress: {
    currentPoints: number;
    requiredPoints: number;
    progressPercent: number;
  };
}
