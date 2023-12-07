/*
p1 logic: going through the "surroundings" of a number, and using regex to check if it's valid or not.
*/

import fs from "fs";
import { arrayBuffer } from "stream/consumers";
const contents = fs.readFileSync("./simpleInput.txt", {
    encoding: "utf8",
    flag: "r",
});
const contentsArr = contents.split("\n");

let result = 0,
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

    result += extractValidDigits(contentsArr[i], prevLine, nextLine, true);
}

let someArr = [];
storeNums();
function storeNums() {
    let lineArray = null;
    for (const line of contentsArr) {
        console.log("🚀 ~ file: 3.mjs:38 ~ storeNums ~ line :", line);
        lineArray = [];
        const numbers = [...line.matchAll(/\d+/g)];
        for (const occ of numbers) {
            lineArray.push({
                number: occ[0],
                start: occ.index,
                end: occ.index + occ[0].length - 1,
            });
        }
        someArr.push(lineArray);
    }
}
console.log("someArr:", someArr);

for (let i = 0; i < linesArray.length; i++) {
    for (const occ of [...currLine.matchAll(/[*]/g)]) {
        let xRanges = Array.from(
            { length: endNumber - startNumber + 1 },
            (_, index) => startNumber + index
        ).filter((x) => x >= 0 && x <= contents.split("\n")[0].length - 1);

        for (const xCoord of xRanges) {
        }
    }
}

function extractValidDigits(currLine, prevLine, nextLine, findGear = false) {
    const regex = findGear ? /[*]/g : /\d+/g;
    const numberOccurrences = [...currLine.matchAll(regex)];
    let currResult = 0;
    for (const occ of numberOccurrences) {
        currResult += checkSurroundings(
            occ,
            currLine,
            prevLine,
            nextLine,
            findGear
        );
    }
    return currResult;
}

function checkSurroundings(
    occ,
    currLine,
    prevLine,
    nextLine,
    findGear = false
) {
    let possibleGears = [],
        storedNums = [],
        numGears = 0;
    const currStr = occ[0];
    let startNumber = occ.index - 1,
        endNumber = occ.index + currStr.length;

    let xRanges = Array.from(
        { length: endNumber - startNumber + 1 },
        (_, index) => startNumber + index
    ).filter((x) => x >= 0 && x <= contents.split("\n")[0].length - 1);

    const linesArray = [currLine, prevLine, nextLine];
    let lineIndex = null;
    for (const line of linesArray) {
        lineIndex = linesArray.indexOf(line);
        for (let xCoord = 0; xCoord < xRanges.length; xCoord++) {
            if (
                !findGear &&
                line[xRanges[xCoord]] &&
                line[xRanges[xCoord]].match(/[^0-9.]/)
            ) {
                return parseInt(currStr);
            }

            if (
                findGear &&
                line[xRanges[xCoord]] &&
                line[xRanges[xCoord]].match(/\d+/)
            ) {
                //a gear integer. Now save the entire integer.
                storedNums = getGearNumber(xCoord, line, storedNums);
                console.log("🚀 ~ file: 3.mjs:88 ~ storedNums :", storedNums);
                numGears++;
            }
        }
    }

    if (numGears === 2) {
        console.log("bump");
        return possibleGears.reduce((acc, x) => acc * x, 1);
    }
    return 0;
}

function getGearNumber(gearIndex, gearLine, storedNums) {
    const numberOccurrences = [...gearLine.matchAll(/\d+/g)];
    let updatedStoredNums = [...storedNums];
    console.log("gearLine:", gearLine, "\n", storedNums);
    for (const occ of numberOccurrences) {
        if (
            gearIndex >= occ.index &&
            !storedNums.find(
                (x) =>
                    x.line === gearLine &&
                    gearIndex >= x.index &&
                    gearIndex <= x.index + x.length - 1
            ) &&
            gearIndex <= occ.index + occ[0].length - 1
        ) {
            updatedStoredNums.push({
                line: gearLine,
                index: occ.index,
                length: occ[0].length,
            });
            console.log();
            return updatedStoredNums;
        }
    }
    return updatedStoredNums;
}
