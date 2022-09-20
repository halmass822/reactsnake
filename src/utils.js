export function checkNewPosition(inputPosition, inputBoundaries, filledTiles) {
    console.log(`checkNewPosition(${inputPosition}, ${inputBoundaries})`);
    const outOfBounds = inputPosition[0] > 0 && inputPosition[0] <= inputBoundaries[0] && inputPosition[1] > 0 && inputPosition[1] <= inputBoundaries[0];
    const hitSelf = filledTiles.some((coordinate) => coordinate[0] === inputPosition[0] && coordinate[1] === inputPosition[1]);
    return !(hitSelf || outOfBounds);
}

export function generateGrid(inputDimensions) {
    //console.log(`generateGrid(${inputDimensions})`)
    let outputArray = [];
    for(let i = 1; i <= inputDimensions[0]; i++) {
        for(let j = 1; j <= inputDimensions[1]; j++) {
            outputArray.push({
                coordinate: [i,j],
                contents: "empty"
            });
        }
    }
    return outputArray;
}

export function getRandomPosition(inputBoundaries, filledTiles) {
    let newFoodPosition;
    do {
        newFoodPosition = [Math.ceil(Math.random() * (inputBoundaries[0] - 0.001)), 
        Math.ceil(Math.random() * (inputBoundaries[1] - 0.001))];
    } while (filledTiles.some((coordinate) => coordinate[0] === newFoodPosition[0] && coordinate[1] === newFoodPosition[1]));
    return newFoodPosition;
}

export function compareCoordinates(coordinate1, coordinate2) {
    return coordinate1[0] === coordinate2[0] && coordinate1[1] === coordinate2[1];
}