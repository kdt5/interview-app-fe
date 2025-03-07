import { Category, Question } from "../models/Question.model";
import { axiosInstance } from "./HttpClient.api";

export async function fetchCategories() {
  const response = await axiosInstance
    .get<Category[]>(`/categories`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return [] as Category[];
    });

  return response;
}

export async function fetchQuestions(categoryId: number) {
  const response = await axiosInstance
    .get<Question[]>(`/questions`, {
      params: {
        categoryId: categoryId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return [] as Question[];
    });

  return response;
}
