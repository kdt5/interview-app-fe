import { useEffect, useState } from "react";
import {
  fetchWeeklyQuestion,
  WeeklyQuestionResponse,
} from "../api/Question.api";

export function useFetchWeeklyQuestion() {
  const [weeklyQuestion, setWeeklyQuestion] =
    useState<WeeklyQuestionResponse | null>(null);

  useEffect(() => {
    fetchWeeklyQuestion().then((response) => {
      setWeeklyQuestion(response);
    });
  }, []);

  return { weeklyQuestion };
}
