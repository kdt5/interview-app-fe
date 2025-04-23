import { fakerKO as faker } from "@faker-js/faker";
import { Question } from "../models/Question.model";
import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";

const questionsData: Question[] = Array.from({ length: 20 }).map(
  (_, index) => ({
    id: index,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toString(),
    viewCount: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
    favoriteCount: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
    categories: Array.from({ length: 3 }).map((_, index) => ({
      id: index,
    })),
    isAnswered: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    _count: {
      answers: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
    },
  })
);

const questionData = questionsData[0];

export const weeklyQuestion = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.QUESTIONS.WEEKLY_CURRENT}`,
  () => {
    return HttpResponse.json(questionData, { status: 200 });
  }
);

export const questions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.QUESTIONS.ALL}`,
  () => {
    return HttpResponse.json(questionsData, { status: 200 });
  }
);

export const question = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.QUESTIONS.QUESTION}`,
  ({ params }) => {
    const { questionId } = params;

    if (questionId === undefined) {
      return HttpResponse.json(
        { error: "Invalid questionId" },
        { status: 400 }
      );
    }

    const parsedId = parseInt(questionId as string);

    if (isNaN(parsedId)) {
      return HttpResponse.json(
        { error: "Invalid questionId" },
        { status: 400 }
      );
    }

    return HttpResponse.json(questionData, { status: 200 });
  }
);
