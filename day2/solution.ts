const fs = require('fs/promises');

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });
        const games = data.split('\n');
        let part1Score = 0;
        let part2Score = 0;
        for (const game of games) {
            const elf = game[0] as elfChoicesType;
            const player = game[2] as plaherfChoicesType;

            part1Score += getGameScorePart1(elf, player);
            part2Score += getGameScorePart2(elf, player);
        }
        console.log('PART1: ', part1Score);
        console.log('PART2: ', part2Score);
    } catch (err) {
        console.log(err);
    }
}

getSolution();

const part1Map = {
    A: [3, 6, 0],
    B: [0, 3, 6],
    C: [6, 0, 3],
};

const part2Map = {
    A: { value: 1, X: 3, Z: 2 },
    B: { value: 2, X: 1, Z: 3 },
    C: { value: 3, X: 2, Z: 1 },
};

type elfChoicesType = 'A' | 'B' | 'C';
type plaherfChoicesType = 'X' | 'Y' | 'Z';

const playerChoices: plaherfChoicesType[] = ['X', 'Y', 'Z'];

const getGameScorePart1 = (elfChoice: elfChoicesType, playerChoice: plaherfChoicesType) => {
    const playerIndex = playerChoices.indexOf(playerChoice);
    return part1Map[elfChoice][playerIndex] + playerIndex + 1;
};

const getGameScorePart2 = (elfChoice: elfChoicesType, playerChoice: plaherfChoicesType) => {
    if (playerChoice === 'Y') {
        return part2Map[elfChoice].value + 3;
    } else if (playerChoice === 'X') {
        return part2Map[elfChoice][playerChoice];
    } else {
        return part2Map[elfChoice][playerChoice] + 6;
    }
};
