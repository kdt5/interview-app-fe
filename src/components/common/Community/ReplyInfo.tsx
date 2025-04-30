import styled from "styled-components";

interface Props {
  totalComments: number;
}

function ReplyInfo({ totalComments }: Props) {
  return (
    <>
      <ReplyInfoStyle>
        <span>댓글 {totalComments}</span>{" "}
        <span>
          <b>최신순</b> 인기순
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
`;

export default ReplyInfo;
