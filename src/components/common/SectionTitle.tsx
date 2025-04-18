import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  to?: string;
  linkText?: string;
}

const SectionTitle = ({ children, to, linkText = "모두보기" }: Props) => (
  <SectionTitleStyle>
    {children}
    {to && <StyledLink to={to}>{linkText}</StyledLink>}
  </SectionTitleStyle>
);

const SectionTitleStyle = styled.h3<Omit<Props, "children">>`
  color: #333;
  width: 100%;
  padding: 20px 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  margin-top: 8px;
  font-size: 14px;
  color: #888888;
  text-decoration: none;
  cursor: pointer;
  font-weight: 400;
`;
export default SectionTitle;
