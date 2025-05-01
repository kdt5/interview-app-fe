import { Link } from "react-router-dom";
import styled from "styled-components";
import RankingProfile from "../components/common/Profile/RankingProfile";
import CommonProfile from "../components/common/Profile/CommonProfile";
import { FRONTEND_URLS } from "../constants/Urls";
import { useMyUserData } from "../hooks/UseMyUserData";
import { useUser } from "../hooks/UseUser";
import { useAuth } from "../hooks/UseAuth";
import {
  useAnswerRanking,
  useFavoriteRanking,
  useIntegrationRanking,
} from "../hooks/UseRanking";
import PlaceHolderUserImg from "../assets/user.png";

function RankingMainPage() {
  const { isAuthenticated } = useAuth();
  const {
    userStats,
    isLoading: isUserStatsLoading,
    error: userStatsError,
  } = useUser({ isAuthenticated });

  // 프로필 정보
  const {
    data: myUserData,
    isLoading: isUserLoading,
    error: userError,
  } = useMyUserData();

  // 랭킹 정보
  const {
    data: integrationRankingData,
    isLoading: isIntegrationLoading,
    error: integrationError,
  } = useIntegrationRanking();
  const {
    data: answerRankingData,
    isLoading: isAnswerLoading,
    error: answerError,
  } = useAnswerRanking();
  const {
    data: favoriteRankingData,
    isLoading: isFavoriteLoading,
    error: favoriteError,
  } = useFavoriteRanking();

  if (
    isUserStatsLoading ||
    isUserLoading ||
    isIntegrationLoading ||
    isAnswerLoading ||
    isFavoriteLoading
  ) {
    return <div>Loading...</div>;
  }

  if (
    userStatsError ||
    userError ||
    integrationError ||
    answerError ||
    favoriteError
  ) {
    return <div>Something went wrong.</div>;
  }

  if (!integrationRankingData || !answerRankingData || !favoriteRankingData) {
    return <div>No ranking data available.</div>;
  }

  // 답변수 높은 순 정렬해서 Top 3
  const topIntegrationUsers = [...integrationRankingData]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  // 답변수 높은 순 정렬해서 Top 3
  const topAnswerUsers = [...answerRankingData]
    .sort((a, b) => b.totalAnswerCount - a.totalAnswerCount)
    .slice(0, 3);

  // 좋아요수 높은 순 정렬해서 Top 3
  const topFavoriteUsers = [...favoriteRankingData]
    .sort((a, b) => b.totalFavoriteCount - a.totalFavoriteCount)
    .slice(0, 3);

  return (
    <RankingMainPageStyle>
      <div className="profile">
        <p className="my-profile-text">내 프로필</p>
        <div className="profile-box">
          {myUserData && (
            <CommonProfile
              profileImageUrl={
                myUserData.profileImageUrl
              }
              nickname={myUserData.nickname}
              position={myUserData.positionId === 1 ? "Front-End" : "Back-End"}
              level={myUserData.level}
              answerCount={myUserData.level}
            />
          )}
        </div>
        <div className="counts">
          <div className="answer-count">
            <span className="count-title">답변 질문 수</span>
            <p className="count">{userStats?.answerCount}</p>
          </div>
          <div className="post-count">
            <span className="count-title">작성 게시글</span>
            <p className="count">{userStats?.communityPostCount}</p>
          </div>
          <div className="like-count">
            <span className="count-title">누적 좋아요</span>
            <p className="count">{userStats?.favoriteCount}</p>
          </div>
        </div>
      </div>
      <div className="mid-line"></div>
      <div className="hot-ranking">
        <p className="hot-ranking-text">전체 랭킹 TOP3!</p>
        <h1 className="hot-ranking-title">
          완전 <span className="hot-text">HOT한 </span>뷰잇러
        </h1>
        <div className="hot-users">
          {topIntegrationUsers.map((user, index) => (
            <div
              className="hot-user"
              key={`hot-${user.user.nickname}-${index}`}
            >
              <img src={user.user.profileImageUrl ?? PlaceHolderUserImg} alt={user.user.nickname} />
              <p>{user.user.nickname}</p>
              <span>누적 좋아요 {user.totalFavoriteCount}개</span>
            </div>
          ))}
        </div>
        <Link
          to={FRONTEND_URLS.RANKINGS.MORE}
          className="more-ranking-link-button"
        >
          100위 안의 뷰잇러도 확인하세요!
        </Link>
      </div>
      <div className="answer-ranking">
        <div className="ranking-text-container">
          <h1 className="ranking-title">
            모르는 게 없는 <span className="ranking-text">뷰잇러</span>
          </h1>
          <Link to={FRONTEND_URLS.RANKINGS.MORE} className="more-ranking-link">
            모두보기
          </Link>
        </div>
        <div className="answer-users">
          {topAnswerUsers.map((user, index) => (
            <div
              className="rank-profile-box"
              key={`answer-${user.user.nickname}-${index}`}
            >
              <RankingProfile {...user} />
            </div>
          ))}
        </div>
      </div>
      <div className="like-ranking">
        <div className="ranking-text-container">
          <h1 className="ranking-title">
            많은 사람이 <span className="ranking-text">좋아하는</span>
          </h1>
          <Link to={FRONTEND_URLS.RANKINGS.MORE} className="more-ranking-link">
            모두보기
          </Link>
        </div>
        <div className="like-users">
          {topFavoriteUsers.map((user, index) => (
            <div
              className="rank-profile-box"
              key={`like-${user.user.nickname}-${index}`}
            >
              <RankingProfile {...user} />
            </div>
          ))}
        </div>
      </div>
    </RankingMainPageStyle>
  );
}

const RankingMainPageStyle = styled.div`
  background: #ffffff;
  padding-bottom: 120px;

  .profile {
    padding: 0 30px;

    .my-profile-text {
      margin: 30px 0 10px 0;
    }

    .profile-box {
      width: 100%;
      height: 80px;
      background: #fbfbfb;
      border-radius: 10px;
      padding: 20px 15px 15px;
    }

    .counts {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 10px;

      .post-count {
        width: 110px;
        height: 50px;
        border: 1px solid #f8f8f8;
        border-top: none;
        border-bottom: none;
      }

      .count-title {
        font-size: 12px;
        font-weight: 300;
        color: #888888;
      }

      .count {
        font-size: 14px;
        font-weight: 600;
      }
    }
  }

  .mid-line {
    margin-top: 30px;
    width: 100%;
    height: 5px;
    background: #f5f5f5;
  }

  .hot-ranking {
    padding: 30px;
    background: #fbfbfb;

    .hot-ranking-text {
      font-size: 12px;
      font-weight: 400;
      color: #888888;
      text-align: center;
    }

    .hot-ranking-title {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 30px;

      .hot-text {
        font-weight: 600;
        font-size: 16px;
        color: #6ea1ff;
      }
    }

    .more-ranking-link-button {
      display: inline-block;
      width: 320px;
      height: 40px;
      text-align: center;
      background: #6ea1ff;
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
      border-radius: 5px;
      padding-top: 10px;
    }

    .hot-users {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;

      .hot-user {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .hot-user > p {
        font-size: 14px;
        color: #6ea1ff;
        margin-top: 2px;
      }

      .hot-user > span {
        font-size: 12px;
        font-weight: 300;
        color: #888888;
      }
      .hot-user > img {
        width: 35px;
        height: 35px;
        background-color: #ccc;
        border-radius: 30px;
        display: block;
      }
    }

    .more-btn {
      border-radius: 5px;
      font-weight: 600;
      font-size: 14px;
      width: 320px;
    }
  }

  .more-ranking-link {
    font-size: 12px;
    font-weight: 300;
    color: #888888;
  }

  .rank-profile-box {
    width: 333px;
    height: 80px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 5px 5px 20px rgba(209, 209, 209, 0.25);
    padding: 20px;
    margin-bottom: 10px;
  }

  .answer-ranking,
  .like-ranking {
    padding: 0 30px;
  }

  .answer-users,
  .like-users {
    margin-top: 10px;
  }

  .answer-ranking {
    margin-bottom: 40px;
  }

  .ranking-text-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    .ranking-title {
      font-size: 16px;
      font-weight: 600;
      text-align: center;

      .ranking-text {
        font-weight: 600;
        font-size: 16px;
        color: #6ea1ff;
      }
    }
  }
`;

export default RankingMainPage;
