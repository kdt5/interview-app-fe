import { FavoriteTargetType } from "../../api/Favorite.api";
import { useFavorite } from "../../hooks/UseFavorite";
import LikeImg from "../../assets/Like.png";
import ActiveLikeImg from "../../assets/Like_active.png";
import SmallLikeImg from "../../assets/Link_Small.png";
import ActiveSmallLikeImg from "../../assets/Link_Small_active.png";

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
        setIsFavorite(false);
        if (handleToggleLike) {
          handleToggleLike(false);
        }
      } else {
        await addFavorite();
        setIsFavorite(true);
        if (handleToggleLike) {
          handleToggleLike(true);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      setIsFavorite((prev) => !prev);
    }
  };

  return (
    <img
      src={
        isFavorite
          ? targetType === "comment"
            ? ActiveSmallLikeImg
            : ActiveLikeImg
          : targetType === "comment"
            ? SmallLikeImg
            : LikeImg
      }
      alt={alt}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    />
  );
}
