import { useEffect, useState } from "react";
import {
  fetchAnswer,
  fetchBasicAnsweredQuestions,
  fetchWeeklyAnsweredQuestions,
} from "../api/Answer.api";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { fetchQuestion } from "../api/Question.api";
import { useParams } from "react-router-dom";

export function useAnswer() {
  const [weeklyAnsweredQuestions, setWeeklyAnsweredQuestions] = useState<
    Answer[]
  >([]);
  const [basicAnsweredQuestions, setBasicAnsweredQuestions] = useState<
    Answer[]
  >([]);

  const { questionId, answerId } = useParams<{
    questionId: string;
    answerId: string;
  }>();

  const questionIdNumber = Number(questionId);
  const answerIdNumber = Number(answerId);

  const [question, setQuestion] = useState<Question>();
  const [myAnswer, setMyAnswer] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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

  useEffect(() => {
    if (questionId && questionIdNumber) {
      try {
        fetchQuestion(questionIdNumber).then((question) => {
          setQuestion(question);
          setIsFavorite(question.isFavorite ?? false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [questionId, questionIdNumber]);

  useEffect(() => {
    if (answerId && answerIdNumber) {
      try {
        fetchAnswer(answerIdNumber).then((answer) => {
          setMyAnswer(answer.content);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [answerId, answerIdNumber]);

  return {
    weeklyAnsweredQuestions,
    basicAnsweredQuestions,
    question,
    myAnswer,
    answerIdNumber,
    isFavorite,
  };
}
