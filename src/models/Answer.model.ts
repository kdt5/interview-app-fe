import { Question } from "./Question.model";

export interface Answer {
  id: number;
  content: string;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    level: number;
    answerCount: number;
  };
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  favoriteCount: number;
  visibility: boolean;
}

export interface AnsweredQuestion extends Answer {
  question: Question;
}
