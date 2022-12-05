const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

// get the index of stack number identifier
const indexOf1 = input.indexOf('1');
const stacksLayout = input.substring(0, indexOf1 - 2);

let stacksCount = 0;
const stackLayers = stacksLayout.split(EOL);
const topRow = stackLayers[0];
const len = topRow.length;
for (let index = 0; index < len; index++) {
  if (index % 4 === 0) {
    stacksCount += 1;
  }
}

const stacks = {};
let stackCount = 0;
stackLayers.forEach((layer) => {
  const len = layer.length;
  for (let index = 0; index < len; index++) {
    if (index % 4 === 0) {
      stackCount += 1;
      if (!stacks[stackCount]) {
        stacks[stackCount] = [];
      }

      const crate = layer.charAt(index + 1);
      if (crate.trim()) {
        stacks[stackCount].push(crate);
      }
    }
  }
  stackCount = 0;
});

// reverse items in the stacks array
Object.keys(stacks).forEach((key) => {
  stacks[key].reverse();
});

const lastStackIndex = input.indexOf(stacksCount);

const instructions = input.substring(lastStackIndex + 6).split(EOL);

// parse instructions
instructions.forEach((instruction) => {
  const [, cratesCount, , source, , destination] = instruction.split(' ');

  const movedItems = stacks[source].splice(-cratesCount);
  stacks[destination].push(...movedItems);
});

let topCrates = '';

Object.keys(stacks).forEach((key) => {
  topCrates += peekArray(stacks[key]);
});

console.log(topCrates);

function peekArray(array) {
  if (!array.length) return '';

  return array[array.length - 1];
}
