import PopularPost from "../common/Community/PopularPost";
import CommunityList from "../common/List/CommunityList";
import SectionTitle from "../common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import CommonCategory from "../common/List/CommonCategory";
import CommunitySmallBtn from "../common/Button/CommunitySmallButton";
import { Link } from "react-router-dom";
import { useCommunityPosts, useTrendingPosts } from "../../hooks/UsePost";
import { FRONTEND_URLS } from "../../constants/Urls";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";

function PostTab() {
  const [selectedCatId, setSelectedCatId] = useState(0);
  const { communityPosts } = useCommunityPosts(
    selectedCatId === 0 ? undefined : selectedCatId
  );
  const { trendingPosts } = useTrendingPosts();

  if (!communityPosts || !trendingPosts) return null;

  return (
    <>
      <SectionTitle>인기글</SectionTitle>
      <PopularSlide>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ type: "fraction" }}
        >
          <SwiperSlide style={{ width: "150px" }}>
            <PopularSlideNotice>
              <div>
                <span>커뮤니티</span>
                <Title>
                  뷰잇러들의 <br /> 지금, 인기글
                </Title>
              </div>
              <Info>INTERVIEW IT</Info>
            </PopularSlideNotice>
          </SwiperSlide>
          {trendingPosts.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "100%" }}>
              <Link
                key={index}
                to={`${FRONTEND_URLS.COMMUNITY.POST}/${item.id}`}
              >
                <PopularPost
                  title={item.title}
                  content={item.content}
                  favoriteCount={item.favoriteCount}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </PopularSlide>
      <MidLine></MidLine>
      <PostList>
        <CommonCategory
          selectedCatId={selectedCatId}
          setSelectedCatId={setSelectedCatId}
        />
        {communityPosts.map((item, index) => (
          <Link key={index} to={`${FRONTEND_URLS.COMMUNITY.POST}/${item.id}`}>
            <CommunityList {...item} />
          </Link>
        ))}
      </PostList>

      <FixedWrite>
        <Link to={FRONTEND_URLS.COMMUNITY.POST_NEW}>
          <CommunitySmallBtn>글쓰기 +</CommunitySmallBtn>
        </Link>
      </FixedWrite>
    </>
  );
}

const PopularSlideNotice = styled.div`
  background-color: #6ea1ff;
  width: 160px;
  height: 160px;
  padding: 15px;
  border-radius: 10px;
  display: grid;
  align-content: space-between;

  span {
    font-size: 12px;
    color: #fff;
    font-weight: 200;
  }
`;

const Title = styled.h3`
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin-top: 3px;
`;

const Info = styled.div`
  font-size: 12px;
  color: #fff;
  height: fit-content;
  font-weight: 200;
`;

const PopularSlide = styled.div`
  padding: 0 30px;

  .swiper-pagination-fraction {
    background: #00000052;
    color: #fff;
    font-size: 12px;
    border-radius: 8px;
    position: relative;
    bottom: 25px;
    width: 32px;
    float: right;
    margin-right: 8px;

    span {
      color: #fff;
      font-weight: 400;
    }
  }
`;

const MidLine = styled.div`
  width: 100%;
  height: 5px;
  background: #f5f5f5;
  margin-top: 50px;
`;
const PostList = styled.div`
  margin-top: 30px;
`;

const FixedWrite = styled.div`
  position: fixed;
  right: calc(50% - 160px); /* 380px의 오른쪽 끝 */
  bottom: 100px;
  z-index: 99;
`;

export default PostTab;
