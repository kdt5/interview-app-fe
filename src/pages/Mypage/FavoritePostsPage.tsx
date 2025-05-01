import styled from "styled-components";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MyPostBox from "../../components/MyPage/MyPostBox";
import { useFavoritePosts } from "../../hooks/UseFetchFavoriteQuestions";

export default FavoritePostsPage;

function FavoritePostsPage() {
  const { favoritePosts } = useFavoritePosts();

  const options: SwiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 8,
    direction: "vertical",
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
    freeMode: {
      enabled: true,
      sticky: false,
    },
    modules: [FreeMode, Mousewheel],
  };

  return (
    <AnswerHistoryStyle>
      <AnswersStyle>
        <Swiper {...options}>
          {favoritePosts?.map((post) => {
            return (
              <SwiperSlide key={post.id}>
                <MyPostBox
                  postId={post.id}
                  title={post.title}
                  content={post.content}
                  viewCount={post.viewCount}
                  favoriteCount={post.favoriteCount}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </AnswersStyle>
    </AnswerHistoryStyle>
  );
}

const AnswerHistoryStyle = styled.div`
  width: 100%;
  height: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  .answers {
    padding-top: 68px;
  }
`;

const AnswersStyle = styled.div`
  height: 100%;

  .swiper {
    width: min(100%, 393px);
    height: 100%;
    padding: 0 25px;
    z-index: 0;
  }

  .swiper-slide {
    height: fit-content;
  }
`;
