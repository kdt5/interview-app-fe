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
          <div className={`tab ${active}`} onClick={() => onClickTab(title)}>
            <h1>{title}</h1>
          </div>
        );
      })}
    </TabsStyle>
  );
}

const TabsStyle = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  width: 100%;
  max-width: 380px;
  padding: 0 30px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;

  .tab {
    display: inline-block;
    padding: 8px 16px;
    flex-grow: 1;
    cursor: pointer;

    border-width: 2px;
    border-color: #e2e2e2;
    border-style: none none solid none;

    color: #e2e2e2;
    text-align: center;

    &.active {
      color: #6ea1ff;
      border-color: #6ea1ff;
    }

    h1 {
      color: inherit;
    }
  }
`;
