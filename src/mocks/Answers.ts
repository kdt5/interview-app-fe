import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";
import { Answer } from "../models/Answer.model";
import { fakerKO as faker } from "@faker-js/faker";
import { Answer } from "../models/Answer.model";

export const basicAnsweredQuestions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.MINE}`,
  () => {
    const questionsData: Answer[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        question: {
          id: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
          title: faker.lorem.sentence(),
          categories: [faker.helpers.rangeToNumber({ min: 0, max: 5 })],
        },
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);

export const weeklyAnsweredQuestions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.WEEKLY}`,
  () => {
    const questionsData: Answer[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        question: {
          id: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
          title: faker.lorem.sentence(),
          categories: [faker.helpers.rangeToNumber({ min: 0, max: 5 })],
        },
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);

export const answer = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.ANSWER_EDIT}`,
  ({ params }) => {
    const { answerId } = params;

    if (typeof answerId !== "string") {
      return HttpResponse.json({ error: "Invalid Id" }, { status: 400 });
    }

    const parsedAnswerId = parseInt(answerId);

    const answersData: Answer[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        content: faker.lorem.paragraph(),
      })
    );

    const answerData = answersData.find((a) => a.id === parsedAnswerId);

    if (answerData) {
      return HttpResponse.json(answerData, { status: 200 });
    } else {
      return HttpResponse.json(
        { error: "답변이 존재하지 않습니다." },
        { status: 404 }
      );
    }
  }
);
