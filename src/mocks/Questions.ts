import { fakerKO as faker } from "@faker-js/faker";
import { Question } from "../models/Question.model";
import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";

export const questions = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.QUESTIONS.ALL}`,
  () => {
    const questionsData: Question[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        categoryId: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
        title: faker.lorem.sentence(),
        isAnswered: faker.datatype.boolean(),
      })
    );

    return HttpResponse.json(questionsData, { status: 200 });
  }
);

export const question = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}/api/questions/:questionId`,
  ({ params }) => {
    const { questionId } = params;

    if (typeof questionId !== "string") {
      return HttpResponse.json({ error: "Invalid Id" }, { status: 400 });
    }
    const parsedId = parseInt(questionId);

    const questionsData: Question[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        categoryId: faker.helpers.rangeToNumber({ min: 0, max: 5 }),
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        isAnswered: faker.datatype.boolean(),
      })
    );

    const questionData = questionsData.find((q) => q.id === parsedId);

    if (questionData) {
      return HttpResponse.json(questionData, { status: 200 });
    } else {
      return HttpResponse.json(
        { error: "질문이 존재하지 않습니다." },
        { status: 404 }
      );
    }
  }
);
