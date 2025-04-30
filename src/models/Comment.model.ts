export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    level: number;
    answerCount: number;
  };
  parentId: number | null;
  isDeleted: boolean;
  favoriteCount: number;
}
