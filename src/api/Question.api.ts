import { ALL_CATEGORIES } from "../constants/Question";
import { Category, Question } from "../models/Question.model";
import { WeeklyQuestion } from "../models/WeeklyQuestion.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchCategories() {
  const response = await backendHttpClient
    .get<Category[]>(`/categories`)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });

  return response;
}

export async function fetchQuestions(categoryId: number) {
  const response = await backendHttpClient
    .get<Question[]>(`/questions`, {
      params: {
        categoryId: categoryId === ALL_CATEGORIES ? "" : categoryId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });

  return response;
}

export async function fetchWeeklyQuestion() {
  const response = await backendHttpClient
    .get<WeeklyQuestion>("/questions/weekly")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
