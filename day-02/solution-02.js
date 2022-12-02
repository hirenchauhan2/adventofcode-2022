const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');

const ACTIONS = {
  LOSE: 'X',
  DRAW: 'Y',
  WIN: 'Z',
};

const [ROCK, PAPER, SCISSOR] = ['ROCK', 'PAPER', 'SCISSOR'];

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

const WINNER_MOVES_MAP = {
  ROCK: SCISSOR,
  SCISSOR: PAPER,
  PAPER: ROCK,
};

const LOSER_MOVES_MAP = {
  ROCK: PAPER,
  PAPER: SCISSOR,
  SCISSOR: ROCK,
};

const strategyList = input.split(EOL);

let yourScore = 0;
strategyList.forEach((strategy) => {
  const [player1Move, actionCode] = strategy.split(' ');
  const yourMove = getMove(player1Move, actionCode);
  yourScore += getYourScoreForRound(player1Move, yourMove);
});

console.log('Total score', yourScore);

function getMove(player1Move, actionCode) {
  const decryptedMove = ENCRYPTED_GUIDE[player1Move];

  switch (actionCode) {
    case ACTIONS.LOSE:
      return WINNER_MOVES_MAP[decryptedMove];
    case ACTIONS.WIN:
      return LOSER_MOVES_MAP[decryptedMove];
    case ACTIONS.DRAW:
      return decryptedMove;
    default:
      throw new Error('Unknown action');
  }
}

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
