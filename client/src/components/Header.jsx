import React from "react";

import "../css/main.css";
import Timer from "./Timer";

const Header = (props) => {
  return (
    <header className="header">
      <h1>Memory Game</h1>
      {props.difficultyLevel && (
        <div className="stats-container">
          <div className="stats" title="Time taking to complete">
            <i className="bx bxs-time"></i>
            <Timer  />
          </div>
          <div className="stats error" title="Total numbers of mismatch">
            <i className="bx bxs-error-alt"></i>
            <span className="badge error">{props.error}</span>
          </div>
          <div className="stats" title="Reset the game">
            <button className="btn-outline" onClick={props.resetGameHandler}>
              RESET
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
