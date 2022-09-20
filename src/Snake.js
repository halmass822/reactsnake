import './Snake.css';
import { useState, useEffect } from "react";
import { generateGrid, checkNewPosition, getRandomPosition } from "./utils.js"

export default function Snake() {
  const [filledTiles, setFilledTiles] = useState([]);
  const [allTiles, setAllTiles] = useState([]);
  const [gridDimensions, setGridDimensions] = useState([10,10]);
  const [gameState, setGameState] = useState("initial");
  const [inputVector, setInputVector] = useState([1,0]);
  const [headPosition, setHeadPosition] = useState([5,5]);
  const [fruitPosition, setFruitPosition] = useState([]);

  useEffect(() => {
    setAllTiles(generateGrid(gridDimensions))
  }, [gridDimensions]);

  const fillTile = (inputCoords) => {
    console.log(`fillTile(${inputCoords})`);
    setFilledTiles((prev) => [...prev, inputCoords]);
  }

  const moveSnake = (hasEaten) => {
    if(gameState !== "running") return;
    const newHeadPosition = [headPosition[0] + inputVector[0], headPosition[1] + inputVector[1]];
    if(checkNewPosition(newHeadPosition, gridDimensions, filledTiles) ) {
      setGameState("gameOver");
    } else {
      setHeadPosition(newHeadPosition);
      fillTile(newHeadPosition);
      if(!hasEaten) setFilledTiles((prev) => prev.slice(1));
      setFruitPosition(getRandomPosition(gridDimensions, filledTiles));
    }
  }

  return (
    <div className="snakeGame">


    </div>
  );
}