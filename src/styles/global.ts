import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
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

  .btn1 {
    background: #FFF;
    color: #6EA1FF;
    border-radius: 10px;
    border: solid 1px #6EA1FF;
  }

  .btn2 {
    background: #6EA1FF;
    color: #FFF;
    border-radius: 10px;
    border: solid 1px #FFF;
  }

  .box {
    background: #FBFBFB;
    border: solid 1px #EFF2F8;
    border-radius: 10px;
  }

  * {
    color: #333;
  }
`