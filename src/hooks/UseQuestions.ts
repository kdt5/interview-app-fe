import { useEffect, useState } from "react";
import { Category, Question } from "../models/Question.model";
import { fetchQuestions, Position } from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";
import { useCategory } from "./UseCategory";

interface UseQuestionsReturn {
  categories: Category[];
  questions: Question[];
  getCategoryName: (categoryId: number) => string;
  updateQuestions: (newCategoryId: number) => void;
}

export function useQuestions(position: Position): UseQuestionsReturn {
  const { categories, getCategoryName } = useCategory(position);
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
    categories,
    questions,
    getCategoryName,
    updateQuestions,
  };
}
