import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchFavoriteQuestions } from "../api/Favorite.api";

export function useFavorite() {
  const [favoriteQuestions, setFavoriteQuestions] = useState<Question[]>([]);

  useEffect(() => {
    try {
      fetchFavoriteQuestions().then((questions) => {
        setFavoriteQuestions(questions);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { favoriteQuestions };
}
