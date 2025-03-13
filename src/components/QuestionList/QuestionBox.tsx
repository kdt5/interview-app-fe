import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export default QuestionBox;

interface Props {
  questionId: number;
  title: string;
  categoryImagePath: string;
  categoryName?: string;
}

function QuestionBox({
  questionId,
  title,
  categoryImagePath,
  categoryName,
}: Props) {
  return (
    <ContentBoxStyle className="question">
      <Link className="question-link" to={`/question/${questionId}`}>
        <div className="content">
          <img src={categoryImagePath} alt={categoryName} />
          <span>{title}</span>
        </div>
        <SlArrowRight className="icon-goto" />
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

    padding: 1.225rem 1.5rem;

    color: inherit;
    text-decoration: none;

    align-items: center;
  }

  .content {
    display: flex;

    padding-right: 1rem;

    gap: 1rem;

    img {
      width: 20px;
      height: 20px;
    }
  }

  .icon-goto {
    width: 15px;
    height: 15px;
    min-width: 15px;
    min-height: 15px;
  }
`;
