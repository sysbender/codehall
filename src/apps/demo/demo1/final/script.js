import React, { useState } from "react";
import ReactDOM, { createRoot } from "react-dom/client";

console.log("starter: this is script.js");
function getTime() {
  return new Date().toLocaleTimeString();
}
//The App function defines a React component.
function App() {
  const [time, setTime] = React.useState(getTime());
  React.useEffect(function () {
    setInterval(function () {
      setTime(getTime());
    }, 1000);
  }, []);
  return React.createElement("header", null, `Hello React @ ${time}`);
}

//retrieves the DOM element with the ID "root" where the React app will be mounted.
const domAppElement = document.getElementById("root");
//ReactDOM.createRoot is used to create a root instance.
const root = ReactDOM.createRoot(domAppElement);
//creates a React element from the App component.
const reactAppElement = React.createElement(App);
//renders the App component inside the root.
root.render(reactAppElement);
