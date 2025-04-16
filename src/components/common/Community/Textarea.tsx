import styled from "styled-components";
import Post from "../../../assets/ReplyPost.png";
import PostActive from "../../../assets/ReplyPost_active.png";
import { useState } from "react";

interface Props {
  hasText: boolean;
}

function TextArea() {
  const [text, setText] = useState("");

  return (
    <>
      <CommentSection hasText={text.length > 0}>
        <textarea
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button></button>
      </CommentSection>
    </>
  );
}

const CommentSection = styled.div<Props>`
  position: fixed;
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  background-color: #fafafa;
  border-top: solid 1px #ededed;
  z-index: 99;
  bottom: 0;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;

  textarea {
    height: 40px;
    background-color: #f2f2f2;
    border: none;
    border-radius: 99px;
    padding-left: 15px;
    line-height: 40px;
    font-size: 14px;
    width: 85%;
  }

  button {
    width: 40px;
    height: 40px;
    background-color: transparent;
    background-image: url(${(props) => (props.hasText ? PostActive : Post)});
    background-position: center center;
    background-repeat: no-repeat;
    border: none;
    padding: 0;
  }
`;

export default TextArea;
