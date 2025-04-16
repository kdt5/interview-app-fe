import styled from "styled-components";
import PostWriteCategory from "../../components/common/Community/PostWriteCategory";

function PostWrite() {
  return (
    <>
      <PostWriteStyle>
        <PostWriteCategory></PostWriteCategory>
      </PostWriteStyle>
    </>
  );
}

const PostWriteStyle = styled.div``;

export default PostWrite;
