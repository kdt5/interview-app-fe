import styled from "styled-components";
import PostWriteCategory from "../../components/common/Community/PostWriteCategory";
import { useEffect, useState } from "react";
import PostTitleForm from "../../components/Community/PostTitleForm";
import PostTextArea from "../../components/Community/PostTextArea";
import GrayButton from "../../components/common/Button/GrayButton";
import { usePostCategories, usePostMutation } from "../../hooks/UsePost";
import { PostCategory } from "../../models/CommunityPost.model";
import { useNavigate } from "react-router-dom";
import { FRONTEND_URLS } from "../../constants/Urls";

function PostWrite({
  mode,
  postId,
  currentTitle,
  currentContent,
  currentCategoryId,
}: {
  mode: "create" | "edit";
  postId?: number;
  currentTitle?: string;
  currentContent?: string;
  currentCategoryId?: number;
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(
    mode === "edit" && currentTitle ? currentTitle : ""
  );
  const [content, setContent] = useState(
    mode === "edit" && currentContent ? currentContent : ""
  );
  const { postCategories } = usePostCategories();
  const [selectedCategory, setSelectedCategory] =
    useState("게시글의 주제를 선택해주세요.");
  useEffect(() => {
    if (mode === "edit" && currentCategoryId && postCategories.length > 0) {
      const foundCategory = postCategories.find(
        (cat) => cat.id === currentCategoryId
      );
      setSelectedCategory(
        foundCategory ? foundCategory.name : "존재하지 않는 주제 입니다."
      );
    }
  }, [mode, currentCategoryId, postCategories]);

  const { submitNewPost, updateExistingPost } = usePostMutation();

  const isButtonActive =
    title.length > 0 &&
    content.length >= 1 &&
    selectedCategory !== "게시글의 주제를 선택해주세요.";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = async () => {
    if (!isButtonActive) return;
    const categoryId =
      postCategories.find(
        (category: PostCategory) => category.name === selectedCategory
      )?.id ?? 1;
    try {
      if (mode === "create") {
        await submitNewPost(title, content, categoryId);
      } else if (mode === "edit" && postId) {
        await updateExistingPost(postId, title, content, categoryId);
      } else {
        console.error("게시글 모드 create/edit 만 가능합니다.");
        throw new Error("게시글 모드가 잘못되었습니다.");
      }
      navigate(FRONTEND_URLS.COMMUNITY.POST);
    } catch (error) {
      console.error("게시글 수정 오류:", error);
      alert("에러가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PostWriteStyle>
      <PostWriteCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        postCategories={postCategories}
      />
      <PostTitleForm title={title} handleTitleChange={handleTitleChange} />
      <PostTextArea answer={content} handleAnswerChange={handleContentChange} />
      <ConfirmButtonWrap>
        <GrayButton
          width="100px"
          className={isButtonActive ? "check" : ""}
          onClick={handleSubmit}
          disabled={!isButtonActive}
        >
          완료
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
