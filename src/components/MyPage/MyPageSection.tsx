import styled from "styled-components";
import MyPageSectionList from "./MyPageSectionList";
import MenuIcon01 from "../../assets/mypage/MyPageMenuIcon-01.png";
import MenuIcon02 from "../../assets/mypage/MyPageMenuIcon-02.png";
import MenuIcon03 from "../../assets/mypage/MyPageMenuIcon-03.png";
import MenuIcon04 from "../../assets/mypage/MyPageMenuIcon-04.png";
import MenuIcon05 from "../../assets/mypage/MyPageMenuIcon-05.png";
import MenuIcon06 from "../../assets/mypage/MyPageMenuIcon-06.png";
import MenuIcon07 from "../../assets/mypage/MyPageMenuIcon-07.png";
import MenuIcon08 from "../../assets/mypage/MyPageMenuIcon-08.png";
import { MyPageSectionStyle } from "./MyPageSectionStyle";
import { FRONTEND_URLS } from "../../constants/Urls";

function MyPageSection() {
  return (
    <>
      <MyPageSectionMenu>
        <MyPageSectionMenuTitle>질문답변</MyPageSectionMenuTitle>
        <MyPageSectionList
          iconSource={MenuIcon01}
          menu="위클리 내 답변"
          to={FRONTEND_URLS.MY_PAGE.ANSWERS}
          tabType="위클리"
        />
        <MyPageSectionList
          iconSource={MenuIcon02}
          menu="필수 질문 내 답변"
          to={FRONTEND_URLS.MY_PAGE.ANSWERS}
          tabType="필수 질문"
        />
        <MyPageSectionList
          iconSource={MenuIcon03}
          menu="즐겨찾기한 질문"
          to={FRONTEND_URLS.MY_PAGE.FAVORITES.QUESTIONS}
        />
      </MyPageSectionMenu>

      <MyPageSectionMenu>
        <MyPageSectionMenuTitle>커뮤니티</MyPageSectionMenuTitle>
        <MyPageSectionList
          iconSource={MenuIcon04}
          menu="내가 쓴 게시글"
          to={FRONTEND_URLS.MY_PAGE.POSTS}
        />
        <MyPageSectionList
          iconSource={MenuIcon05}
          menu="좋아요한 게시글"
          to=""
        />
      </MyPageSectionMenu>

      <MyPageSectionMenu>
        <MyPageSectionMenuTitle>고객지원</MyPageSectionMenuTitle>
        <MyPageSectionList iconSource={MenuIcon06} menu="고객센터" to="" />
        <MyPageSectionList iconSource={MenuIcon07} menu="의견 남기기" to="" />
        <MyPageSectionList iconSource={MenuIcon08} menu="약관 및 정책" to="" />
      </MyPageSectionMenu>
    </>
  );
}

export const MyPageSectionMenu = styled(MyPageSectionStyle)``;

const MyPageSectionMenuTitle = styled.h3`
  font-weight: 600;
  color: #333;
  font-size: 16px;
`;

export default MyPageSection;
