import fs from "fs";

const contents = fs
    .readFileSync("./input", {
        encoding: "utf8",
        flag: "r",
    })
    .split("\n");

let megaArray = [];
let currArray = [];
let prevArray = [];
let flag = false;
let result = 0;

for (const line of contents) {
    megaArray = [];
    flag = false;
    currArray = line.split(" ").map((x) => parseInt(x));
    megaArray.push(currArray);
    while (!flag) {
        if (
            currArray.length > 0 &&
            Array.from(new Set(currArray)).length === 1
        ) {
            flag = true;
            break;
        }

        prevArray = currArray;
        currArray = [];
        for (let i = 0; i < prevArray.length - 1; i++) {
            currArray.push(prevArray[i + 1] - prevArray[i]);
        }
        megaArray.push(currArray);
    }

    megaArray.forEach((x) => {
        result += x[x.length - 1];
    });
}

console.log("result:", result);
