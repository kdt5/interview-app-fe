import axios, { HttpStatusCode } from "axios";
import { BACKEND_URLS } from "../constants/Urls";
import { AnsweredQuestion } from "../models/Answer.model";
import { replaceUrlParams } from "../utils/Url";
import { backendHttpClient } from "./BackendHttpClient.api";

interface RecordAnswerResponse {
  answerId: string;
}

export async function fetchBasicAnsweredQuestions(): Promise<
  AnsweredQuestion[]
> {
  const response = await backendHttpClient
    .get<AnsweredQuestion[]>(BACKEND_URLS.ANSWERS.MINE.BASIC)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchWeeklyAnsweredQuestions(): Promise<
  AnsweredQuestion[]
> {
  const response = await backendHttpClient
    .get<AnsweredQuestion[]>(BACKEND_URLS.ANSWERS.MINE.WEEKLY)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function recordAnswer(
  answer: string,
  questionId: number
): Promise<string> {
  const response = await backendHttpClient
    .post<RecordAnswerResponse>(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_RECORD, {
        questionId: questionId.toString(),
      }),
      {
        id: questionId,
        content: answer,
      }
    )
    .then((response) => {
      if (response.status === HttpStatusCode.Created) {
        return response.data.answerId;
      } else {
        throw new Error("답변 생성 실패");
      }
    })
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function editAnswer(
  answerId: number,
  newAnswer: string
): Promise<boolean> {
  const response = await backendHttpClient
    .patch(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      }),
      {
        newAnswer: newAnswer,
      }
    )
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function deleteAnswer(answerId: number): Promise<boolean> {
  const response = await backendHttpClient
    .delete(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      })
    )
    .then((response) => response.status === HttpStatusCode.NoContent)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchAnswer(answerId: number): Promise<AnsweredQuestion> {
  const response = await backendHttpClient
    .get<AnsweredQuestion>(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchAnswers(
  questionId: number
): Promise<AnsweredQuestion[]> {
  const response = await backendHttpClient
    .get<AnsweredQuestion[]>(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_LIST, {
        questionId: questionId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchAnswerOwnership(answerId: number): Promise<boolean> {
  try {
    await backendHttpClient.get<boolean>(
      replaceUrlParams(BACKEND_URLS.ANSWERS.OWNERSHIP, {
        answerId: answerId.toString(),
      })
    );
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return false;
    }
    throw error;
  }
}
