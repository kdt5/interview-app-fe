export interface Answer {
  id: number;
  question: {
    id: number;
    title: string;
    categories: number[];
  };
  content: string;
}
