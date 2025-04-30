import styled from "styled-components";
import Post from "../../../assets/ReplyPost.png";
import PostActive from "../../../assets/ReplyPost_active.png";
import { useEffect, useState } from "react";
import { createPostComment, editComment } from "../../../api/Post.api";

interface Props {
  targetId: number;
  categoryName: "post" | "answer";
  parentId?: number;
  editTarget?: { id: number; content: string } | null;
  setEditTarget?: (target: null) => void;
  setSuccessMessage?: (message: string) => void;
  setShowSuccessModal?: (show: boolean) => void;
}

function TextArea({ targetId, categoryName, parentId, editTarget, setEditTarget, setShowSuccessModal, setSuccessMessage }: Props) {
  const [text, setText] = useState("");
  
  useEffect(() => {
    if (editTarget) {
      setText(editTarget.content);
    }
  }, [editTarget]);

  const handleClick = async () => {
    try {
      let response;

      if(editTarget) {
        response = await editComment(editTarget.id, text);
      } else if(parentId){
        response = await createPostComment(targetId, categoryName, text, parentId);
      } else {
        response = await createPostComment(targetId, categoryName, text);
      }

      if(response) {
        setSuccessMessage?.(editTarget ? "댓글이 수정되었습니다." : "댓글이 등록되었습니다.");
        setShowSuccessModal?.(true);
        setText("");
        setEditTarget?.(null);
      }
    } catch {
      alert("댓글 등록에 실패했습니다.");
    }
  }

  return (
    <>
      <CommentSection hasText={text.length > 0}>
        <textarea
          placeholder="댓글을 입력하세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleClick}></button>
        {editTarget && (
          <button onClick={() => {
            setEditTarget?.(null);
            setText("");
          }}>
            취소
          </button>
        )}
      </CommentSection>
    </>
  );
}

interface CommentSectionProps {
  hasText: boolean;
}

const CommentSection = styled.div<CommentSectionProps>`
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
