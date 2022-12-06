const {readFileSync} = require('fs');

const input = readFileSync('./input.txt', 'utf-8');

/**
 * @param {string} buffer stream buffer
 */
function findStartingPoint(buffer) {
    let startingPoint = -1;
    const bufferLength = buffer.length;
    const STARTING_POINT = 14;
    let latestChars = buffer.substring(0, STARTING_POINT-1)

    for (let i = STARTING_POINT-1; i < bufferLength; i++) {
        const char = buffer.charAt(i);

        latestChars += char;

        if (latestChars.length === STARTING_POINT) {
            const unique = new Set(latestChars.split(''))
          if (unique.size === STARTING_POINT) {
                startingPoint = i + 1;
                break;
            } else {
                // remove the first char from latestChars
                latestChars = latestChars.substring(1);
            }
        }
    }

    return startingPoint;
}

const result = findStartingPoint(input);
console.log(result);
