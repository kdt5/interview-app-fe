import { Link } from "react-router-dom";
import styled from "styled-components";
import RankingProfile from "../components/common/Profile/RankingProfile";
import CommonProfile from "../components/common/Profile/CommonProfile";
import { FRONTEND_URLS } from "../constants/Urls";
import { useMyUserData } from "../hooks/UseMyUserData";

const hotRankingUsers = [
  {
    profileImg: "/public/user1.png",
    username: "명수옹",
    like: 884,
  },
  {
    profileImg: "/public/user2.png",
    username: "광대하트",
    like: 674,
  },
  {
    profileImg: "/public/user3.png",
    username: "희번덕",
    like: 456,
  },
];

const answerRankingUsers = [
  {
    profileImg: "/public/user1.png",
    username: "명수옹",
    level: 5,
    like: 884,
    comments: 223,
  },
  {
    profileImg: "/public/user1.png",
    username: "명수옹",
    level: 5,
    like: 884,
    comments: 223,
  },
  {
    profileImg: "/public/user1.png",
    username: "명수옹",
    level: 5,
    like: 884,
    comments: 223,
  },
];

function RankingMainPage() {
  const { data, isLoading, error } = useMyUserData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available. Please try again later.</div>;

  return (
    <RankingMainPageStyle>
      <div className="profile">
        <div className="profile-box">
          <CommonProfile
            profileImageUrl="/profile-image.png"
            nickname={data.nickname}
            answerCount={data.answerCount}
            position="Front-End"
            level={5}
          />
        </div>
        <div className="counts">
          <div className="answer-count">
            <span className="count-title">답변 질문 수</span>
            <p className="count">20개</p>
          </div>
          <div className="post-count">
            <span className="count-title">작성 게시글</span>
            <p className="count">3개</p>
          </div>
          <div className="like-count">
            <span className="count-title">누적 좋아요</span>
            <p className="count">204개</p>
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
          {hotRankingUsers.map((user, index) => (
            <div className="hot-user" key={index}>
              <img src={user.profileImg} alt={user.username} />
              <p>{user.username}</p>
              <span>누적 좋아요 {user.like}개</span>
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
          {answerRankingUsers.map((user, index) => (
            <div className="rank-profile-box" key={`answer-${index}`}>
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
          {answerRankingUsers.map((user, index) => (
            <div className="rank-profile-box" key={`like-${index}`}>
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
