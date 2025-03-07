import { fakerKO as faker } from "@faker-js/faker";
import { Category } from "../models/Question.model";
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

export const categoryImage = http.get(
  `/assets/categories/:imageFileName`,
  () => {
    return HttpResponse.text("an image", {
      status: 200,
    });
  }
);
