import { useEffect, useState } from "react";
import { fetchAnsweredQuestions } from "../api/Answer.api";
import { Question } from "../models/Question.model";
import { useParams } from "react-router-dom";
import { fetchQuestion } from "../api/Question.api";

export function useAnswer() {
  const { questionId } = useParams<{ questionId: string }>();
  const questionIdNumber = Number(questionId);

  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    try {
      fetchAnsweredQuestions().then((questions) => {
        setAnsweredQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!questionId) {
      throw new Error("questionId 가 존재하지 않습니다.");
    }

    try {
      fetchQuestion(questionIdNumber).then((question) => {
        setQuestion(question);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { answeredQuestions, question };
}
