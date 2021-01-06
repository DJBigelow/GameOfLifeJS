import {numNeighbors, areNeighbors, getAdjacentDeadCells, solveGeneration, killCells} from './Game'
import {Cell} from './Cell';
import {test, expect} from "@jest/globals";


const adjacentCells =[
    new Cell(1, 3), new Cell(2, 3), new Cell(3, 3),
    new Cell(1, 2),                 new Cell(3, 2),
    new Cell(1, 1), new Cell(2, 1), new Cell(3, 1)]

const nonAdjacentCells = [
    new Cell(-2, 2),  new Cell(-1, 2),  new Cell(0, 2),  new Cell(1, 2),  new Cell(2, 2),
    new Cell(-2, 1),                                                      new Cell(2, 1),
    new Cell(-2, 0),                                                      new Cell(2, 0),
    new Cell(-2, -1),                                                     new Cell(2, -1),
    new Cell(-2, -2), new Cell(-1, -2), new Cell(0, -2), new Cell(1, -2), new Cell(2, -2),
]



test.each(adjacentCells)('areNeighbors returns true when given two adjacent cells', (adjacentCell) => {
    expect(areNeighbors(new Cell(2, 2), adjacentCell)).toBe(true);
});


test.each(nonAdjacentCells)('areNeighbors returns false when given two non-adjacent cells', ( cell2) => {
    expect(areNeighbors(new Cell(0, 0), cell2)).toBe(false);
});


test('numNeighbors returns eight for cell surrounded by 8 cells', () => {
    expect(numNeighbors(new Cell(2, 2), adjacentCells)).toBe(8);              
});


test('numNeighbors returns 0 for cell with no adjacent neighbors', () => {
    expect(numNeighbors(new Cell(0, 0), nonAdjacentCells)).toBe(0);
});


test('getAdjacentDeadCells returns correct cells for 3x1 strip of cells', () => {
    const startingBoard = [new Cell(1, 1), new Cell(2, 1), new Cell(3, 1)].sort();

    const expectedCells = new Set([
        new  Cell(0, 2), new Cell(1, 2), new Cell(2, 2), new Cell(3, 2), new Cell(4, 2),
        new  Cell(0, 1),                                                 new Cell(4, 1),
        new  Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0), new Cell(4, 0),
    ]);

    const actualCells = new Set(getAdjacentDeadCells(startingBoard));

    expect(actualCells).toEqual(expectedCells);
});


test('getAdjacentDeadCells returns empty array for 0 cells', () => {
    const expectedBoard = [];
    const actualBoard = getAdjacentDeadCells([]);

    expect(actualBoard).toEqual(expectedBoard);
});


test('killCells removes cells with 0 neighbors', () => {
    const startingBoard = [new Cell(1, 1)];
    const expectedBoard = [];

    const actualBoard = killCells(startingBoard);

    expect(actualBoard).toEqual(expectedBoard);
});

test('killCells removes cells with 1 neighbor', () => {
    const startingBoard = [new Cell(1, 1), new Cell(1, 2)];
    const expectedBoard = [];

    const actualBoard = killCells(startingBoard);

    expect(actualBoard).toEqual(expectedBoard);
});


test('killCells removes cells with 4 neighbors', () => {
    const startingBoard = [
                        new Cell(0, 1),
        new Cell(-1, 0), new Cell(0, 0), new Cell(1, 0),
                         new Cell(0, -1)
    ];

    const expectedBoard = new Set([
                          new Cell(0, 1),
        new Cell(-1, 0),                 new Cell(1, 0),
                          new Cell(0, -1)
    ]); 

    const actualBoard = new Set(killCells(startingBoard));

    expect(actualBoard).toEqual(expectedBoard);
});


test('Any adjacent cell with fewer than two neighbors dies as if by underpopulation', () => {
    const startingBoard = [new Cell(1, 1)];
    const expectedBoard = [];
    
    const actualBoard = solveGeneration(startingBoard);


    expect(actualBoard).toEqual(expectedBoard);
});


test('Any live cell with two or three neighbors lives on to the next generation', () => {
    const startingBoard = [new Cell(1, 1), new Cell(2, 1), new Cell(1, 2)];
    const expectedBoard = new Set( [
        new Cell(1, 2), new Cell(2, 2), 
        new Cell(1, 1), new Cell(2, 1)
    ]);

    const actualBoard = new Set(solveGeneration(startingBoard));



    expect(actualBoard).toEqual(expectedBoard);
});


test('Any live cell with more than three neighbors dies, as if by overpopulation', () => {
    const startingBoard = [
        new Cell(2, 4), new Cell(3, 4), new Cell(4, 4),
        new Cell(2, 3), new Cell(3, 3), new Cell(4, 3),
        new Cell(2, 2), new Cell(3, 2), new Cell(4, 2),
    ];


    const expectedBoard = new Set([
                                     new Cell(3,5),
                    new Cell(2, 4),                 new Cell(4, 4),
    new Cell(1, 3),                                                 new Cell(5, 3),
                    new Cell(2, 2),                 new Cell(4, 2),
                                    new Cell(3, 1)
    ]);

    const actualBoard = new Set(solveGeneration(startingBoard));


    expect(actualBoard).toEqual(expectedBoard);
})


test ('Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction', () => {
    const startingBoard = [new Cell(1, 1), new Cell(3, 1), new Cell(1, 3)]
    const expectedBoard = [new Cell(2, 2)];
    
    const actualBoard = solveGeneration(startingBoard);

    expect(actualBoard).toEqual(expectedBoard);
})


