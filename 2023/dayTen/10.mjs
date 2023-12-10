import fs from "fs";

const contents = fs
    .readFileSync("./initInput", {
        encoding: "utf8",
        flag: "r",
    })
    .split("\n");

let startingIndex = null;

for (const line of contents) {
    if (line.includes("S")) {
        startingIndex = [contents.indexOf(line), line.indexOf("S")];
    }
}

function isStartingPoint(array) {
    return array[0] === startingIndex[0] && array[1] === startingIndex[1];
}

let currSpot = startingIndex;
let dir = [];
let originals = [
    [currSpot[0] + 1, currSpot[1]],
    [currSpot[0], currSpot[1] + 1],
    [currSpot[0] - 1, currSpot[1]],
    [currSpot[0], currSpot[1] - 1],
];

originals
    .filter(
        (x) =>
            x[0] >= 0 &&
            x[0] <= contents[0].length &&
            x[1] >= 0 &&
            x[1] <= contents.length
    )
    .forEach((coordinate) => {
        switch (originals.indexOf(coordinate)) {
            case 0:
                dir = [1, 0, 0, 0];
                break;
            case 1:
                dir = [0, 0, 0, 1];
                break;
            case 2:
                dir = [0, 0, 1, 0];
                break;
            case 3:
                dir = [0, 1, 0, 0];
                break;
        }
        currSpot = coordinate;
        while (!isStartingPoint(currSpot)) {
            //rest of the logic: based on the currSpot and direction, create an object. When you reach the starting point, distance would be /2. If you're stuck in between, you break out of the loop and go on with another coordinate.
        }
    });
