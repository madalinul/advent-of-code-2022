const fs = require('fs/promises');

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });
        const calories = data.split('\n');
        let sum = 0;
        let caloriesByElf: number[] = [];
        for (const calorie of calories) {
            const calorieInt = parseInt(calorie);
            if (isNaN(calorieInt)) {
                caloriesByElf.push(sum);
                sum = 0;
                continue;
            }
            sum += calorieInt;
        }
        caloriesByElf.sort((a, b) => b - a);
        console.log('PART1: ', caloriesByElf[0]);
        console.log('PART2: ', caloriesByElf[0] + caloriesByElf[1] + caloriesByElf[2]);
    } catch (err) {
        console.log(err);
    }
}

getSolution();
