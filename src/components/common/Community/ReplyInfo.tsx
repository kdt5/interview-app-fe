import styled from "styled-components";

interface Props {
  totalComments: number;
  sortType: "createdAt" | "favoriteCount";
  onChangeSort: (type: "createdAt" | "favoriteCount") => void;
}

function ReplyInfo({ totalComments, sortType, onChangeSort }: Props) {
  return (
    <>
      <ReplyInfoStyle>
        <span>댓글 {totalComments}</span>{" "}
        <span>
          <b className={`createdAt ${sortType === "createdAt" ? "active" : ""}`} onClick={() => onChangeSort("createdAt")}>최신순</b>
          <b className={`favoriteCount ${sortType === "favoriteCount" ? "active" : ""}`} onClick={() => onChangeSort("favoriteCount")}>인기순</b>
        </span>
      </ReplyInfoStyle>
    </>
  );
}

const ReplyInfoStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 30px 30px 0;

  b {
    cursor: pointer;
    font-weight: normal;
    margin-left: 8px;

    &.active {
      font-weight: bold;
    }
  }
`;

export default ReplyInfo;
