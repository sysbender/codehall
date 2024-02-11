import React from "react";
import Playground from "./Playground.jsx";

export default function CodeHall() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Playground />
      <Playground />
    </div>
  );
}
