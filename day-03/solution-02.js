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

/**
 * @type {string[]}
 */
let rucksackGroup = [];

rucksacks.forEach((rucksack, rucksackIndex) => {
  const isGroupEnd = (rucksackIndex + 1) % 3 === 0;
  // push the items to group of 3 rucksacks
  if (!isGroupEnd) {
    rucksackGroup.push(rucksack);
  }

  if (isGroupEnd) {
    // push the last one into the group
    rucksackGroup.push(rucksack);

    /**
     * @type {Map<string, number>}
     */
    let sharedItems = new Map();
    // cleanup the rucksacks with only unique values
    const rucksack1 = [...new Set(rucksackGroup[0])];
    const rucksack2 = [...new Set(rucksackGroup[1])];
    const rucksack3 = [...new Set(rucksackGroup[2])];

    // build a map of items with their occurrences
    [].concat(rucksack1, rucksack2, rucksack3).forEach((item) => {
      if (sharedItems.has(item)) {
        sharedItems.set(item, sharedItems.get(item) + 1);
      } else {
        sharedItems.set(item, 1);
      }
    });

    let commonItem;
    let maxCount = -1;
    // find the most ocurred item and that is the badge of this group
    for (const [item, occurrences] of sharedItems.entries()) {
      if (occurrences > maxCount) {
        maxCount = occurrences;
        commonItem = item;
      }
    }

    sumOfPriorities += priorityMap.get(commonItem);
    // empty the group after the checking is done
    rucksackGroup = [];
  }
});

console.log('Sum is: ', sumOfPriorities);
