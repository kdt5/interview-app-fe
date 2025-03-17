import { useEffect, useState } from "react";
import { fetchAnsweredQuestions } from "../api/Answer.api";
import { Question } from "../models/Question.model";

export function useAnswer() {
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      fetchAnsweredQuestions().then((questions) => {
        setAnsweredQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { answeredQuestions };
}
