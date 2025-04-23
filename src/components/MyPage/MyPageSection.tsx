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

function MyPageSection() {
  return (
    <>
      <MyPageMenu>
        <MyPageMenuTitle>질문답변</MyPageMenuTitle>
        <MyPageSectionList iconsrc={MenuIcon01} menu="위클리 내 답변" to="" />
        <MyPageSectionList
          iconsrc={MenuIcon02}
          menu="필수 질문 내 답변"
          to=""
        />
        <MyPageSectionList iconsrc={MenuIcon03} menu="즐겨찾기한 질문" to="" />
      </MyPageMenu>

      <MyPageMenu>
        <MyPageMenuTitle>커뮤니티</MyPageMenuTitle>
        <MyPageSectionList iconsrc={MenuIcon04} menu="내가 쓴 게시글" to="" />
        <MyPageSectionList iconsrc={MenuIcon05} menu="좋아요한 게시글" to="" />
      </MyPageMenu>

      <MyPageMenu>
        <MyPageMenuTitle>고객지원</MyPageMenuTitle>
        <MyPageSectionList iconsrc={MenuIcon06} menu="고객센터" to="" />
        <MyPageSectionList iconsrc={MenuIcon07} menu="의견 남기기" to="" />
        <MyPageSectionList iconsrc={MenuIcon08} menu="약관 및 정책" to="" />
      </MyPageMenu>
    </>
  );
}

export const MyPageMenu = styled(MyPageSectionStyle)``;

const MyPageMenuTitle = styled.h3`
  font-weight: 600;
  color: #333;
  font-size: 16px;
`;

export default MyPageSection;
