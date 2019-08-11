// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import Classes from "./Classes";
import Hooks from "./Hooks";
import "./css.css";

const element = document.getElementById("root");

if (element) {
  ReactDOM.render(<Router />, element);
}

function Router() {
  return <>{window.location.hash === "#classes" ? <Classes /> : <Hooks />}</>;
}
