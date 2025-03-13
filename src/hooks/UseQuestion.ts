import { useEffect, useState } from "react";
import { Category, Question } from "../models/Question.model";
import { fetchCategories, fetchQuestions } from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";

export function useQuestion() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);

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

  useEffect(() => {
    if (questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setRandomQuestion(questions[randomIndex]);
    }
  }, [questions]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "카테고리 없음";
  };

  return {
    categories,
    questions,
    getQuestions,
    randomQuestion,
    getCategoryName,
  };
}
