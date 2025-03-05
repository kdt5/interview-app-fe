import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

  body {
    -ms-overflow-style: none;
    ::-webkit-scrollbar { display: none; }
    margin: 0;
    padding: 0;
    font-family: 'Pretendard', sans-serif;
    background-color: #ccc
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

  .btn1 {
    background: #FFF;
    color: #6EA1FF;
    border-radius: 10px;
    border: solid 1px #6EA1FF;
    padding: 15px 20px;
    line-height: 1;
    text-align: center;
    cursor: pointer;
  }

  .btn2 {
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
    color: #E2E2E2;
    font-size: 16px;
    font-weight: 300;
  }

  .box {
    background: #FBFBFB; 
    border: solid 1px #EFF2F8;
    border-radius: 10px;
  }

  * {
    color: #333;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
