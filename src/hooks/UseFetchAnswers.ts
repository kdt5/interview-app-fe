import { useEffect, useState } from "react";
import { Answer, AnsweredQuestion } from "../models/Answer.model";
import { fetchAnswer, fetchAnswers } from "../api/Answer.api";

export function useFetchAnswers(questionId: number) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    fetchAnswers(questionId)
      .then((fetchedAnswers) => {
        setAnswers(fetchedAnswers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { answers, loading, error };
}

export function useFetchAnswer(answerId: number) {
  const [answer, setAnswer] = useState<AnsweredQuestion>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    fetchAnswer(answerId)
      .then((answer) => {
        setAnswer(answer);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { answer, loading, error };
}
