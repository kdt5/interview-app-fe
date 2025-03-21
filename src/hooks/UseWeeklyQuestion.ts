import { useEffect, useState } from "react";
import { fetchWeeklyQuestion } from "../api/Question.api";
import { Question } from "../models/Question.model";

export function useWeeklyQuestion() {
  const [weeklyQuestion, setWeeklyQuestion] = useState<Question>();

  useEffect(() => {
    fetchWeeklyQuestion().then((response) => {
      setWeeklyQuestion(response);
    });
  }, []);

  return { weeklyQuestion };
}
