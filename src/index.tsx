import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle, RootContainer } from "./index.styles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <RootContainer>
      <App />
    </RootContainer>
  </React.StrictMode>,
  document.getElementById("root")
);
