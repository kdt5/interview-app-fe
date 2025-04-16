import styled from "styled-components";
import PostWriteCategory from "../../components/common/Community/PostWriteCategory";
import AnswerForm from "../../components/AnswerPage/AnswerForm";

function PostWrite() {
  return (
    <>
      <PostWriteStyle>
        <PostWriteCategory></PostWriteCategory>
        <AnswerForm
          answer=""
          handleAnswerChange={() => {}}
          isOverLimit={false}
        ></AnswerForm>
      </PostWriteStyle>
    </>
  );
}

const PostWriteStyle = styled.div``;

export default PostWrite;
