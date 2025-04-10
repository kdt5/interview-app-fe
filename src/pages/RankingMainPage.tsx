import { Link } from "react-router-dom";
import styled from "styled-components";
import RankingProfile from "../components/common/Profile/RankingProfile";

function RankingPage() {
  return (
    <RankingPageStyle>
      <div className="profile-container">
        <h1 className="profile-title">내 프로필</h1>
        <div className="profile">
          <div className="profile-left">
            <img
              src="../public/profile-image.png"
              alt="profile-image"
              className="profile-image"
            />
            <div className="profile-info">
              <p className="profile-nickname">NickName</p>
              <span className="profile-position">Front-End</span>
            </div>
          </div>
          <p className="level">
            LV. <span className="level-number">05</span>
          </p>
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
          <div className="hot-user">
            <img src="/public/user1.png" alt="" />
            <p>명수옹</p>
            <span>누적 좋아요 884개</span>
          </div>
          <div className="hot-user">
            <img src="/public/user2.png" alt="" />
            <p>광대하트</p>
            <span>누적 좋아요 674개</span>
          </div>
          <div className="hot-user">
            <img src="/public/user3.png" alt="" />
            <p>희번덕</p>
            <span>누적 좋아요 456개</span>
          </div>
        </div>
        <button className="more-btn">100위 안의 뷰잇러도 확인하세요!</button>
      </div>
      <div className="answer-ranking">
        <div className="ranking-text-container">
          <h1 className="ranking-title">
            모르는 게 없는 <span className="ranking-text">뷰잇러</span>
          </h1>
          <Link to="/" className="all-ranking-link">
            모두보기
          </Link>
        </div>
        <div className="answer-users">
          <div className="rank-profile-box">
            <RankingProfile
              profileImg="../public/user1.png"
              username="명수옹"
              level={5}
              like={132}
              comments={423}
            />
          </div>
          <div className="rank-profile-box">
            <RankingProfile
              profileImg="../public/user1.png"
              username="명수옹"
              level={5}
              like={132}
              comments={423}
            />
          </div>
          <div className="rank-profile-box">
            <RankingProfile
              profileImg="../public/user1.png"
              username="명수옹"
              level={5}
              like={132}
              comments={423}
            />
          </div>
        </div>
      </div>
      <div className="like-ranking">
        <div className="ranking-text-container">
          <h1 className="ranking-title">
            많은 사람이 <span className="ranking-text">좋아하는</span>
          </h1>
          <Link to="/" className="all-ranking-link">
            모두보기
          </Link>
        </div>
        <div className="like-users">
          <div className="rank-profile-box">
            <RankingProfile
              profileImg="../public/user1.png"
              username="명수옹"
              level={5}
              like={132}
              comments={423}
            />
          </div>
          <div className="rank-profile-box">
            <RankingProfile
              profileImg="../public/user1.png"
              username="명수옹"
              level={5}
              like={132}
              comments={423}
            />
          </div>
          <div className="rank-profile-box">
            <RankingProfile
              profileImg="../public/user1.png"
              username="명수옹"
              level={5}
              like={132}
              comments={423}
            />
          </div>
        </div>
      </div>
    </RankingPageStyle>
  );
}

const RankingPageStyle = styled.div`
  background: #ffffff;
  padding-bottom: 120px;

  .profile-container {
    padding: 0 30px;
    .profile-title {
      font-size: 16px;
    }

    .profile {
      width: 333px;
      height: 80px;
      background: #fbfbfb;
      border-radius: 10px;
      padding: 18px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;

      .profile-left {
        display: flex;
        align-items: center;
        gap: 10px;

        .profile-image {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }

        .profile-info {
          display: flex;
          flex-direction: column;

          .profile-nickname {
            font-size: 14px;
          }

          .profile-position {
            font-size: 10px;
            font-weight: 300;
            color: #888888;
            margin: 0;
          }
        }
      }

      .level {
        font-size: 10px;
        background: #6ea1ff;
        border-radius: 999px;
        color: #ffffff;
        font-weight: 300;
        padding: 4px 8px;

        .level-number {
          font-size: 10px;
          font-weight: 600;
          color: #ffffff;
        }
      }
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
        font-size: 10px;
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

    .hot-users {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

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
        font-size: 10px;
        font-weight: 300;
        color: #888888;
      }
    }

    .more-btn {
      padding: 12px 53px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .all-ranking-link {
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

export default RankingPage;
