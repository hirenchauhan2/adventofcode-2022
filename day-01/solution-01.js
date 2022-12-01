const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

// split the file contents by EOL(OS specific) so we can loop over each line
// to identify the new entry and prepare the sum for each elf.
const list = input.split(EOL);

let currentElfSum = 0;
let maxSum = 0;

list.forEach((elfEntry) => {
  // empty line means new entry starts for another elf.
  // we push ths current sum to sums array
  if (!elfEntry) {
    if (currentElfSum > maxSum) {
      maxSum = currentElfSum;
    }
    currentElfSum = 0;
    return;
  }

  currentElfSum += parseInt(elfEntry);
});

console.log('Result', maxSum);
