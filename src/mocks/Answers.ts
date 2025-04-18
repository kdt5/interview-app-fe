import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";
import { Answer } from "../models/Answer.model";
import { fakerKO as faker } from "@faker-js/faker";
import { userInfoData } from "./User";

const answersData: Answer[] = Array.from({ length: 20 }).map((_, index) => ({
  id: index,
  content: faker.lorem.paragraph(),
  user: userInfoData,
  createdAt: faker.date.past().toString(),
  updatedAt: faker.date.recent().toString(),
  viewCount: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
  favoriteCount: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
}));

export const basicAnsweredQuestions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.MINE}`,
  () => {
    return HttpResponse.json(answersData, { status: 200 });
  }
);

export const weeklyAnsweredQuestions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.WEEKLY}`,
  () => {
    return HttpResponse.json(answersData, { status: 200 });
  }
);

export const answer = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.ANSWERS.ANSWER_EDIT}`,
  ({ params }) => {
    const { answerId } = params;

    if (answerId === undefined) {
      return HttpResponse.json({ error: "Invalid answerId" }, { status: 400 });
    }

    const parsedId = parseInt(answerId as string);

    if (isNaN(parsedId)) {
      return HttpResponse.json({ error: "Invalid answerId" }, { status: 400 });
    }

    return HttpResponse.json(answersData[0], { status: 200 });
  }
);
