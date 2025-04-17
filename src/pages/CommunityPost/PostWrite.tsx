import styled from "styled-components";
import PostWriteCategory from "../../components/common/Community/PostWriteCategory";

import { useState } from "react";
import PostTitleForm from "../../components/Community/PostTitleForm";
import PostTextArea from "../../components/Community/PostTextArea";

function PostWrite() {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <PostWriteStyle>
        <PostWriteCategory></PostWriteCategory>
        <PostTitleForm
          title={title}
          handleTitleChange={handleTitleChange}
        ></PostTitleForm>
        <PostTextArea></PostTextArea>
      </PostWriteStyle>
    </>
  );
}

const PostWriteStyle = styled.div``;

export default PostWrite;
