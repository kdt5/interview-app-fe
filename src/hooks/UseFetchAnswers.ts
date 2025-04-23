import { useEffect, useState } from "react";
import { Answer } from "../models/Answer.model";
import { fetchAnswers } from "../api/Answer.api";

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
