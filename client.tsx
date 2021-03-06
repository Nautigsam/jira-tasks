import React from "react";
import ReactDom from "react-dom";

import Main from "./app/Main.tsx";

function start() {
  ReactDom.render(<Main />, document.getElementById("app"));
}

window.addEventListener("load", () => {
  start();
});
