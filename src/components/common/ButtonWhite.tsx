import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

function ButtonWhite({ children }: Props) {
  return (
    <>
      <ButtonStyle>{children}</ButtonStyle>
    </>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  background: #fff;
  color: #6ea1ff;
  border-radius: 10px;
  border: solid 1px #6ea1ff;
  cursor: pointer;
  width: 100%;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  margin-bottom: 7px;
  font-weight: 600;
`;

export default ButtonWhite;
