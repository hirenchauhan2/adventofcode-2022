const {readFileSync} = require('fs');

const input = readFileSync('./input.txt', 'utf-8');

/**
 * @param {string} buffer stream buffer
 */
function findStartingPoint(buffer) {
    let startingPoint = -1;
    const bufferLength = buffer.length;
    const STARTING_POINT = 3;
    let latestChars = buffer.substring(0, STARTING_POINT)

    for (let i = STARTING_POINT; i < bufferLength; i++) {
        const char = buffer.charAt(i);

        latestChars += char;

        if (latestChars.length === 4) {
            const unique = new Set(latestChars.split(''))
            if (unique.size === 4) {
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

