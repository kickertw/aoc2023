import * as fs from 'fs';

const inputFile = fs.readFileSync('input2.txt').toString('utf-8');
const inputArr = inputFile.split("\r\n");

interface IDictionary {
    [index: string]: number;
}

let maxCubes = {} as IDictionary;
maxCubes['red'] = 12;
maxCubes['green'] = 13;
maxCubes['blue'] = 14;

const isPossible = (input: string) => {
    let grab = input.split(',');
    for (let cube of grab) {
        const cubeInput = cube.trimStart().split(' ');
        const count = parseInt(cubeInput[0]);
        const color = cubeInput[1];

        // console.log(`   ${count} vs max-${maxCubes[color]}`);
        if (count > maxCubes[color]) return false;
    }

    return true;
};

const calcCubesPower = (input: string) => {
    let retVal = 0;
    let cubeTracker = {} as IDictionary;
    cubeTracker['red'] = 1;
    cubeTracker['green'] = 1;
    cubeTracker['blue'] = 1;

    for (let round of input.split(';')){
        let grab = round.split(',');
        for (let cube of grab) {
            const cubeInput = cube.trimStart().split(' ');
            const count = parseInt(cubeInput[0]);
            const color = cubeInput[1];
    
            if (cubeTracker[color] < count) {
                cubeTracker[color] = count;
            }
        }
    }

    return cubeTracker['red'] * cubeTracker['green'] * cubeTracker['blue'];
};

let sum = 0;
let p2Sum = 0;
for (let ii = 0; ii < inputArr.length; ii++) {
    let gameInput = inputArr[ii].split(':')[1].substring(1).trimStart();
    let game = gameInput.split(';');

    // Part 1
    let valid = true;
    for(let round of game) {        
        if (!isPossible(round)) {
            valid = false;
            break;
        }
    }

    // Part 2
    p2Sum += calcCubesPower(gameInput);

    if (valid) {
        sum += ii + 1;
    }
}
console.log(`Part 1 = ${sum}`);
console.log(`Part 2 = ${p2Sum}`);