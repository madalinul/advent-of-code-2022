import fs from 'fs/promises';

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });

        const part1 = getUniqueMessage(data, 4);
        const part2 = getUniqueMessage(data, 14);

        console.log('PART1: ', part1);
        console.log('PART2: ', part2);
    } catch (err) {
        console.log(err);
    }
}

const getUniqueMessage = (data: string, messageSize: number) => {
    let result = 0;

    for (let i = messageSize; i <= data.length; i++) {
        const substring = data.substring(i - messageSize, i);
        if (substring.length === new Set([...substring.split('')]).size) {
            result = i;
            break;
        }
    }

    return result;
};

getSolution();
