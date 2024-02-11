import React from "react";
import ReactDom from "react-dom/client";
import Playground from "./components/Playground.jsx";
import CodeHall from "./components/CodeHall.jsx";
export default function App() {
  return <h1> Hello React</h1>;
}

const container = document.getElementById("root");
const root = ReactDom.createRoot(container);
root.render(<CodeHall />);
