import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchQuestion } from "../api/Question.api";

export function useQuestion(questionId: number) {
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    try {
      fetchQuestion(questionId).then((question) => {
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
