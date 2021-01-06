import express from 'express';
import {Cell} from './Cell.js';
import { run }  from './Game.js';

var app = express();

const acorn = [ new Cell(1, 1),
                new Cell(2, 1),
                new Cell(2, 3),
                new Cell(4, 2),
                new Cell(5, 1),
                new Cell(6, 1),
                new Cell(7, 1)];


app.get('/board', (req, res) => {
    const numGenerations = req.query.numGenerations;
    const board = run(acorn, numGenerations);
    const boardString = visualizeBoard(board);


    res.end(boardString);
});

var server = app.listen(8080, () => {
    console.log(`Listening at http://${server.address().address}:${server.address().port}`);
})

const visualizeBoard = (board) => {

    let boardString = "";

    const minBoardX = Math.min.apply(Math, board.map(cell => cell.x));
    const maxBoardX = Math.max.apply(Math, board.map(cell => cell.x));

    const minBoardY = Math.min.apply(Math, board.map(cell => cell.y));
    const maxBoardY = Math.max.apply(Math, board.map(cell => cell.y)) 


    for (let y = maxBoardY; y >= minBoardY; y--) {
        for (let x = minBoardX; x <= maxBoardX; x++) {

            if (board.some(c => c.x == x && c.y == y)) {
                boardString += "O";
            }
            else {
                boardString += " ";
            }
        }
        boardString += '\n'
    }

    return boardString;
}