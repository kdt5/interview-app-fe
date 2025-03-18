import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";
import { Question } from "../models/Question.model";
import { fakerKO as faker } from "@faker-js/faker";

export const basicAnsweredQuestions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.MINE}`,
  () => {
    const questionsData: Question[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        categories: [faker.helpers.rangeToNumber({ min: 0, max: 5 })],
        title: faker.lorem.sentence(),
        isAnswered: true,
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);

export const weeklyAnsweredQuestions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.WEEKLY}`,
  () => {
    const questionsData: Question[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        categories: [faker.helpers.rangeToNumber({ min: 0, max: 5 })],
        title: faker.lorem.sentence(),
        isAnswered: true,
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);
