import { useState } from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import { usePostCategories } from "../../../hooks/UsePost";

// const categoryMap: Record<string, string[]> = {
//   취업: ["취업", "면접 후기"],
//   포지션: ["Front-End", "Back-End", "Full-Stack"],
//   자유: ["일상", "자유글", "반려동물"],
// };

const PostWriteCategory = () => {
  const [selectedCategory, setSelectedCategory] =
    useState("게시글의 주제를 선택해주세요");
    
  const {postCategories} = usePostCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (name: string) => {
    setSelectedCategory(name);
    setIsModalOpen(false);
  };

  return (
    <WriteWrap>
      <CategorySelect onClick={() => setIsModalOpen(true)}>
        <span> {selectedCategory}</span>
        <span>
          <SlArrowRight />
        </span>
      </CategorySelect>

      {isModalOpen && (
        <ModalBackdrop onClick={() => setIsModalOpen(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <Title>게시글의 주제를 선택해주세요.</Title>
            <CategoryBlock>
              {
                postCategories.map((category) => (
                  <SubCategory
                      key={category.id}
                      onClick={() => handleSelect(category.name)}
                    >
                      {category.name}
                  </SubCategory>
                ))
              }
            </CategoryBlock>
          </Modal>
        </ModalBackdrop>
      )}
    </WriteWrap>
  );
};

export default PostWriteCategory;

const WriteWrap = styled.div`
  position: relative;
`;

const CategorySelect = styled.div`
  border-top: solid 1px #f5f5f5;
  border-bottom: solid 1px #f5f5f5;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  padding: 20px 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 16px;
    font-weight: 400;
    color: #333;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: end;
  z-index: 1000;
  max-width: 380px;
  margin: 0 auto;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-height: 50vh;
  overflow-y: auto;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 16px;
`;

const CategoryBlock = styled.div`
  margin-bottom: 16px;
`;

// const MainCategory = styled.div`
//   font-size: 14px;
//   font-weight: bold;
//   color: #888;
// `;

const SubCategory = styled.div`
  padding: 15px 20px;
  margin: 10px 10px 0 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  background-color: #fbfbfb;
  border: solid 1px #fbfbfb;
  color: #aaa;
  font-weight: 300;

  &:hover {
    border: solid 1px #6ea1ff;
    color: #6ea1ff;
  }
`;
