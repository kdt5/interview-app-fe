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
  categories: { category: { id: number } }[];
  isAnswered?: boolean;
  isFavorite?: boolean;
  answerCount?: number;
}

export interface WeeklyQuestion extends Question {
  weekLabel: string;
}
