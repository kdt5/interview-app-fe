import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchWeeklyQuestions } from "../api/Question.api";

interface UseFetchWeeklyQuestionsReturn {
  weeklyQuestions: Question[];
  isLoading: boolean;
  isError: boolean;
}

export function useFetchWeeklyQuestions(): UseFetchWeeklyQuestionsReturn {
  const [weeklyQuestions, setWeeklyQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      fetchWeeklyQuestions().then((response) => {
        setWeeklyQuestions(
          response.map((weeklyQuestion) => weeklyQuestion.question)
        );
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  }, []);

  return { weeklyQuestions, isLoading, isError };
}
