import * as fs from 'fs';

const inputFile = fs.readFileSync('input3.txt').toString('utf-8');
const inputArr = inputFile.split("\r\n");

// Create Grid from string inputs
const makeGrid = (inputArr: string[]) : string[][] => {
    let retVal: string[][] = [];

    let ii = 0;
    for(const row of inputArr) {
        retVal[ii++] = row.split('');
    }

    return retVal;
}

const isNumber = (char: string) => !isNaN(Number(char));
const isSymbol = (char: string) => isNaN(Number(char)) && char !== '.';

const isValidPartNum = (engineGrid: string[][], input: string, row: number, start: number) : boolean => {
    const end = start + input.length - 1;
    const maxCol = engineGrid[0].length - 1;
    const maxRow = engineGrid.length - 1;
    let currentRow = row;
    for (let currentCol = start; currentCol <= end; currentCol++) {
        const u = currentRow > 0 && isSymbol(engineGrid[currentRow-1][currentCol]);
        const ul = currentRow > 0 && currentCol > 0 && isSymbol(engineGrid[currentRow-1][currentCol-1]);
        const l = currentCol > 0 && isSymbol(engineGrid[currentRow][currentCol-1]);
        const bl = currentRow < maxRow && currentCol > 0 && isSymbol(engineGrid[currentRow+1][currentCol-1]);
        const b = currentRow < maxRow && isSymbol(engineGrid[currentRow+1][currentCol]);
        const br = currentRow < maxRow && currentCol < maxCol && isSymbol(engineGrid[currentRow+1][currentCol+1]);
        const r = currentCol < maxCol && isSymbol(engineGrid[currentRow][currentCol+1]);
        const ur = currentRow > 0 && currentCol < maxCol && isSymbol(engineGrid[currentRow-1][currentCol+1]);

        // When the part number is just a single digit
        if (start === end) {
            return u || ul || l || bl || b || br || r || ur;
        } else {
            if (currentCol == start && (u || ul || l || bl || b)) {
                return true;
            } else if (currentCol == end && (u || ur || r || br || b)) {
                return true;
            } else if (u || b) {
                return true;
            }
        }
    }

    return false;
}

let engineGrid = makeGrid(inputArr);
let validPartNumbers: number[] = [];
for (let row = 0; row < engineGrid.length; row++) {
    let tempNum = '';
    let start = 0;
    for (let col = 0; col < engineGrid[0].length; col++) {
        if (isNumber(engineGrid[row][col])) {
            if (tempNum.length === 0) {
                start = col;
            }
            tempNum += engineGrid[row][col];
        }

        if (tempNum.length > 0 && (col === engineGrid[0].length - 1 || !isNumber(engineGrid[row][col]))) {
            //console.log(`Found number [${tempNum}]!`);
            if (isValidPartNum(engineGrid, tempNum, row, start)) {
                //console.log(`${tempNum} is a valid part number`);
                validPartNumbers.push(parseInt(tempNum));
            }
            tempNum = '';
        }
    }
}

const p1Sum = validPartNumbers.reduce((total, val) => { return total + val; }, 0);
console.log(`P1 Sum = ${p1Sum}`);
