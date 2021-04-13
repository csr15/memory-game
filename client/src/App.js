import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import "./css/main.css";
import Game from "./components/Game";
import DifficultyLevel from "./components/DifficultyLevel";
import constants from "./constants/constants";
import Header from "./components/Header";
import Alert from "./components/Alert";
import GameStats from "./components/GameStats";

function App() {
  //States to manage this and its child components
  const [difficultyLevel, setDifficultyLevel] = useState(null);
  const [colors, setColors] = useState("");
  const [error, setError] = useState(0);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isErroronFetching, setIsErrorOnFetching] = useState(false);
  const [timer, setTimer] = useState(new Date());
  const [gameStats, setGameStats] = useState("");

  //useEffect to fetch colors from database based on limit set
  useEffect(() => {
    if (difficultyLevel) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${constants.proxy}/colors/${difficultyLevel}`
          );

          const transformedData = [...data, ...data];
          setColors(transformedData.sort(() => Math.random() - 0.5));
        } catch (error) {
          setIsErrorOnFetching(true);

          setTimeout(() => {
            setIsErrorOnFetching(false);
          }, 3000);
        }
      })();
    }
  }, [difficultyLevel]);

  //useEffect to initiate game logic
  useEffect(() => {
    if (selectedCard.length === 2) {
      gameHandler(selectedCard);
    }
  }, [selectedCard]);

  //useEffect to handle game finish logic
  useEffect(() => {
    if (colors.length === 0 && difficultyLevel) {
      const time = Math.abs(timer - new Date()) / 1000;
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60) % 60;

      setGameStats({ min: minutes, sec: seconds });
      setDifficultyLevel("");
    }
  }, [colors]);

  //function to check whether selected card and thier values are equal or not
  const gameHandler = useCallback(
    async (selectedCards) => {
      try {
        const { data } = await axios.post(`${constants.proxy}/checkColors`, {
          colors: [colors[selectedCards[0]]._id, colors[selectedCards[1]]._id],
        });

        if (data.isSame) {
          const newColors = colors.filter(
            (el) => !data.colorsId.includes(el._id)
          );
          setColors(newColors);
          setSelectedCard([]);
        } else {
          setError(error + 1);
          setSelectedCard([]);
        }
      } catch (error) {
        setIsErrorOnFetching(true);

        setTimeout(() => {
          setIsErrorOnFetching(false);
        }, 3000);
      }
    },
    [colors, error]
  );

  //useEffect to select only two card
  const selectCardHandler = useCallback(
    (index) => {
      if (selectedCard.length < 2 && !selectedCard.includes(index)) {
        setSelectedCard([...selectedCard, index]);
      } else {
        return;
      }
    },
    [selectedCard]
  );

  //Function to reset the game to scratch
  const resetGameHandler = useCallback(() => {
    console.log("Reset");
    setDifficultyLevel("");
    setColors("");
    setSelectedCard([]);
    setError(0);
    setGameStats("");
  }, []);

  return (
    <div className="App">
      <Header
        difficultyLevel={difficultyLevel}
        resetGameHandler={resetGameHandler}
        error={error}
      />
      <section className="game">
        {gameStats ? (
          <GameStats
            time={gameStats}
            error={error}
            resetGameHandler={resetGameHandler}
          />
        ) : difficultyLevel ? (
          <Game
            difficulty={difficultyLevel}
            colors={colors}
            selectCardHandler={selectCardHandler}
            selectedCard={selectedCard}
          />
        ) : (
          <DifficultyLevel btnHandler={(level) => setDifficultyLevel(level)} />
        )}

        {isErroronFetching && <Alert />}
      </section>
    </div>
  );
}

export default App;
