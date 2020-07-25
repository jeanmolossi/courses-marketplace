import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --darkBg: #191C21;
    --lightGray: #252932;

    --salmoon: #F56F6C;
    --red: #DC3522;

    --green: #43A047;
    --lightGreen: #87CD8A;

    --yellow: #FFF176;

    --oliveBlue: #33B6C9;

    --bege: #D9CB9E;

    --white: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    width: 100%;
    min-height: 100vh;

    background-color: var(--darkBg);
    color: var(--white);

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: #ffffff30;
    }
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 13pt;
  }

  button, input, text-area {
    outline: none;
  }

  button, label {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    color: var(--white);
    text-decoration: none;
  }
`;
