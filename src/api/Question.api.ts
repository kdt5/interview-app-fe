import { BACKEND_URLS } from "../constants/Urls";
import { ALL_CATEGORIES } from "../constants/Question";
import { Category, Question } from "../models/Question.model";
import { backendHttpClient } from "./BackendHttpClient.api";
import { replaceUrlParams } from "../utils/Url";

interface WeeklyQuestionResponse {
  questionDetail: Question;
}

export async function fetchCategories() {
  const response = await backendHttpClient
    .get<Category[]>(BACKEND_URLS.CATEGORIES.ALL)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchQuestions(categoryId: number) {
  const response = await backendHttpClient
    .get<Question[]>(BACKEND_URLS.QUESTIONS.ALL, {
      params: {
        categoryId: categoryId === ALL_CATEGORIES ? "" : categoryId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchQuestion(questionId: number) {
  const response = await backendHttpClient
    .get<WeeklyQuestionResponse>(
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

export async function fetchWeeklyQuestion() {
  const response = await backendHttpClient
    .get<WeeklyQuestionResponse>(BACKEND_URLS.QUESTIONS.WEEKLY)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
