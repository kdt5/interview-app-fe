import styled from "styled-components";

function TextArea() {
  return (
    <>
      <CommentSection>
        <textarea placeholder="댓글을 입력하세요" />
        <button></button>
      </CommentSection>
    </>
  );
}

const CommentSection = styled.div`
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
    background-color: #ccc;
  }
`;

export default TextArea;
