import { open } from "node:fs/promises";

let result = 0;

const file = await open("./input.txt");
for await (const line of file.readLines()) {
    //call the primary function here.
    if (validateCubes(line)) {
        result += getGameID(line);
    }
    console.log(result);
}

function getGameID(line) {
    return parseInt(line.split(":")[0].split(" ")[1]);
}

function validateCubes(line) {
    const maxNumCubes = { red: 12, green: 13, blue: 14 };
    const totalCubesShown = line.split(":")[1];
    for (const cubesShown of totalCubesShown.split(";")) {
        console.log("cubesShown", cubesShown);
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
