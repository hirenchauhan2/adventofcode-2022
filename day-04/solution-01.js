const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

const assignmentPairs = input.split(EOL);

let count = 0;

assignmentPairs.forEach((line) => {
  const [pair1, pair2] = line.split(',');

  const [start1, end1] = pair1.split('-').map((s) => parseInt(s));
  const [start2, end2] = pair2.split('-').map((s) => parseInt(s));

  if (
    (start1 <= start2 && end2 <= end1) ||
    (start2 <= start1 && end1 <= end2)
  ) {
    count += 1;
  }
});

console.log('Count is', count);
