import { useEffect, useState } from "react";
import { Category } from "../models/Question.model";
import { fetchCategories } from "../api/Question.api";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    try {
      fetchCategories().then((categories) => {
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
