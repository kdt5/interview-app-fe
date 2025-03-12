import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export default QuestionBox;

interface Props {
  questionId: number;
  title: string;
  categoryImagePath: string;
  categoryName?: string;
  isAnswered?: boolean;
}

function QuestionBox({
  questionId,
  title,
  categoryImagePath,
  categoryName,
  isAnswered,
}: Props) {
  return (
    <ContentBoxStyle className="question">
      <Link
        className={`question-link ${isAnswered ? "answered" : ""}`}
        to={`/question/${questionId}`}
      >
        <div className="content">
          <img src={categoryImagePath} alt={categoryName} />
          <a>{title}</a>
        </div>
        {isAnswered ? (
          <div className="answered-text">답변완료</div>
        ) : (
          <SlArrowRight className="icon-goto" />
        )}
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

    padding: 1rem 1rem;

    color: inherit;
    text-decoration: none;

    align-items: center;
  }

  .content {
    display: flex;

    gap: 0.7rem;

    img {
      width: 20px;
      height: 20px;
    }

    a {
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
