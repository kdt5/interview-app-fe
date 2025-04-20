import { BACKEND_URLS } from "../constants/Urls";
import { Question } from "../models/Question.model";
import { backendHttpClient } from "./BackendHttpClient.api";
import { replaceUrlParams } from "../utils/Url";
import { Position } from "../constants/Question";

export async function fetchQuestions(
  position: Position,
  categoryId?: number
): Promise<Question[]> {
  const response = await backendHttpClient
    .get<Question[]>(BACKEND_URLS.QUESTIONS.ALL, {
      params: {
        position,
        categoryId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchQuestion(questionId: number): Promise<Question> {
  const response = await backendHttpClient
    .get<Question>(
      replaceUrlParams(BACKEND_URLS.QUESTIONS.QUESTION, {
        questionId: questionId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

interface WeeklyQuestionResponse {
  questionId: number;
  startDate: string;
  question: Question;
}

export async function fetchWeeklyQuestion(): Promise<WeeklyQuestionResponse> {
  const response = await backendHttpClient
    .get<WeeklyQuestionResponse>(BACKEND_URLS.QUESTIONS.WEEKLY_TODAY)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchWeeklyQuestions(): Promise<
  WeeklyQuestionResponse[]
> {
  const response = await backendHttpClient
    .get<WeeklyQuestionResponse[]>(BACKEND_URLS.QUESTIONS.WEEKLY)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
