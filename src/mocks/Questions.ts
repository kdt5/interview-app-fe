import { fakerKO as faker } from "@faker-js/faker";
import { Question } from "../models/Question.model";
import { http, HttpResponse } from "msw";

export const questions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/questions`,
  () => {
    const questionsData: Question[] = Array.from({ length: 20 }).map(
      (value, index) => ({
        id: index,
        categoryId: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
        title: faker.lorem.sentence(),
        isAnswered: faker.datatype.boolean(),
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);
