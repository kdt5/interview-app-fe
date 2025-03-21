export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  categories: string[];
  title: string;
  content?: string;
  isAnswered: boolean;
  isFavorite?: boolean;
}
