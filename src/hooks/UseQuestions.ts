import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchQuestions, Position } from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";
import { useCategory } from "./UseCategory";

export function useQuestions(position: Position) {
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
  }, []);

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
    updateQuestions,
    getCategoryName,
  };
}
