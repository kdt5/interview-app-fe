import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchWeeklyQuestions } from "../api/Question.api";

export function useFetchWeeklyQuestions() {
  const [weeklyQuestions, setWeeklyQuestions] = useState<Question[]>();

  useEffect(() => {
    fetchWeeklyQuestions().then((response) => {
      setWeeklyQuestions(response.map((question) => question.question));
    });
  }, []);

  return { weeklyQuestions };
}
