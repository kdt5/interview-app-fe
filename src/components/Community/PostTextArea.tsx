import styled from "styled-components";

function PostTextArea() {
  return (
    <>
      <PostTextAreaStyle>
        <textarea placeholder="뷰잇러들과 이야기를 나눠보세요." />
      </PostTextAreaStyle>
    </>
  );
}

const PostTextAreaStyle = styled.form`
  width: 100%;
  height: fit-content;

  textarea {
    border: none;
    border-bottom: solid 1px #ccc;
    width: 100%;
    max-width: 380px;
    height: 50vh;
    min-height: 200px;

    padding: 10px 30px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 500;
    color: #333;

    &::placeholder {
      font-size: 14px;
      font-weight: 200;
      color: #aaa;
    }
  }

  textarea:focus {
    outline: none;
  }
`;

export default PostTextArea;
