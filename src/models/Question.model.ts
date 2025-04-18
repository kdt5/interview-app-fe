export interface Category {
  id: number;
  name?: string;
}

export interface Question {
  id: number;
  title: string;
  content?: string;
  createdAt: string;
  viewCount: number;
  favoriteCount: number;
  categories: { id: number }[];
  isAnswered?: boolean;
  isFavorite?: boolean;
  _count?: {
    answers: number;
  };
}
