
import {Cell} from './Cell.js';
               
export const run = (startingBoard, numGenerations) => {
    let currentBoard = startingBoard;
    
    for (let i = 0; i < numGenerations; ++i) {
        currentBoard = solveGeneration(currentBoard); 
    }

    return currentBoard;
};





export const solveGeneration = (board) => {
    let survivedCells = killCells(board);

    let deadNeigborCells = getAdjacentDeadCells(board);

    let revivedCells = getRevivedCells(deadNeigborCells, board);

    return survivedCells.concat(revivedCells);
};


export const killCells = (liveCells) => {
    return liveCells.filter(c => numNeighbors(c, liveCells) > 1 && 
                                    numNeighbors(c, liveCells) < 4
    );
};

export const numNeighbors = (cell, board) => {
    return board.filter(c => areNeighbors(cell, c)).length;
};

export const areNeighbors = (cell1, cell2) => {
    let deltaX = Math.abs(cell1.x - cell2.x);
    let deltaY = Math.abs(cell1.y - cell2.y);

    //Return true if both delta x and y are no greater than one and at least one is equal to 1 
    return (deltaX <= 1 && deltaY <= 1) && (deltaX == 1 || deltaY == 1);
}



export const getAdjacentDeadCells = (liveCells) => {
    let deadCells = [];

    liveCells.forEach(liveCell => {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                let cell = new Cell(liveCell.x - x, liveCell.y - y)
                if (!deadCells.some(deadCell => deadCell.x === cell.x && deadCell.y === cell.y)) {
                    deadCells.push(cell);
                }
            }
        }
    });


    return deadCells.filter(deadCell => 
                !liveCells.some(liveCell => liveCell.x === deadCell.x && liveCell.y == deadCell.y));
    

};

export const getRevivedCells = (deadCells, liveCells) => {
    return deadCells.filter(deadCell => numNeighbors(deadCell, liveCells) == 3)
};


