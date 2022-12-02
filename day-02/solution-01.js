const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

const [ROCK, PAPER, SCISSOR] = ['X', 'Y', 'Z'];

const ENCRYPTED_GUIDE = {
  A: ROCK,
  B: PAPER,
  C: SCISSOR,
};

const SHAPE_POINTS = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSOR]: 3,
};

const ROUND_POINTS = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};

const strategyList = input.split(EOL);

let yourScore = 0;
strategyList.forEach((strategy) => {
  const [player1Move, yourMove] = strategy.split(' ');

  yourScore += getYourScoreForRound(player1Move, yourMove);
});

console.log('Total score', yourScore);

function getYourScoreForRound(player1Move, yourMove) {
  const decryptedMove = ENCRYPTED_GUIDE[player1Move];
  const movePoint = SHAPE_POINTS[yourMove];

  if (decryptedMove === yourMove) {
    return ROUND_POINTS.DRAW + movePoint;
  }

  let winner;
  switch (decryptedMove) {
    case ROCK:
      if (yourMove === PAPER) winner = yourMove;
      break;
    case PAPER:
      if (yourMove === SCISSOR) winner = yourMove;
      break;
    case SCISSOR:
      if (yourMove === ROCK) winner = yourMove;
      break;
    default:
      throw new Error('Unknown move');
  }

  if (winner === yourMove) {
    return ROUND_POINTS.WIN + movePoint;
  }
  return ROUND_POINTS.LOSS + movePoint;
}
