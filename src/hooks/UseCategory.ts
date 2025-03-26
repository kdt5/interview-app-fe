import { useEffect, useState } from "react";
import { Category } from "../models/Question.model";
import { ALL_CATEGORIES, Position } from "../constants/Question";
import { fetchCategories } from "../api/Category.api";

interface UseCategoryReturn {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  getCategoryName: (categoryId: number) => string;
}

export function useCategory(position?: Position): UseCategoryReturn {
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
  }, [position]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId);

    return category === undefined ? "" : category.name;
  };

  return {
    categories,
    setCategories,
    getCategoryName,
  };
}
