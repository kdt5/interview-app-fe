export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  categories: number[];
  title: string;
  content?: string;
  isAnswered: boolean;
}
