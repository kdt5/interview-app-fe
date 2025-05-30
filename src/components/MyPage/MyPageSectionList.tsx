import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  iconSource: string;
  menu: string;
  to?: string;
  tabType?: "위클리" | "필수 질문";
}

function MyPageSectionList({ iconSource, menu, to, tabType }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to, {
        state: tabType ? { tabType } : undefined,
      });
    }
  };

  return (
    <>
      <MyPageSectionListStyle onClick={handleClick}>
        <LeftSection>
          <IconImage src={iconSource} alt={`${menu} 아이콘`} />
          <MyPageSectionMenu>{menu}</MyPageSectionMenu>
        </LeftSection>
        <RightArrow />
      </MyPageSectionListStyle>
    </>
  );
}

const MyPageSectionListStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #333;
  margin: 15px 0;
  transition: background-color 0.2s ease;
  cursor: pointer;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  margin-right: 10px;
  width: 16px;
`;

const MyPageSectionMenu = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #333;
`;

const RightArrow = styled(FaChevronRight)`
  fill: #888;
  font-size: 16px;
`;

export default MyPageSectionList;
