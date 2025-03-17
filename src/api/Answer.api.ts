import { Question } from "../models/Question.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchAnsweredQuestions() {
  const response = await backendHttpClient
    .get<Question[]>(`/api/answers/mine`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function recordAnswer(data: {
  answer: string;
  questionId: number;
}) {
  const response = await backendHttpClient
    .post(`/api/answers/record`, {
      id: data.questionId,
      content: data.answer,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
