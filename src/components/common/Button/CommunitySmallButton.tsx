import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

function CommunitySmallBtn({ children }: Props) {
  return (
    <>
      <CommunitySmallBtnStyle>{children}</CommunitySmallBtnStyle>
    </>
  );
}

const CommunitySmallBtnStyle = styled.button<Omit<Props, "children">>`
  background: #6ea1ff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 300;
`;

export default CommunitySmallBtn;
