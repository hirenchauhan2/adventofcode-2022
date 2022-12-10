const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');
const lines = input.split(EOL);

const grid = [];

lines.forEach((line) => {
  const trees = line.split('').map((n) => parseInt(n));

  grid.push(trees);
});

// Define the directions to move in
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// Get the number of rows and columns in the forest
const rows = grid.length;
const cols = grid[0].length;

// Initialize the maximum scenic score to 0
let best = 0;

// Loop through each tree in the forest
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    // Initialize the scenic score of the current tree to 1
    let score = 1;

    // Loop through each direction
    for (const [dr, dc] of DIR) {
      // Initialize the viewing distance of the current tree in the current direction to 1
      let dist = 1;

      // Keep moving in the current direction until you reach the edge of the forest or encounter a tree with a height equal to or greater than the current tree
      let rr = r + dr;
      let cc = c + dc;
      while (true) {
        if (!(rr >= 0 && rr < rows && cc >= 0 && cc < cols)) {
          // Decrement the viewing distance by 1 if you reach the edge of the forest
          dist -= 1;
          break;
        }
        if (grid[rr][cc] >= grid[r][c]) {
          // Stop if the current tree is blocked by a tree with a height equal to or greater than its own height
          break;
        }
        dist += 1;
        rr += dr;
        cc += dc;
      }
      // Multiply the scenic score of the current tree by the viewing distance in the current direction
      score *= dist;
    }
    // Update the maximum scenic score if the current tree has a higher score
    best = Math.max(best, score);
  }
}

console.log(best)