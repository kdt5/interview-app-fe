import styled from "styled-components";
import CommonProfile from "../../components/common/Profile/CommonProfile";
import ViewerImg from "../../assets/Viewer.png";
import { POST_CATEGORIES } from "../../constants/PostCategory";
import OptionImg from "../../assets/Option.png";
import CommunityModal from "../../components/common/Community/CommunityModal";
import { useState } from "react";
import { useCategory } from "../../hooks/UseCategory";
import { LikeIcon } from "../common/LikeIcon";

interface Props {
  className?: string;
  questionId?: number;
  id: number;
  title: string;
  content: string;
  postCategoryId: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string;
    level: number;
    answerCount: number;
  };
  viewCount: number;
  favoriteCount: number;
}

function CommunityAnswer({
  className,
  questionId,
  id,
  title,
  content,
  postCategoryId,
  user,
  viewCount,
  favoriteCount,
}: Props) {
  const { getCategoryName } = useCategory();
  const [currentFavoriteCount, setCurrentFavoriteCount] =
    useState(favoriteCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const targetType = className === "interview" ? "answer" : "post";
  const postCategoryName =
    targetType === "answer"
      ? getCategoryName(postCategoryId)
      : POST_CATEGORIES.find((category) => category.id === postCategoryId)
          ?.name;

  const handleToggleLike = (isFavorite: boolean) => {
    setCurrentFavoriteCount((prev) => (isFavorite ? prev - 1 : prev + 1));
  };

  const handleOptionClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <AnswerDetail>
        <AnswerInfo>
          <AnswerCategory>{postCategoryName || "기타"}</AnswerCategory>
          <span>
            <LikeIcon
              likeId={id}
              targetType="post"
              handleToggleLike={handleToggleLike}
              alt="Like Icon"
            />
            <img
              src={OptionImg}
              alt="Option Icon"
              onClick={handleOptionClick}
            />
          </span>
        </AnswerInfo>
        <QuestionTitle>{title}</QuestionTitle>
        <AnswerContents>{content}</AnswerContents>
        <QuestionLike>
          <span>
            {" "}
            <img src={ViewerImg} alt="Viewer Icon" />
            {viewCount}명이 봤어요
          </span>{" "}
          <span>|</span> <span>좋아요 {currentFavoriteCount}</span>
        </QuestionLike>
      </AnswerDetail>
      <AnswerDetailProfile>
        {user && <CommonProfile key={user.id} {...user} />}
      </AnswerDetailProfile>
      {isModalOpen && (
        <CommunityModal
          className={className}
          questionId={questionId}
          onClose={handleOptionClick}
          postId={id}
          title={title}
          content={content}
          postCategoryId={postCategoryId}
        />
      )}
    </>
  );
}

const AnswerDetail = styled.div`
  margin-bottom: 15px;
`;

const AnswerInfo = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    img {
      display: inline-block;
      margin-right: 12px;
    }
  }
`;

const AnswerCategory = styled.div`
  background-color: #6ea1ff;
  color: #fff;
  font-size: 14px;
  font-weight: 200;
  padding: 8px 15px;
  text-align: center;
  border-radius: 10px;
  display: inline-block;
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin-top: 20px;
`;

const AnswerContents = styled.p`
  color: #888;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
  line-height: 1.5;
`;

const QuestionLike = styled.div`
  margin-top: 50px;
  color: #888;
  span {
    color: #888;
    font-size: 12px;
    font-weight: 400;

    img {
      display: inline-block;
      margin-right: 3px;
    }
  }
`;

const AnswerDetailProfile = styled.div`
  background-color: #fbfbfb;
  padding: 15px;
`;
export default CommunityAnswer;
