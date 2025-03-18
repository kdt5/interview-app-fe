import { useEffect, useState } from "react";
import {
  fetchBasicAnsweredQuestions,
  fetchWeeklyAnsweredQuestions,
} from "../api/Answer.api";
import { Question } from "../models/Question.model";

export function useAnswer() {
  const [weeklyAnsweredQuestions, setWeeklyAnsweredQuestions] = useState<
    Question[]
  >([]);
  const [basicAnsweredQuestions, setBasicAnsweredQuestions] = useState<
    Question[]
  >([]);

  useEffect(() => {
    try {
      fetchBasicAnsweredQuestions().then((questions) => {
        setBasicAnsweredQuestions(questions);
      });
      fetchWeeklyAnsweredQuestions().then((questions) => {
        setWeeklyAnsweredQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    weeklyAnsweredQuestions,
    basicAnsweredQuestions,
  };
}
