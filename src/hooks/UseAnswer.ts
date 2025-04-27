import { useEffect, useState } from "react";
import { fetchAnswer } from "../api/Answer.api";
import { Question } from "../models/Question.model";
import { fetchQuestion } from "../api/Question.api";

interface UseAnswerReturn {
  question?: Question;
  answer: string;
  isFavorite: boolean;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useAnswer(
  questionId: number,
  answerId?: number
): UseAnswerReturn {
  const [question, setQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    try {
      fetchQuestion(questionId).then((question) => {
        setQuestion(question);
      });
    } catch (error) {
      console.log(error);
    }
  }, [questionId]);

  useEffect(() => {
    if (answerId === undefined) {
      return;
    }

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
