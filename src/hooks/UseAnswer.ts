import { useEffect, useState } from "react";
import { fetchAnswer } from "../api/Answer.api";
import { Question } from "../models/Question.model";
import { fetchQuestion } from "../api/Question.api";

export function useAnswer(questionId: number, answerId: number) {
  const [question, setQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    try {
      fetchQuestion(questionId).then((question) => {
        setQuestion(question);

        if (question.isFavorite === undefined) {
          return;
        }

        setIsFavorite(question.isFavorite);
      });
    } catch (error) {
      console.log(error);
    }
  }, [questionId]);

  useEffect(() => {
    try {
      fetchAnswer(answerId).then((answer) => {
        setAnswer(answer.content);
      });
    } catch (error) {
      console.log(error);
    }
  }, [answerId]);

  return {
    question,
    answer,
    isFavorite,
    setAnswer,
    setIsFavorite,
  };
}
