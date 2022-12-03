const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

const rucksacks = input.split(EOL);

const lowerCaseItemTypes = Array.from(Array(26))
  .map((_, i) => i + 97)
  .map((x) => String.fromCharCode(x));

const upperCaseItemTypes = Array.from(Array(26))
  .map((_, i) => i + 65)
  .map((x) => String.fromCharCode(x));

const priorityMap = new Map();

[].concat(lowerCaseItemTypes, upperCaseItemTypes).forEach((char, index) => {
  priorityMap.set(char, index + 1);
});

let sumOfPriorities = 0;

rucksacks.forEach((rucksack) => {
  const length = rucksack.length;
  // differentiate compartments
  const compartment1 = rucksack.substring(0, Math.floor(length / 2));
  const compartment2 = rucksack.substring(Math.floor(length / 2));

  const sharedItems = new Set();

  for (let index = 0; index < compartment1.length; index++) {
    const item = compartment1[index];

    const itemIndexInCompartment2 = compartment2.indexOf(item);

    if (itemIndexInCompartment2 !== -1) {
      sharedItems.add(item);
    }
  }

  sumOfPriorities += [...sharedItems].reduce(
    (a, b) => a + priorityMap.get(b),
    0
  );
});

console.log('Sum is: ',sumOfPriorities);
