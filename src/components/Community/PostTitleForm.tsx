import styled from "styled-components";

interface Props {
  title: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PostTitleForm({ title, handleTitleChange }: Props) {
  return (
    <>
      <PostTitleFormStyle>
        <input
          type="text"
          placeholder="제목을 작성해주세요."
          value={title}
          onChange={handleTitleChange}
        />
      </PostTitleFormStyle>
    </>
  );
}

const PostTitleFormStyle = styled.form`
  width: 100%;
  height: fit-content;

  input {
    border: none;
    padding: 30px 30px 15px 30px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  input:focus {
    outline: none;
  }
`;

export default PostTitleForm;
