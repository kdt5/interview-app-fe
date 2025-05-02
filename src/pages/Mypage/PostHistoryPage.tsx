import styled from "styled-components";
import { useMyPosts } from "../../hooks/UsePost";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MyPostBox from "../../components/MyPage/MyPostBox";

export default PostHistoryPage;

function PostHistoryPage() {
  const { myPosts } = useMyPosts();

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
          {myPosts?.map((post) => {
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
