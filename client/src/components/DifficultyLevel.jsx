import React from "react";

import "../css/main.css";

const DifficultyLevel = (props) => {
  return (
    <div className="difficulty-container">
      <h1>Select your difficulty level</h1>
      <div className="button-container">
        <button className="btn" onClick={props.btnHandler.bind(this, 5)}>
          Easy
        </button>
        <button className="btn" onClick={props.btnHandler.bind(this, 10)}>
          Medium
        </button>
        <button className="btn" onClick={props.btnHandler.bind(this, 25)}>
          Hard
        </button>
      </div>
    </div>
  );
};
export default DifficultyLevel;