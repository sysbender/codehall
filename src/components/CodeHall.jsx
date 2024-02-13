import React, { useEffect, useState } from "react";
import Playground from "./Playground.jsx";
import { loadJsonFile } from "../utils/projectUtils.js";

export default function CodeHall() {
  console.log(
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! mounting  "
  );

  const [projectConfigs, setProjectConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectConfigs() {
      try {
        const confs = await loadJsonFile("config.json");
        console.log(
          "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!===================useEffect",
          confs
        );

        // const confsArray = JSON.parse(confs);

        setProjectConfigs(confs);
      } catch (error) {
        console.error(" Error fetching config.json", error);
      } finally {
        setIsLoading(false);
      }
    }
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! mounting useEffect"
    );
    setIsLoading(true);
    fetchProjectConfigs();
  }, []);

  if (isLoading) {
    return <h1>ProjectConfig is loading!!!!!</h1>;
  } else {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Playground projectConfigs={projectConfigs} />
      </div>
    );
  }
}
