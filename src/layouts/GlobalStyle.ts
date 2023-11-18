import {createGlobalStyle} from "styled-components";
import {normalize} from "styled-normalize";
const GlobalStyle = createGlobalStyle`
${normalize}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
