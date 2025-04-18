export interface UserBasicInfo {
  email: string;
  nickname: string;
  level: number;
  _count: {
    answers: number;
  };
  profileImageUrl?: string;
}
