import { Link } from "react-router-dom";
import styled from "styled-components";

import ReactIcon from "../../assets/ReactIcon.png";
interface Porps {
  category: string;
  questiontitle: string;
  to?: string;
  imageSource?: string;
}

function EssentialQuestionList({
  category,
  questiontitle,
  to = "/",
  imageSource = ReactIcon,
}: Porps) {
  return (
    <>
      <EssentialQuestionListStyle to={to}>
        <div>
          <img src={imageSource} alt="" />
        </div>
        <QuestionInfoStyle>
          <span>{category}</span>
          <p>{questiontitle}</p>
        </QuestionInfoStyle>
      </EssentialQuestionListStyle>
    </>
  );
}

const EssentialQuestionListStyle = styled(Link)`
  padding: 10px 30px;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: left;

  div {
    img {
      width: 45px;
      height: 45px;
      background-color: #ccc;
      border-radius: 40px;
    }
  }
`;

const QuestionInfoStyle = styled.div`
  margin-left: 10px;
  width: 70%;
  span {
    color: #888;
    font-weight: 400;
    font-size: 12px;
  }

  p {
    font-weight: 600;
    font-size: 16px;
    color: #333;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default EssentialQuestionList;
