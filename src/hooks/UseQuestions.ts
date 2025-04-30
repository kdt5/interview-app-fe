import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchQuestion, fetchQuestions } from "../api/Question.api";
import { ALL_CATEGORIES, Position } from "../constants/Question";

export function useQuestions(position?: Position, categoryId?: number) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      fetchQuestions(position || undefined, categoryId === 0 ? undefined : categoryId).then((questions) => {
        setQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, [position, categoryId]);

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
    setQuestions,
    updateQuestions,
  };
}

export function useQuestion(questionId: number) {
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    try {
      fetchQuestion(questionId)
      .then((question) => {
        setQuestion(question);
      });
    } catch (error) {
      console.error(error);
    }
  }, [questionId]);

  return {
    question,
    setQuestion,
  };
}
