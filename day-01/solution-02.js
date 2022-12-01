const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

// process input
const list = input.split(EOL);

let elvesSums = [];
let currentElfSum = 0;
let maxSum = 0;

list.forEach((elfEntry) => {
  // empty line means new entry starts for another elf.
  // we push ths current sum to sums array
  if (!elfEntry) {
    elvesSums.push(currentElfSum);

    if (currentElfSum > maxSum) {
      maxSum = currentElfSum;
    }
    currentElfSum = 0;
    return;
  }

  currentElfSum += parseInt(elfEntry);
});

// sort the elves sum array
elvesSums.sort((a, b) => b - a);

const top3 = elvesSums.slice(0, 3);
console.log(`Top 3 elves' inventories`, top3);
const result = top3.reduce((a, b) => a + b, 0);
console.log('Top 3 Elves have ', result);
