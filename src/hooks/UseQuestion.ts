import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import {
  fetchCategories,
  fetchQuestions,
  fetchWeeklyQuestion,
} from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";
import { useCategory } from "./UseCategory";

export function useQuestion() {
  const { categories, setCategories } = useCategory();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [weeklyQuestion, setWeeklyQuestion] = useState<Question>();

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

      fetchWeeklyQuestion().then((question) => {
        setWeeklyQuestion(question);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateQuestions = (categoryId: number) => {
    try {
      fetchQuestions(categoryId).then((questions) => {
        setQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
    questions,
    weeklyQuestion,
    updateQuestions,
  };
}
