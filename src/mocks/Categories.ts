import { fakerKO as faker } from "@faker-js/faker";
import { Category } from "../models/Question.model";
import { http, HttpResponse } from "msw";
import { BACKEND_URLS } from "../constants/Urls";

export const categories = http.get(
  `${import.meta.env.VITE_BACKEND_BASE_URL}${BACKEND_URLS.CATEGORIES.ALL}`,
  () => {
    const categoriesData: Category[] = Array.from({ length: 20 }).map(
      (_, index) => ({
        id: index,
        name: faker.word.noun(),
      })
    );
    return HttpResponse.json(categoriesData, { status: 200 });
  }
);

export const categoryImage = http.get(
  `/assets/categories/:imageFileName`,
  async () => {
    try {
      const buffer = await fetch(`https://picsum.photos/20`).then((response) =>
        response.arrayBuffer()
      );
      return HttpResponse.arrayBuffer(buffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
    } catch (error: unknown) {
      console.error(error);
      return HttpResponse.text("Not Found", { status: 404 });
    }
  }
);
