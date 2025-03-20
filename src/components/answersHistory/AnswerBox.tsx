import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";
import { replaceUrlParams } from "../../utils/Url";

export default AnswerBox;

interface Props {
  questionId: number;
  answerId: number;
  title: string;
  categoryImagePath: string;
  categoryName?: string;
}

function AnswerBox({
  questionId,
  answerId,
  title,
  categoryImagePath,
  categoryName,
}: Props) {
  const link = replaceUrlParams(FRONTEND_URLS.ANSWER_EDIT, {
    questionId: questionId.toString(),
    answerId: answerId.toString(),
  });

  return (
    <AnswerBoxStyle className="answer">
      <Link className={`answer-link`} to={link}>
        <div className="content">
          <img src={categoryImagePath} alt={categoryName} />
          <p>{title}</p>
        </div>
        <SlArrowRight className="icon-goto" />
      </Link>
    </AnswerBoxStyle>
  );
}

const AnswerBoxStyle = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 60px;
  background-color: #fbfbfb;
  border: solid 1px #eff2f8;
  border-radius: 10px;

  .answer-link {
    display: flex;
    justify-content: space-between;

    padding: 20px 15px;

    color: inherit;
    text-decoration: none;

    align-items: center;
  }

  .content {
    display: flex;

    padding-right: 10px;
    gap: 10px;

    img {
      width: 20px;
      height: 20px;
    }

    p {
      width: 210px;
      font-weight: 400;
    }
  }

  .answered {
    pointer-events: none;
    opacity: 0.5;
  }

  .icon-goto {
    width: 15px;
    height: 15px;
    min-width: 15px;
    min-height: 15px;
  }

  .answered-text {
    font-size: 12px;
  }
`;
