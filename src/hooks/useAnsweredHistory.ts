import { useEffect, useState } from "react";
import {
  fetchBasicAnsweredQuestions,
  fetchWeeklyAnsweredQuestions,
} from "../api/Answer.api";
import { Answer } from "../models/Answer.model";

export function useAnsweredHistory() {
  const [basicAnsweredQuestions, setBasicAnsweredQuestions] = useState<
    Answer[]
  >([]);
  const [weeklyAnsweredQuestions, setWeeklyAnsweredQuestions] = useState<
    Answer[]
  >([]);
  const [loading, setLoading] = useState({
    basic: true,
    weekly: true,
  });
  const [error, setError] = useState({
    basic: null,
    weekly: null,
  });

  useEffect(() => {
    fetchBasicAnsweredQuestions()
      .then((answeredQuestion) => {
        setBasicAnsweredQuestions(answeredQuestion);
        setLoading((prev) => ({ ...prev, basic: false }));
      })
      .catch((error) => {
        setError((prev) => ({ ...prev, basic: error }));
      });

    fetchWeeklyAnsweredQuestions()
      .then((answeredQuestion) => {
        setWeeklyAnsweredQuestions(answeredQuestion);
        setLoading((prev) => ({ ...prev, weekly: false }));
      })
      .catch((error) => {
        setError((prev) => ({ ...prev, weekly: error }));
      });

    setWeeklyAnsweredQuestions([]);
    setLoading((prev) => ({ ...prev, weekly: false }));
  }, []);

  return { weeklyAnsweredQuestions, basicAnsweredQuestions, loading, error };
}
