import { WeeklyQuestion } from "../models/WeeklyQuestion.model";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchWeeklyQuestion() {
  const response = await backendHttpClient
    .get<WeeklyQuestion>("/questions/weekly")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
