import { JSX } from "react";
import styled from "styled-components";

export default Tabs;

interface Props {
  titles: string[];
  onClickTab: (title: string) => void;
  currentTab: string;
}

function Tabs({ titles, onClickTab, currentTab }: Props): JSX.Element {
  return (
    <TabsStyle className="tabs">
      {titles.map((title) => {
        const active = title === currentTab ? "active" : "";

        return (
          <div
            key={title}
            className={`tab ${active}`}
            onClick={() => onClickTab(title)}
          >
            <p>{title}</p>
          </div>
        );
      })}
    </TabsStyle>
  );
}

const TabsStyle = styled.div`
  position: fixed;
  top: 84px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: #fff;
  width: 100%;
  max-width: 380px;
  padding: 20px 30px 0;
  box-sizing: border-box;

  display: flex;
  justify-content: center;

  .tab {
    display: inline-block;
    padding: 8px 16px;
    flex-grow: 1;
    cursor: pointer;

    border-bottom: 2px solid #e2e2e2;

    color: #e2e2e2;
    text-align: center;

    &.active {
      color: #333;
      border-color: #6ea1ff;
    }

    p {
      color: inherit;
      font-size: 16px;
    }
  }
`;
