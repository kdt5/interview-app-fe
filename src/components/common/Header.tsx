import { JSX } from "react";
import { GoArrowLeft } from "react-icons/go";
import styled from "styled-components";

export default Header;

interface Props {
  title: string;
  children: JSX.Element;
}

function Header({ title, children }: Props) {
  return (
    <HeaderStyle>
      <div className="back">
        <a href="/home">
          <GoArrowLeft />
        </a>
      </div>
      <h3 className="title">{title}</h3>
      {children}
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  position: relative;
  width: 393px;
  height: 158px;
  left: 50%;
  transform: translate(-50%, 0);

  background-color: #fbfbfb;

  .back {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);

    width: 20px;
    height: 20px;

    a,
    a:hover,
    a:active,
    a:visited {
      color: #333333;
      text-decoration: none;
    }
  }

  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    margin: 0 0;
  }
`;
