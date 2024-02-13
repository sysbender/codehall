import React, { useState } from "react";

export default function ToggleAnswer({
  showAnswer,
  setShowAnswer,
  setIsLiveCodesReady,
}) {
  function toggleAnswerHandler(event) {
    const isChecked = event.target.checked;
    setIsLiveCodesReady(false);
    setShowAnswer(isChecked);
  }
  return (
    <div>
      <label htmlFor="toggleAnswer" style={{ paddingRight: "8px" }}>
        Check Answer
      </label>

      <input
        type="checkbox"
        name="toggleAnswer"
        id="toggleAnswer"
        checked={showAnswer}
        onChange={toggleAnswerHandler}
      />
    </div>
  );
}
