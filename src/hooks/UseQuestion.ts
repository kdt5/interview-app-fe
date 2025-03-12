import { useEffect, useState } from "react";
import { Category, Question } from "../models/Question.model";
import { fetchCategories, fetchQuestions } from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";

export function useQuestion() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      fetchCategories().then((categories) => {
        if (categories === undefined) {
          return;
        }

        categories.unshift({
          id: ALL_CATEGORIES,
          name: "전체",
        });
        setCategories(categories);
      });

      fetchQuestions(ALL_CATEGORIES).then((questions) => {
        setQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getQuestions = (categoryId: number) => {
    try {
      fetchQuestions(categoryId).then((questions) => {
        setQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryName = (categoryId: number) => {
    return categories.find((category) => category.id === categoryId)?.name;
  };

  return {
    categories,
    questions,
    getQuestions,
    getCategoryName,
  };
}
