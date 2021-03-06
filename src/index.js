import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { GeneralContextProvider } from "./store/GeneralContext";

ReactDOM.render(
  <GeneralContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GeneralContextProvider>,
  document.getElementById("root")
);
