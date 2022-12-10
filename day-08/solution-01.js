const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');
const lines = input.split(EOL);

const grid = [];

lines.forEach((line) => {
  const trees = line.split('').map((n) => parseInt(n));

  grid.push(trees);
});

let gridLength = grid.length;

let visibleTrees = 0;

let edge = gridLength - 1;

grid.forEach((row, rowIndex) => {
  row.forEach((column, colIndex) => {
    if (
      rowIndex === 0 ||
      rowIndex === edge ||
      colIndex === 0 ||
      colIndex === edge
    ) {
      // console.log(column);
      visibleTrees += 1;
      return;
    }

    // check surroundings
    if (
      // look at left
      grid[rowIndex][colIndex - 1] < column ||
      // look at right
      grid[rowIndex][colIndex + 1] < column ||
      // look at top
      grid[rowIndex - 1][colIndex] < column ||
      // look at bottom
      grid[rowIndex + 1][colIndex] < column
    ) {
      // console.log('tree', column);
      const visibleHorizontallyLeft = isVisibleFromGridHorizontally(
        grid,
        column,
        rowIndex,
        colIndex,
        false
      );
      const visibleHorizontallyRight = isVisibleFromGridHorizontally(
        grid,
        column,
        rowIndex,
        colIndex + 1,
        true
      );
      const visibleVerticallyTop = isVisibleFromGridVertically(
        grid,
        column,
        rowIndex,
        colIndex,
        false
      );

      const visibleVerticallyBottom = isVisibleFromGridVertically(
        grid,
        column,
        rowIndex + 1,
        colIndex,
        true
      );

      if (
        visibleHorizontallyLeft ||
        visibleHorizontallyRight ||
        visibleVerticallyTop ||
        visibleVerticallyBottom
      ) {
        visibleTrees += 1;
      }
    }
  });
});

function isVisibleFromGridHorizontally(
  grid,
  tree,
  rowIndex,
  colEnd,
  rightStart = false
) {
  const start = rightStart ? colEnd : 0;
  const end = rightStart ? gridLength : colEnd;
  const rowSlice = grid[rowIndex].slice(start, end);
  const maxFromSlice = Math.max(...rowSlice);

  return tree > maxFromSlice;
}

function isVisibleFromGridVertically(
  grid,
  tree,
  rowEnd,
  colIndex,
  bottomStart = false
) {
  const colSlice = [];
  const start = bottomStart ? rowEnd : 0;
  const end = bottomStart ? gridLength : rowEnd;

  for (let rowIndex = start; rowIndex < end; rowIndex++) {
    const element = grid[rowIndex][colIndex];
    colSlice.push(element);
  }

  const maxFromSlice = Math.max(...colSlice);

  return tree > maxFromSlice;
}

console.log(visibleTrees);
