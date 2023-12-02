import * as fs from 'fs';

const inputFile = fs.readFileSync('input1.txt').toString('utf-8');
const inputArr = inputFile.split("\r\n");

const validValues = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const reverseValidValues = validValues.map(i => i.split('').reverse().join(''));

function findNumber(input: string, isReverse: boolean) : string {
    const searchArr = isReverse ? reverseValidValues : validValues;

    let minIdx = input.length + 1;
    let searchIdx = 100;

    for(let ii = 0; ii < searchArr.length; ii++) {
        let idx = input.indexOf(searchArr[ii]);
        if (idx > -1 && idx < minIdx) {
            searchIdx = ii;
            minIdx = idx;
        }

        if (minIdx === 0) break;
    }

    const retVal = searchIdx < 9 ? (searchIdx + 1).toString() : (searchIdx - 8).toString();
    //console.log(`findNumber(${input}) -> ${retVal}`);
    return retVal;    
}

// Part 1
let calibrationSum = 0;
for(let input of inputArr) {
    let first = '';
    let last = '';
    let reversed = input.split('').reverse();
    //console.log(input);
    for (let ii = 0; ii < input.length; ii++) {

        if (first.length === 0 && !isNaN(Number(input[ii]))) {
            first = input[ii];
        }
        
        if (last.length === 0 && !isNaN(Number(reversed[ii]))) {
            last = reversed[ii];
        }

        if (first.length === 1 && last.length === 1) {
            calibrationSum += parseInt(first + last);
            break;
        }
    }
}

console.log(`Part 1 = ${calibrationSum}`);

// Part 2
calibrationSum = 0
for (let input of inputArr) {
    const first = findNumber(input, false);
    const last = findNumber(input.split('').reverse().join(''), true);
    calibrationSum += parseInt(first + last);
}
console.log('Part 2 = ' + calibrationSum);