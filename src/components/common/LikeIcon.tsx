import { FavoriteTargetType } from "../../api/Favorite.api";
import { useFavorite } from "../../hooks/UseFavorite";
import LikeImg from "../../assets/Like.png";
import ActiveLikeImg from "../../assets/Like_active.png";

interface LikeIconProps {
  likeId: number;
  targetType: FavoriteTargetType;
  handleToggleLike?: (isFavorite: boolean) => void;
  alt?: string;
}
export function LikeIcon({
  likeId,
  targetType,
  handleToggleLike,
  alt,
}: LikeIconProps) {
  const { isFavorite, setIsFavorite, addFavorite, removeFavorite } =
    useFavorite(likeId, targetType);

  const onClick = async () => {
    try {
      if (isFavorite) {
        await removeFavorite();
      } else {
        await addFavorite();
      }
      setIsFavorite((prev) => !prev);
      if (handleToggleLike) {
        handleToggleLike(isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <img
      src={isFavorite ? ActiveLikeImg : LikeImg}
      alt={alt}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
}
