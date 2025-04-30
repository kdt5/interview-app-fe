import { useEffect, useState } from "react";
import { FavoriteTargetType, fetchFavorite } from "../api/Favorite.api";

export function useFavorite(targetId: number, targetType: FavoriteTargetType) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const addFavorite = async () => {
    try {
      await fetchFavorite(targetId, targetType);
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  const removeFavorite = async () => {
    try {
      await fetchFavorite(targetId, targetType);
      setIsFavorite(false);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    if (targetId !== -1) {
      try {
        fetchFavorite(targetId, targetType).then((favorite) => {
          setIsFavorite(favorite);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [targetId, targetType]);

  return { isFavorite, setIsFavorite, addFavorite, removeFavorite };
}
