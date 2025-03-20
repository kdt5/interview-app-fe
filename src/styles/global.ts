import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    -ms-overflow-style: none;
    ::-webkit-scrollbar { display: none; }
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    background-color: #ccc;
  }

  * {
    color: #333;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  textarea {
    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
  }

  h2 {
    font-size: 18px;
    font-weight: 400;
  }

  p { 
    font-size: 16px;
    font-weight: 600;
  }

  span {
    font-size: 12px;
    font-weight: 600;
  }

  a{
    text-decoration: none;
  }

  button {
    font-family: 'Pretendard', sans-serif;
    background: #6EA1FF;
    color: #FFF;
    border-radius: 10px;
    border: solid 1px #FFF;
    padding: 15px 20px;
    text-align: center;
    line-height: 1;
    cursor: pointer;
  }

  input::placeholder, textarea::placeholder {
    font-family: 'Pretendard', sans-serif;
    color: #777;
    font-size: 16px;
    font-weight: 300;
  }
`;
