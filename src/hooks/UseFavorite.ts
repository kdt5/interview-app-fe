import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchFavoriteQuestions } from "../api/Favorite.api";

interface UseFavoriteReturn {
  favoriteQuestions: Question[];
}

export function useFavorite(): UseFavoriteReturn {
  const [favoriteQuestions, setFavoriteQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      fetchFavoriteQuestions().then((response) => {
        const questions: Question[] = response.map((field) => {
          return {
            id: field.question.id,
            title: field.question.title,
            categories: [],
            isAnswered: false,
          };
        });
        setFavoriteQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { favoriteQuestions };
}
