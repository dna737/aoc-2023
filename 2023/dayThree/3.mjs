/*
p1 logic: going through the "surroundings" of a number, and using regex to check if it's valid or not.


*/
import fs from "fs";
const contents = fs.readFileSync("./input.txt", {
    encoding: "utf8",
    flag: "r",
});
const contentsArr = contents.split("\n");

let result = 0,
    nonSymbols = /^[\d\.]/g,
    prevLine = "",
    nextLine = "";

for (let i = 0; i < contentsArr.length; i++) {
    if (i !== 0) {
        prevLine = contentsArr[i - 1];
    } else {
        prevLine = "";
    }

    if (i !== contentsArr.length - 1) {
        nextLine = contentsArr[i + 1];
    } else {
        nextLine = "";
    }

    result += extractValidDigits(contentsArr[i], prevLine, nextLine);
}

function extractValidDigits(currLine, prevLine, nextLine) {
    const numberOccurrences = [...currLine.matchAll(/\d+/g)];
    let currResult = 0;
    for (const occ of numberOccurrences) {
        currResult += checkSurroundings(occ, currLine, prevLine, nextLine);
    }
    return currResult;
}

function checkSurroundings(occ, currLine, prevLine, nextLine) {
    const currStr = occ[0];
    let startNumber = occ.index - 1,
        endNumber = occ.index + currStr.length;

    let xRanges = Array.from(
        { length: endNumber - startNumber + 1 },
        (_, index) => startNumber + index
    ).filter((x) => x >= 0 && x <= contents.split("\n")[0].length - 1);

    const linesArray = [currLine, prevLine, nextLine];

    for (const line of linesArray) {
        for (const xCoord of xRanges) {
            if (line[xCoord] && line[xCoord].match(/[^0-9.]/)) {
                return parseInt(currStr);
            }
        }
    }
    return 0;
}
