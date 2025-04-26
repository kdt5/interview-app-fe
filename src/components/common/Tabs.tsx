import { JSX } from "react";
import styled from "styled-components";

export default Tabs;

interface TabItem {
  title: string;
  count?: number;
}

interface Props {
  tabs: TabItem[];
  onClickTab: (title: string) => void;
  currentTab: string;
}

function Tabs({ tabs, onClickTab, currentTab }: Props): JSX.Element {
  return (
    <TabsStyle className="tabs">
      {tabs.map((tab) => {
        const active = tab.title === currentTab ? "active" : "";

        return (
          <div
            key={tab.title}
            className={`tab ${active}`}
            onClick={() => onClickTab(tab.title)}
          >
            <p>
              {tab.title}
              {tab.count !== null && (
                <span className="count"> {tab.count}</span>
              )}
            </p>
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
  background: #fff;

  width: 100%;
  max-width: 380px;
  padding: 16px 30px 0 30px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;

  .tab {
    display: inline-block;
    padding: 8px 16px;
    flex-grow: 1;
    cursor: pointer;
    border-bottom: 2px solid #e2e2e2;
    width: 33.3%;

    p {
      color: inherit;
      font-size: 14px;
      font-weight: 400;
      color: #888888;
      text-align: center;
    }

    .count {
      color: #888888;
      font-weight: 400;
      font-size: 14px;
    }

    &.active {
      border-color: #6ea1ff;

      p {
        color: #333333;
        font-weight: 600;
      }

      .count {
        color: #333333;
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
`;
