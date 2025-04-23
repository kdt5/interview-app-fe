import PopularPost from "../common/Community/PopularPost";
import CommunityList from "../common/List/CommunityList";
import SectionTitle from "../common/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";
import CommonCategory from "../common/List/CommonCategory";
import CommunitySmallBtn from "../common/Button/CommunitySmallButton";
import { Link } from "react-router-dom";
import { useCommunityPosts } from "../../hooks/UsePost";
import { FRONTEND_URLS } from "../../constants/Urls";

const popularpost = [
  {
    title: "오늘 면접 보고 왔는데요",
    contents:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각",
    comments: 23,
    likes: 53,
  },

  {
    title: "오늘 면접 보고 왔는데요",
    contents:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각",
    comments: 23,
    likes: 53,
  },

  {
    title: "오늘 면접 보고 왔는데요",
    contents:
      "오늘 에이전시 프론트 개발 포지션 면접을 보고 왔습니다. 질문을 받았는데 답변을 제대로 못했어요. 근데 나는 귀여우니까 괜찮다고 생각",
    comments: 23,
    likes: 53,
  },
];


function PostTab() {
  const { communityPosts } = useCommunityPosts();

  return (
    <>
      <SectionTitle to="/">인기글</SectionTitle>
      <PopularSlide>
        <Swiper spaceBetween={15} slidesPerView="auto">
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
          {popularpost.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "100%" }}>
              <PopularPost {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </PopularSlide>

      <PostList>
        <CommonCategory></CommonCategory>
        {communityPosts.map((item, index) => (
          <Link key={index} to={`${FRONTEND_URLS.COMMUNITY.POST}/${item.id}`}>
            <CommunityList {...item} />
          </Link>
        ))}
      </PostList>

      <FixedWrite>
        <Link to="/postwrite">
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
`;

const PostList = styled.div`
  margin-top: 50px;
`;

const FixedWrite = styled.div`
  position: fixed;
  right: calc(50% - 160px); /* 380px의 오른쪽 끝 */
  bottom: 100px;
  z-index: 99;
`;

export default PostTab;
