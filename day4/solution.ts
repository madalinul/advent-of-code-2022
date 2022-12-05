import fs from 'fs/promises';

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });
        const sections = data.split('\n');
        let teamsPart1 = 0;
        let teamsPart2 = 0;
        for (const section of sections) {
            const [team1, team2] = section.split(',');
            const [start1, end1] = team1.split('-').map(Number);
            const [start2, end2] = team2.split('-').map(Number);
            if (start1 >= start2 && end1 <= end2) {
                teamsPart1++;
            } else if (start2 >= start1 && end2 <= end1) {
                teamsPart1++;
            }

            if (inRange(start1, start2, end2) || inRange(end1, start2, end2)) {
                teamsPart2++;
            } else if (inRange(start2, start1, end1) || inRange(end2, start1, end1)) {
                teamsPart2++;
            }
        }
        console.log('PART1: ', teamsPart1);
        console.log('PART2: ', teamsPart2);
    } catch (err) {
        console.log(err);
    }
}

getSolution();

const inRange = (x: number, min: number, max: number) => {
    return (x - min) * (x - max) <= 0;
};
