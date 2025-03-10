import { useEffect, useState } from "react";
import { Category, Question } from "../models/Question.model";
import { fetchCategories, fetchQuestions } from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";

export function useQuestion() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      categories.unshift({
        id: ALL_CATEGORIES,
        name: "전체",
      });
      setCategories(categories);
    });

    fetchQuestions(ALL_CATEGORIES).then((questions) => {
      setQuestions(questions);
    });
  }, []);

  const getQuestions = (categoryId: number) => {
    fetchQuestions(categoryId).then((questions) => {
      setQuestions(questions);
    });
  };

  return {
    categories,
    questions,
    getQuestions,
  };
}
