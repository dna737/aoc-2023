import { open } from "node:fs/promises";

/*
strategy: 
0. Keeping variables that store the smallest and highest indices of numbers in a line.
1. going through initial digits first, and storing them in a hashmap {index: number}
2. going through the expanded(word) form of numbers. Using regEx again and storing the numbers in the hashmap.
3. At the end, we return the stored hashmap's smallest and largest indices (using the variables described in step 0).
*/
const file = await open("./input.txt");
let result = 0;
for await (const line of file.readLines()) {
    result += extractDigits(line);
}
console.log(result);
function extractDigits(line) {
    let min = null,
        max = null;
    const words = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };

    let numbers = {};

    for (let i = 0; i < line.length; i++) {
        if (/^[0-9]*$/.test(line[i])) {
            numbers[i] = parseInt(line[i]);
            if (min === null) {
                min = i;
            } else {
                min = Math.min(min, i);
                max = Math.max(max, i);
            }
        }

        if (/^[0-9]*$/.test(line[line.length - 1 - i])) {
            numbers[line.length - 1 - i] = parseInt(line[line.length - 1 - i]);
            if (max === null) {
                max = line.length - 1 - i;
            } else {
                min = Math.min(min, line.length - 1 - i);
                max = Math.max(max, line.length - 1 - i);
            }
        }
    }

    // Storing the "word" form of numbers in the numbers dict.
    Object.keys(words).map((word) => {
        const currWordIndices = [...line.matchAll(word)];

        if (line.includes(word) && currWordIndices) {
            currWordIndices.forEach((iteration) => {
                const currIndex = iteration.index;
                numbers[currIndex] = words[word];
                if (min === null) {
                    min = max = currIndex;
                }

                min = Math.min(min, currIndex);
                max = Math.max(max, currIndex);
            });
        }
    });

    console.log("min, max:", min, max);
    console.log("numbers:", numbers);

    const result = numbers[min] + "" + numbers[max];
    console.log("🚀 ~ file: 1-1.mjs:73 ~ extractDigits ~ result:", result);
    return parseInt(result);
}
