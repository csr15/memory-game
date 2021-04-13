import React from "react";

import "../css/main.css";

const Game = (props) => {
  return (
    <div className="game-container">
      <div className="game-cards">
        {props.colors ? (
          props.colors.map((el, index) => {
            return (
              <div
                className="card"
                onClick={props.selectCardHandler.bind(this, index)}
                key={index}
              >
                <div
                  className="card-inner"
                  style={
                    props.selectedCard.includes(index)
                      ? { background: el.color }
                      : null
                  }
                ></div>
              </div>
            );
          })
        ) : (
          <div className="loader">
            <p>
              <i className="bx bx-loader bx-sm bx-spin"></i>Loading
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
