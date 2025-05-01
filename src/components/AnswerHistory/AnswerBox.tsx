import styled from "styled-components";
import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";
import { replaceUrlParams } from "../../utils/Url";
import { Question } from "../../models/Question.model";
import ViewerImg from "../../assets/Viewer.png";

export default AnswerBox;

interface Props {
  questionId: number;
  question: Question;
  answerId: number;
  content: string;
  viewCount: number;
  favoriteCount: number;
}

function AnswerBox({
  questionId,
  question,
  answerId,
  content,
  viewCount,
  favoriteCount
}: Props) {
  const link = replaceUrlParams(FRONTEND_URLS.ANSWER_EDIT, {
    questionId: questionId.toString(),
    answerId: answerId.toString(),
  });

  return (
    <AnswerBoxStyle className="answer">
        <Link className={`answer-link`} to={link}>
            <Title>{question.title}</Title>
            <ContentStyle>{content}</ContentStyle>
            <AnswerInfoStyle>
                <span>
                    <img src={ViewerImg} alt="Viewer Icon" />
                    {viewCount}명이 봤어요
                </span>{" "}
                | <span>좋아요 {favoriteCount}</span>
            </AnswerInfoStyle>
        </Link>
    </AnswerBoxStyle>
  );
}

const Title = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: #6ea1ff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ContentStyle = styled.p`
    color: #888888;
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;
`;

const AnswerInfoStyle = styled.div`
    font-size: 12px;
    color: #888;
    margin: 15px 0 0;
    span {
    font-weight: 400;
    color: #888888;

    img {
        display: inline-block;
        margin-right: 3px;
        width: 15px;
    }
    }
`;

const AnswerBoxStyle = styled.div`
    border-bottom: 3px solid #f5f5f5;
    cursor: pointer;
    padding: 25px 5px;
`;
