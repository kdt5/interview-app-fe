import { useEffect, useState } from "react";
import { Category } from "../models/Question.model";
import { fetchCategories, Position } from "../api/Question.api";
import { ALL_CATEGORIES } from "../constants/Question";

export function useCategory(position?: Position) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    try {
      fetchCategories(position).then((categories) => {
        if (categories === undefined) {
          return;
        }

        categories.unshift({
          id: ALL_CATEGORIES,
          name: "전체",
        });

        setCategories(categories);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId);

    return category !== undefined ? category.name : "";
  };

  return {
    categories,
    setCategories,
    getCategoryName,
  };
}
