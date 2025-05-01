import { useEffect, useState } from "react";
import {
  FavoriteTargetType,
  fetchFavorite,
  addFavorite as addFavoriteApi,
  removeFavorite as removeFavoriteApi,
} from "../api/Favorite.api";

export function useFavorite(targetId: number, targetType: FavoriteTargetType) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addFavorite = async () => {
    try {
      setIsLoading(true);
      await addFavoriteApi(targetId, targetType);
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding favorite:", error);
      setIsFavorite(false);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async () => {
    try {
      setIsLoading(true);
      await removeFavoriteApi(targetId, targetType);
      setIsFavorite(false);
    } catch (error) {
      console.error("Error removing favorite:", error);
      setIsFavorite(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (targetId !== -1) {
      const loadFavorite = async () => {
        try {
          const favorite = await fetchFavorite(targetId, targetType);
          setIsFavorite(favorite);
        } catch (error) {
          console.error(error);
        }
      };
      loadFavorite();
    }
  }, [targetId, targetType]);

  return { isFavorite, setIsFavorite, addFavorite, removeFavorite, isLoading };
}
