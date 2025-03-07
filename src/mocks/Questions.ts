import { fakerKO as faker } from "@faker-js/faker";
import { Category, Question } from "../models/Question.model";
import { http, HttpResponse } from "msw";

export const categories = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/categories`,
  () => {
    const categoriesData: Category[] = Array.from({ length: 20 }).map(
      (value, index) => ({
        id: index,
        name: faker.word.noun(),
      })
    );
    return HttpResponse.json(categoriesData, { status: 200 });
  }
);

export const questions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/questions`,
  () => {
    const questionsData: Question[] = Array.from({ length: 20 }).map(
      (value, index) => ({
        id: index,
        categoryId: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
        title: faker.lorem.sentence(),
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);
