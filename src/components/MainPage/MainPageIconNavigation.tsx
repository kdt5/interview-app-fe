import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  iconSource: string;
  menu: string;
  to: string;
}

function MainPageIconNavigation({ iconSource, menu, to }: Props) {
  return (
    <>
      <SlideNavigationStyle to={to}>
        <SlideNavigationIcon>
          <img src={iconSource} alt="" />
        </SlideNavigationIcon>
        <p>{menu}</p>
      </SlideNavigationStyle>
    </>
  );
}

const SlideNavigationStyle = styled(Link)`
  text-align: center;
  p {
    color: #888;
    font-size: 14px;
    font-weight: 400;
    margin-top: 7px;
  }
`;
const SlideNavigationIcon = styled.div`
  width: 60px;
  height: 60px;
  border: solid 1px #f2f2f2;
  background-color: #fbfbfb;
  border-radius: 10px;
`;

export default MainPageIconNavigation;
