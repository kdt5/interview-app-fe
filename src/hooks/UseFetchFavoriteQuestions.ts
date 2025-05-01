import { useEffect, useState } from "react";
import { Question } from "../models/Question.model";
import { fetchFavoritePosts, fetchFavoriteQuestions } from "../api/Favorite.api";
import { CommunityPost } from "../models/CommunityPost.model";

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

export function useFavoritePosts() {
  const [favoritePosts, setFavoritePosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    try {
      fetchFavoritePosts().then((post) => {
        setFavoritePosts(post);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { favoritePosts };
}
