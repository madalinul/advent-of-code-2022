import fs from 'fs/promises';

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });
        const [layoutInput, movesInput] = data.split('\n\n');
        const stackPart1 = buildCratesStack(layoutInput);
        const stackPart2 = buildCratesStack(layoutInput);
        const moves = parseMoves(movesInput);
        for (const move of moves) {
            applyMovesOnStack(stackPart1, move, false);
            applyMovesOnStack(stackPart2, move, true);
        }

        const part1 = stackPart1.reduce((accum, column) => {
            return accum + column[column.length - 1];
        }, '');

        const part2 = stackPart2.reduce((accum, column) => {
            return accum + column[column.length - 1];
        }, '');

        console.log('PART1: ', part1);
        console.log('PART2: ', part2);
    } catch (err) {
        console.log(err);
    }
}

getSolution();

const buildCratesStack = (input: string) => {
    const stackLength = parseInt(input.charAt(input.length - 2));
    const stack: string[][] = new Array(stackLength).fill([]).map(() => []);
    const lines = input.split('\n');
    for (let i = lines.length - 2; i >= 0; i--) {
        let columnIndex = -1;
        for (let j = 1; j <= lines[i].length; j += 4) {
            columnIndex++;
            if (lines[i][j] === ' ') {
                continue;
            }
            stack[columnIndex].push(lines[i][j]);
        }
    }
    return stack;
};

const parseMoves = (input: string) => {
    const lines = input.split('\n');
    const moves = [];
    for (const line of lines) {
        const arr = line.split(' ');
        const noOfItems = parseInt(arr[1]);
        const startColumn = parseInt(arr[3]) - 1;
        const endColumn = parseInt(arr[5]) - 1;
        moves.push([noOfItems, startColumn, endColumn]);
    }
    return moves;
};

const applyMovesOnStack = (stack: string[][], move: number[], reverseMoves: boolean) => {
    const [noOfItems, startColumn, endColumn] = move;
    const column = stack[startColumn];
    let movedItems = column.splice(column.length - noOfItems, noOfItems).reverse();
    if (reverseMoves) {
        movedItems = movedItems.reverse();
    }
    stack[endColumn].push(...movedItems);
};
