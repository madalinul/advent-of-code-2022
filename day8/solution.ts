import fs from 'fs/promises';

async function getSolution() {
    try {
        const data: string = await fs.readFile('./input.txt', { encoding: 'utf8' });
        const lines = data.split('\n');
        const trees = lines.map((line) => line.split('').map(Number));
        let visibleSum = 0;
        const [numberOfRows, numberOfCols] = [lines.length, lines[0].length];
        let scenicScore = 0;

        console.time('solution');
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfCols; j++) {
                const row = trees[i];
                const column = Array.from({ length: numberOfRows }, (_, i) => trees[i][j]);
                const value = trees[i][j];

                const isSmaller = (item: number) => item < value;

                const left = row.slice(0, j);
                const right = row.slice(j + 1);
                const top = column.slice(0, i);
                const bottom = column.slice(i + 1);

                //part1
                const leftVisible = left.every(isSmaller);
                const rightVisible = right.every(isSmaller);
                const topVisible = top.every(isSmaller);
                const bottomVisible = bottom.every(isSmaller);
                if (leftVisible || rightVisible || topVisible || bottomVisible) {
                    visibleSum++;
                }

                //part2;
                const isBigger = (item: number) => item >= value;

                const leftIndex = [...left].reverse().findIndex(isBigger);
                const leftScore = leftIndex > -1 ? leftIndex + 1 : left.length;
                const rightIndex = right.findIndex(isBigger);
                const rightScore = rightIndex > -1 ? rightIndex + 1 : right.length;
                const topIndex = [...top].reverse().findIndex(isBigger);
                const topScore = topIndex > -1 ? topIndex + 1 : top.length;
                const bottomIndex = bottom.findIndex(isBigger);
                const bottomScore = bottomIndex > -1 ? bottomIndex + 1 : bottom.length;

                scenicScore = Math.max(
                    scenicScore,
                    leftScore * rightScore * topScore * bottomScore
                );
            }
        }
        console.timeEnd('solution');
        console.log('PART1: ', visibleSum);
        console.log('PART2: ', scenicScore);
    } catch (err) {
        console.log(err);
    }
}

getSolution();
