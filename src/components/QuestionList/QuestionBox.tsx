import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";
import { replaceUrlParams } from "../../utils/Url";

export default QuestionBox;

interface Props {
  questionId: number;
  title: string;
  categoryImagePath: string;
  categoryName?: string;
  isAnswered: boolean;
  isEditable: boolean;
}

function QuestionBox({
  questionId,
  title,
  categoryImagePath,
  categoryName,
  isAnswered,
  isEditable,
}: Props) {
  const answeredClassName = !isEditable && isAnswered ? "answered" : "";
  const link = replaceUrlParams(FRONTEND_URLS.ANSWER, {
    questionId: questionId.toString(),
  });

  const answeredStateElement = () => {
    if (!isEditable && isAnswered) {
      return <div className="answered-text">답변완료</div>;
    }

    return <SlArrowRight className="icon-goto" />;
  };

  return (
    <ContentBoxStyle className="question">
      <Link className={`question-link ${answeredClassName}`} to={link}>
        <div className="content">
          <img src={categoryImagePath} alt={categoryName} />
          <p>{title}</p>
        </div>
        {answeredStateElement()}
      </Link>
    </ContentBoxStyle>
  );
}

const ContentBoxStyle = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 60px;
  background-color: #fbfbfb;
  border: solid 1px #eff2f8;
  border-radius: 10px;

  .question-link {
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
