import './Snake.css';
import { useState, useEffect } from "react";
import { generateGrid, checkNewPosition, getRandomPosition, compareCoordinates } from "./utils.js";

export default function Snake() {
  const [gridDimensions, setGridDimensions] = useState([10,10]);
  const [tiles, setTiles] = useState(generateGrid(gridDimensions));
  const [headPosition, setHeadPosition] = useState([5,5]);
  const [currentVector, setCurrentVector] = useState([1,0]);
  const [bodyPosition, setBodyPosition] = useState([[5,5]]);
  const [foodPosition, setFoodPosition] = useState([]);
  const [gameStatus, setGameStatus] = useState("initial");

  const changeContents = (targetCoordinate, newContent) => {
    console.log(`changeContents(${targetCoordinate}, ${newContent})`);
    console.log(tiles)
    const tilePosition = tiles.findIndex(({coordinate}) => compareCoordinates(coordinate, targetCoordinate) );
    console.log(tilePosition);
    let newTiles = tiles;
    newTiles[tilePosition].contents = newContent;
    setTiles(newTiles);
  }

  const changeVector = ({key}) => {
    if(!/[awds]/.test(key)) return;
    switch (key) {
      case "w":
        setCurrentVector([0,1]);
        break;
      case "a":
        setCurrentVector([-1,0]);
        break;
      case "s":
        setCurrentVector([0,-1]);
        break;
      case "d":
        setCurrentVector([1,0]);
        break;
      default:
        break;
    }
    moveSnake();
  }

  const moveSnake = () => {
    console.log(`moveSnake()`);
    const newPosition = [headPosition[0] + currentVector[0], headPosition[1] + currentVector[1]];
    if(!checkNewPosition(newPosition, gridDimensions, bodyPosition)){
      setGameStatus("gameOver");
    } else {
      setHeadPosition(newPosition, gridDimensions, bodyPosition);
      changeContents(newPosition, "filled");
      setBodyPosition((prev) => [...prev, newPosition]);
      if(!compareCoordinates(newPosition, foodPosition)){
        changeContents(bodyPosition[0], "empty");
        setBodyPosition((prev) => prev.slice(1));
      } else {
        setFoodPosition(getRandomPosition(gridDimensions, bodyPosition));
      }
    }
  }

  const changeGridDimensions = (newDimensions) => {
    setGridDimensions(newDimensions);
  }

  const startGame = () => {
    setTiles(generateGrid(gridDimensions));
    setHeadPosition([5,5]);
    changeContents([5,5], "filled");
    setBodyPosition([]);
    setCurrentVector([1,0]);
    setGameStatus("running");
  }

  useEffect(() => {
    if(gameStatus !== "running") return;
    const gameInterval = setInterval(() => {
      moveSnake()
    }, 300);
    return clearInterval(gameInterval)
  },[gameStatus])

  return (
    <div className="snakeGame" tabIndex={0} onKeyDown={changeVector}>
      <button onClick={startGame}>Start</button>
      <div className="snakeGameGrid"
        onKeyDown={changeVector}        
        style={{width: (`calc( calc( 2rem + 2px ) * ${gridDimensions[0]} )`)}}>
          {tiles.map((tile) => {
            let tileColor; 
            switch (tiles.contents) {
              case "empty":
                tileColor = "white";
                break;
              case "filled":
                tileColor = "grey";
                break;
              case "fruit":
                tileColor = "blue";
                break;
              default:
                break;
            }
            return <p 
              className="tile noselect"
              key={tile.coordinate}
              style={{backgroundColor: tileColor}}
              ></p>
          })}
      </div>
    </div>
  );
}