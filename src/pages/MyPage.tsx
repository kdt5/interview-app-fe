import styled from "styled-components";
import { useAuth } from "../hooks/UseAuth";
import { useUser } from "../hooks/UseUser";
import { FRONTEND_URLS } from "../constants/Urls";
import MyPageSection from "../components/MyPage/MyPageSection";
import { MyPageSectionStyle } from "../components/MyPage/MyPageSectionStyle";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MyPage() {
  const navigate = useNavigate();
  const { isAuthenticated, me, isLoading: isAuthLoading } = useAuth();
  const {
    userStats,
    isLoading: isUserLoading,
    error,
  } = useUser({ isAuthenticated });

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate(FRONTEND_URLS.LOGIN);
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  // 로딩 상태 체크
  if (isAuthLoading || isUserLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태 체크
  if (error) {
    return (
      <NewMypageStyle>
        <div style={{ textAlign: "center", padding: "20px", color: "#ff4d4d" }}>
          사용자 정보를 불러오는데 실패했습니다.
        </div>
      </NewMypageStyle>
    );
  }

  // 인증되지 않은 상태 체크
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <NewMypageStyle>
        <MyProfileStyle to={FRONTEND_URLS.MY_PAGE.EDIT.PROFILE}>
          <div className="profile-wrap">
            <div className="profile-icon"></div>
            <div>
              <h2>{me?.nickname}</h2>
              <span>Front-End</span>
            </div>
          </div>
          <FaChevronRight></FaChevronRight>
        </MyProfileStyle>

        <MyInfo>
          <MyInfoBox>
            <span>답변 질문 수</span>
            <p>{userStats?.answerCount}</p>
          </MyInfoBox>
          <MyInfoBox>
            <span>작성 게시글</span>
            <p>{userStats?.communityPostCount}</p>
          </MyInfoBox>
          <MyInfoBox>
            <span>누적 좋아요</span>
            <p>{userStats?.favoriteCount}</p>
          </MyInfoBox>
        </MyInfo>
        <MyPageSection></MyPageSection>
      </NewMypageStyle>
    </>
  );
}

//추가
const NewMypageStyle = styled.div`
  background-color: #fbfbfb;
  width: 100%;
  height: fit-content;
  padding: 0 30px 100px;
`;

const MyInfo = styled(MyPageSectionStyle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MyInfoBox = styled.div`
  width: calc(100% / 3);
  border-right: solid 1px #f8f8f8;
  text-align: center;

  span {
    font-size: 12px;
    color: #888;
    font-weight: 300;
  }

  &:last-child {
    border-right: none;
  }
`;

const MyProfileStyle = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0;

  .profile-wrap {
    display: flex;
    align-items: center;
    justify-content: left;

    .profile-icon {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      background-color: #ccc;
      margin-right: 10px;
    }

    div {
      h2 {
        font-weight: 600;
        font-size: 18px;
      }
      span {
        color: #888;
        font-weight: 300;
        border-radius: 15px;
      }
    }
  }
`;

export default MyPage;
