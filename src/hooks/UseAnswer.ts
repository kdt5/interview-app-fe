import { useEffect, useState } from "react";
import {
  fetchBasicAnsweredQuestions,
  fetchWeeklyAnsweredQuestions,
} from "../api/Answer.api";
import { Answer } from "../models/Answer.model";

export function useAnswer() {
  const [weeklyAnsweredQuestions, setWeeklyAnsweredQuestions] = useState<
    Answer[]
  >([]);
  const [basicAnsweredQuestions, setBasicAnsweredQuestions] = useState<
    Answer[]
  >([]);

  useEffect(() => {
    try {
      fetchBasicAnsweredQuestions().then((answers) => {
        setBasicAnsweredQuestions(answers);
      });
      fetchWeeklyAnsweredQuestions().then((answers) => {
        setWeeklyAnsweredQuestions(answers);
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
