import { useEffect, useState } from "react";
import {
  fetchWeeklyQuestion,
  WeeklyQuestionResponse,
} from "../api/Question.api";

export function useFetchWeeklyQuestion() {
  const [weeklyQuestion, setWeeklyQuestion] =
    useState<WeeklyQuestionResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchWeeklyQuestion()
      .then((response) => {
        if(isMounted && response) {
          setWeeklyQuestion(response);
        }
      })
      .catch((error) => {
        console.error("Weekly question fetch error:", error);
      });
  
    return () => {
      isMounted = false;
    };
  }, []);

  return { weeklyQuestion };
}
