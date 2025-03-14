export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  categoryId: number;
  title: string;
  content?: string;
  isAnswered: boolean;
}
