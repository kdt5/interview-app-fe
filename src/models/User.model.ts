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
  answerCount: number; // 답변 수
  favoriteCount: number; // 받은 좋아요 합계
  communityPostCount: number; // 커뮤니티 게시글 수
  commentCount: number; // 댓글 수
}
