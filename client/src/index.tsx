import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import { Main } from "./app/Main";
import AppStateProvider from "./app/prodiver";

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
