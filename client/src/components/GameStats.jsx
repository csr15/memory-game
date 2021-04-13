import React from "react";

function GameStats({ time, error, resetGameHandler }) {
  return (
    <div className="game-stats">
      <h3>
        You have completed in {time.min > 0 && <span>{time.min}min</span>}{" "}
        <span>{time.sec}sec</span> with <span>{error}</span> error
      </h3>
      <button className="button" onClick={resetGameHandler}>
        RESET
      </button>
    </div>
  );
}

export default GameStats;
