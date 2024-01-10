import React, { useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
function getTime() {
  return new Date().toLocaleTimeString();
}
function App() {
  const [e, t] = React.useState(getTime());
  return (
    React.useEffect(function () {
      setInterval(function () {
        t(getTime());
      }, 1e3);
    }, []),
    React.createElement("header", null, `Hello React @ ${e}`)
  );
}
console.log("starter: this is script.js");
const domAppElement = document.getElementById("root"),
  root = ReactDOM.createRoot(domAppElement),
  reactAppElement = React.createElement(App);
root.render(reactAppElement);
