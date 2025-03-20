import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";
import { Answer } from "../models/Answer.model";
import { fakerKO as faker } from "@faker-js/faker";

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
