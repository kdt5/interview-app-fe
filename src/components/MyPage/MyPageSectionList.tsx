import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  iconSource: string;
  menu: string;
  to?: string;
}

function MyPageSectionList({ iconSource, menu, to }: Props) {
  return (
    <>
      <MyPageSectionListStyle to={to || "/"}>
        <LeftSection>
          <IconImage src={iconSource} alt={`${menu} 아이콘`} />
          <MyPageSectionMenu>{menu}</MyPageSectionMenu>
        </LeftSection>
        <RightArrow />
      </MyPageSectionListStyle>
    </>
  );
}

const MyPageSectionListStyle = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #333;
  margin: 15px 0;
  transition: background-color 0.2s ease;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  margin-right: 10px;
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
