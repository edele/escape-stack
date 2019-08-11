// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import App from "./Classes";
import "./css.css";

const element = document.getElementById("root");

if (element) {
  ReactDOM.render(<App />, element);
}
