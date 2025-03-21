export interface Answer {
  id: number;
  content: string;
  question: {
    id: number;
    title: string;
    categories: string[];
  };
}
