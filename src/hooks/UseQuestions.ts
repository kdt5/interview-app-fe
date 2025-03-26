import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchQuestions } from "../api/Question.api";
import { ALL_CATEGORIES, Position } from "../constants/Question";

interface UseQuestionsReturn {
  questions: Question[];
  updateQuestions: (newCategoryId: number) => void;
}

export function useQuestions(position: Position): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      fetchQuestions(position).then((questions) => {
        setQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, [position]);

  const updateQuestions = (newCategoryId: number) => {
    try {
      const categoryId =
        newCategoryId === ALL_CATEGORIES ? undefined : newCategoryId;
      fetchQuestions(position, categoryId).then((questions) => {
        setQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    questions,
    updateQuestions,
  };
}
