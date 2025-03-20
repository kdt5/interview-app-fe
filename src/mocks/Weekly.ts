import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";
import { Question } from "../models/Question.model";
import { fakerKO as faker } from "@faker-js/faker";

export const weeklyQuestion = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.QUESTIONS.WEEKLY}`,
  () => {
    const weeklyQuestionData: Question = {
      id: 1,
      categories: [faker.helpers.rangeToNumber({ min: 0, max: 5 })],
      title: faker.lorem.sentence(),
      isAnswered: faker.datatype.boolean(),
    };

    console.log("weeklyQuestionData", weeklyQuestionData);

    return HttpResponse.json(weeklyQuestionData, { status: 200 });
  }
);
