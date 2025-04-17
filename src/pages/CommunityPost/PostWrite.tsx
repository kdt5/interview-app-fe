import styled from "styled-components";
import PostWriteCategory from "../../components/common/Community/PostWriteCategory";
import { useState } from "react";
import PostTitleForm from "../../components/Community/PostTitleForm";
import PostTextArea from "../../components/Community/PostTextArea";
import GrayButton from "../../components/common/Button/GrayButton";

function PostWrite() {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const isButtonActive = title.length > 0 && answer.length >= 1;

  return (
    <PostWriteStyle>
      <PostWriteCategory />
      <PostTitleForm title={title} handleTitleChange={handleTitleChange} />
      <PostTextArea answer={answer} handleAnswerChange={handleAnswerChange} />
      <ConfirmButtonWrap>
        <GrayButton width="100px" className={isButtonActive ? "check" : ""}>
          저장
        </GrayButton>
      </ConfirmButtonWrap>
    </PostWriteStyle>
  );
}

const PostWriteStyle = styled.div``;

const ConfirmButtonWrap = styled.div`
  display: flex;
  justify-content: right;
  padding: 20px 30px;
`;

export default PostWrite;
