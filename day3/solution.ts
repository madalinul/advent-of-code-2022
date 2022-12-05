import fs from 'fs/promises';

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });
        const rucksacks = data.split('\n');
        let part1Sum = 0;
        let part2Sum = 0;
        rucksacks.forEach((rucksack, index) => {
            const middle = Math.floor(rucksack.length / 2);
            const partOne = rucksack.slice(0, middle);
            const partTwo = rucksack.slice(middle, rucksack.length);
            let foundItems = '';
            const secondRucksack = rucksacks[index + 1];
            const thirdRucksack = rucksacks[index + 2];
            for (const char of partOne) {
                if (partTwo.includes(char) && !foundItems.includes(char)) {
                    part1Sum += getCharValue(char);
                    foundItems += char;
                }
            }
            if (index % 3 !== 0) {
                return;
            }
            let foundItemsPart2 = '';
            for (const char of rucksack) {
                if (
                    secondRucksack.includes(char) &&
                    thirdRucksack.includes(char) &&
                    !foundItemsPart2.includes(char)
                ) {
                    part2Sum += getCharValue(char);
                    foundItemsPart2 += char;
                }
            }
        });
        console.log('PART1: ', part1Sum);
        console.log('PART2: ', part2Sum);
    } catch (err) {
        console.log(err);
    }
}

getSolution();

const getCharValue = (char: string) => {
    const charCode = char.charCodeAt(0);
    if (charCode > 96) {
        return charCode - 96;
    } else {
        return charCode - 38;
    }
};
