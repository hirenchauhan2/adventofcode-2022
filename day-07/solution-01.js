const { readFileSync } = require('fs');
const { EOL } = require('os');

const input = readFileSync('./input.txt', 'utf-8');
const lines = input.split(EOL);

let fs = {
  name: '/',
  size: 0,
  type: 'directory',
  parent: null,
};

let currentDir = fs;

for (const line of lines) {
  // cd or ls
  if (line.startsWith('$')) {
    let [, cmd, arg] = line.split(' ');
    if (cmd === 'ls') continue;

    if (cmd === 'cd' && arg === '..') {
      if (currentDir.parent !== null) {
        currentDir = currentDir.parent;
      } else {
        currentDir = fs;
      }
      continue;
    }
    // cd to another dir
    if (currentDir.contents) {
      currentDir = currentDir.contents[arg];
    }

    continue;
  }

  if (line.startsWith('dir')) {
    const [, dir] = line.split(' ');
    if (currentDir?.contents === undefined) {
      currentDir.contents = {
        [dir]: {
          name: dir,
          type: 'directory',
          size: 0,
          parent: currentDir,
        },
      };
    } else {
      currentDir.contents[dir] = {
        name: dir,
        type: 'directory',
        size: 0,
        parent: currentDir,
      };
    }
    continue;
  }

  // file
  const [size, name] = line.split(' ');
  if (currentDir.contents) {
    currentDir.contents[name] = {
      name,
      type: 'file',
      size: parseInt(size),
      // parent: null,
    };
  } else {
    currentDir.contents = {
      [name]: {
        name,
        type: 'file',
        size: parseInt(size),
        // parent: null,
      },
    };
  }
}

let maxSize = 100000;
let answer = 0;

function getSize(dir) {
  let size = 0;

  for (const file in dir.contents) {
    // console.log("🚀 ~ file: solution01.js:107 ~ getSize ~ file", file)
    if (dir.contents[file].type === 'directory') {
      size += getSize(dir.contents[file]);
    } else {
      size += dir.contents[file].size;
    }
  }
  if (size <= maxSize) {
    answer += size;
  }
  return size;
}

const fsSize = getSize(fs);
console.log('FS size', fsSize);
console.log('Answer', answer);
