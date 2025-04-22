import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchWeeklyQuestion } from "../api/Question.api";

export function useFetchWeeklyQuestion() {
  const [weeklyQuestion, setWeeklyQuestion] = useState<Question>();

  useEffect(() => {
    fetchWeeklyQuestion().then((response) => {
      setWeeklyQuestion(response.question);
    });
  }, []);

  return { weeklyQuestion };
}
