import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchFavorite, fetchFavoriteQuestions } from "../api/Favorite.api";

export function useFavoriteQuestions() {
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

export function useFavorite(targetId: number, targetType: string) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    try {
      fetchFavorite(targetId, targetType).then((favorite) => {
        setIsFavorite(favorite);
      });
    } catch (error) {
      console.error(error);
    }
  }, [targetId, targetType]);

  return { isFavorite, setIsFavorite };
}