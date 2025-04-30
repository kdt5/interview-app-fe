import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { ALL_CATEGORIES, Position } from "../constants/Question";
import { fetchBasicQuestions } from "../api/Question.api";

interface UseQuestionsReturn {
  questions: Question[];
  isLoading: boolean;
  isError: boolean;
  updateQuestions: (newCategoryId: number) => void;
}

export function useFetchQuestions(
  position?: Position,
  categoryId?: number
): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const updateQuestions = (newCategoryId: number = ALL_CATEGORIES) => {
    try {
      const categoryId =
        newCategoryId === ALL_CATEGORIES ? undefined : newCategoryId;
      fetchBasicQuestions(position, categoryId).then((questions) => {
        setQuestions(questions);
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    updateQuestions(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, categoryId]);

  return {
    questions,
    isLoading,
    isError,
    updateQuestions,
  };
}
