import { JSX } from "react";
import styled from "styled-components";

export default Tabs;

interface Props {
  titles: string[];
  onClickTab: (title: string) => void;
  currentTab: string;
  counts?: number[];
}

function Tabs({ titles, onClickTab, currentTab, counts }: Props): JSX.Element {
  return (
    <TabsStyle className="tabs">
      {titles.map((title, idx) => {
        const active = title === currentTab ? "active" : "";
        const count = counts?.[idx] ?? null;

        return (
          <div
            key={title}
            className={`tab ${active}`}
            onClick={() => onClickTab(title)}
          >
            <p>
              {title}
              {count !== null && <span className="count"> {count}</span>}
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
