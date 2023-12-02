import { open } from "node:fs/promises";

let result = 0;
let power = 0;
const file = await open("./input.txt");
for await (const line of file.readLines()) {
    //call the primary function here.
    if (validateCubes(line)) {
        result += getGameID(line);
    }
    power += getPower(line);
}
console.log("p1 && p2:", result, power);

function getGameID(line) {
    return parseInt(line.split(":")[0].split(" ")[1]);
}

function validateCubes(line) {
    const maxNumCubes = { red: 12, green: 13, blue: 14 };
    const totalCubesShown = line.split(":")[1];
    for (const cubesShown of totalCubesShown.split(";")) {
        for (const cube of cubesShown
            .replaceAll(/, /gi, ",")
            .trim()
            .split(",")) {
            if (
                maxNumCubes[cube.split(" ")[1]] < parseInt(cube.split(" ")[0])
            ) {
                return false;
            }
        }
    }
    return true;
}

function getPower(line) {
    let answer = 1;
    let maxCubesShown = {};
    const totalCubesShown = line.split(":")[1];
    for (const cubes of totalCubesShown
        .trim()
        .replaceAll(/, /gi, ",")
        .replaceAll(/; /gi, ";")
        .split(";")) {
        for (const cube of cubes.split(",")) {
            const numCubes = parseInt(cube.split(" ")[0]);
            const cubeColor = cube.split(" ")[1];
            if (Object.keys(maxCubesShown).includes(cubeColor)) {
                if (maxCubesShown[cubeColor] < numCubes) {
                    maxCubesShown[cubeColor] = numCubes;
                }
            } else {
                maxCubesShown[cubeColor] = numCubes;
            }
        }
    }

    for (const value of Object.values(maxCubesShown)) {
        answer *= value;
    }

    return answer;
}
