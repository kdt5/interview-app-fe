import { useEffect, useState } from "react";
import { Category } from "../models/Question.model";
import { Position } from "../constants/Question";
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
        setCategories(categories);
      });
    } catch (error) {
      console.error(error);
    }
  }, [position]);

  const getCategoryName = (categoryId: number) => {
    return (
      categories.find((category) => category.id === categoryId)?.name ?? ""
    );
  };

  return {
    categories,
    setCategories,
    getCategoryName,
  };
}
