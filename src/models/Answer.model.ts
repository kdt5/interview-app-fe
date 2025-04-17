import { Question } from "./Question.model";
import { UserBasicInfo } from "./User.model";

export interface Answer {
  id: number;
  content: string;
  user: UserBasicInfo;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  favoriteCount: number;
}

export interface AnsweredQuestion {
  question: Question;
  answer: Answer;
}
